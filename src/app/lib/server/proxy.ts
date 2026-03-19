import { createHash } from 'crypto';
import type { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

export type ProxyAxiosConfig = Pick<AxiosRequestConfig, 'httpAgent' | 'httpsAgent' | 'proxy'>;

const PROXY_POOL_ENV = 'WEB_SHARE_PROXY_POOL';
const ROTATE_EVERY_ENV = 'WEB_SHARE_PROXY_ROTATE_EVERY';
const PROXY_COOLDOWN_ENV = 'WEB_SHARE_PROXY_COOLDOWN_MS';
const PROXY_FAILURE_THRESHOLD_ENV = 'WEB_SHARE_PROXY_FAILURE_THRESHOLD';

let proxyPoolCache: string[] | null = null;
let rotationCursor = 0;
const proxyHealth = new Map<string, { failures: number; unhealthyUntil: number }>();

function getEnvValue(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function getRotationStep(): number {
  const raw = getEnvValue(ROTATE_EVERY_ENV);
  if (!raw) {
    return 1;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function getProxyCooldownMs(): number {
  const raw = getEnvValue(PROXY_COOLDOWN_ENV);
  if (!raw) {
    return 60_000;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 60_000;
}

function getProxyFailureThreshold(): number {
  const raw = getEnvValue(PROXY_FAILURE_THRESHOLD_ENV);
  if (!raw) {
    return 2;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 2;
}

function hashProxyUrl(proxyUrl: string): string {
  return createHash('sha256').update(proxyUrl).digest('hex').slice(0, 8);
}

function isProxyHealthy(proxyUrl: string): boolean {
  const health = proxyHealth.get(proxyUrl);
  if (!health) {
    return true;
  }

  if (health.unhealthyUntil > Date.now()) {
    return false;
  }

  proxyHealth.delete(proxyUrl);
  return true;
}

function normalizeProxyUrl(
  rawValue: string,
  defaults: { username: string | null; password: string | null; port: string | null }
): string | null {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return null;
  }

  const candidate = trimmed.includes('://') ? trimmed : `http://${trimmed}`;
  let url: URL;

  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  if (!url.hostname) {
    return null;
  }

  if (!url.port) {
    if (defaults.port) {
      url.port = defaults.port;
    } else {
      return null;
    }
  }

  if (!url.username && defaults.username && defaults.password) {
    url.username = defaults.username;
    url.password = defaults.password;
  }

  return url.toString();
}

function getProxyPool(): string[] {
  if (proxyPoolCache) {
    return proxyPoolCache;
  }

  const rawPool = getEnvValue(PROXY_POOL_ENV);
  if (!rawPool) {
    proxyPoolCache = [];
    return proxyPoolCache;
  }

  const defaults = {
    username: getEnvValue('WEB_SHARE_PROXY_USERNAME'),
    password: getEnvValue('WEB_SHARE_PROXY_PASSWORD'),
    port: getEnvValue('WEB_SHARE_PROXY_PORT'),
  };

  const entries = rawPool
    .split(/[\n,]+/)
    .map((entry) => normalizeProxyUrl(entry, defaults))
    .filter((entry): entry is string => Boolean(entry));

  proxyPoolCache = entries;
  return proxyPoolCache;
}

function getSingleProxyUrl(): string | null {
  const host = getEnvValue('WEB_SHARE_PROXY_HOST');
  const port = getEnvValue('WEB_SHARE_PROXY_PORT');
  const username = getEnvValue('WEB_SHARE_PROXY_USERNAME');
  const password = getEnvValue('WEB_SHARE_PROXY_PASSWORD');

  if (!host || !port || !username || !password) {
    return null;
  }

  const url = new URL(`http://${host}:${port}`);
  url.username = username;
  url.password = password;

  return url.toString();
}

function selectProxyUrl(): string | null {
  const pool = getProxyPool();
  if (pool.length) {
    const healthyPool = pool.filter((proxyUrl) => isProxyHealthy(proxyUrl));
    const candidates = healthyPool.length ? healthyPool : pool;
    const rotationStep = getRotationStep();
    const index = Math.floor(rotationCursor / rotationStep) % candidates.length;
    rotationCursor += 1;
    return candidates[index];
  }

  return getSingleProxyUrl();
}

export interface ProxySelection {
  proxyUrl: string | null;
  proxyId: string | null;
  config: ProxyAxiosConfig;
}

export function selectProxy(): ProxySelection {
  const proxyUrl = selectProxyUrl();
  if (!proxyUrl) {
    return {
      proxyUrl: null,
      proxyId: null,
      config: {},
    };
  }

  const proxyAgent = new HttpsProxyAgent(proxyUrl);

  return {
    proxyUrl,
    proxyId: hashProxyUrl(proxyUrl),
    config: {
      httpAgent: proxyAgent,
      httpsAgent: proxyAgent,
      proxy: false,
    },
  };
}

export function reportProxyFailure(proxyUrl: string) {
  const threshold = getProxyFailureThreshold();
  const cooldownMs = getProxyCooldownMs();
  const health = proxyHealth.get(proxyUrl) ?? { failures: 0, unhealthyUntil: 0 };
  health.failures += 1;

  if (health.failures >= threshold) {
    health.failures = 0;
    health.unhealthyUntil = Date.now() + cooldownMs;
  }

  proxyHealth.set(proxyUrl, health);
}

export function reportProxySuccess(proxyUrl: string) {
  proxyHealth.delete(proxyUrl);
}

export function getProxyAgent() {
  const proxyUrl = selectProxyUrl();

  if (!proxyUrl) {
    return null;
  }

  return new HttpsProxyAgent(proxyUrl);
}

export function getProxyAxiosConfig(): ProxyAxiosConfig {
  const proxyAgent = getProxyAgent();

  if (!proxyAgent) {
    return {};
  }

  return {
    httpAgent: proxyAgent,
    httpsAgent: proxyAgent,
    proxy: false,
  };
}
