import type { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

export type ProxyAxiosConfig = Pick<AxiosRequestConfig, 'httpAgent' | 'httpsAgent' | 'proxy'>;

const PROXY_POOL_ENV = 'WEB_SHARE_PROXY_POOL';
const ROTATE_EVERY_ENV = 'WEB_SHARE_PROXY_ROTATE_EVERY';

let proxyPoolCache: string[] | null = null;
let rotationCursor = 0;

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
    const rotationStep = getRotationStep();
    const index = Math.floor(rotationCursor / rotationStep) % pool.length;
    rotationCursor += 1;
    return pool[index];
  }

  return getSingleProxyUrl();
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
