import type { NextResponse } from 'next/server';

export interface RateLimitConfig {
  enabled: boolean;
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  windowMs: number;
}

const DEFAULT_LIMIT = 120;
const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX_KEYS = 10_000;

const store = new Map<string, { count: number; resetAt: number }>();

function getEnvNumber(name: string, fallback: number, min = 1): number {
  const raw = process.env[name]?.trim();
  if (!raw) {
    return fallback;
  }
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < min) {
    return fallback;
  }
  return parsed;
}

function getEnvBoolean(name: string, fallback: boolean): boolean {
  const raw = process.env[name]?.trim().toLowerCase();
  if (!raw) {
    return fallback;
  }
  return ['1', 'true', 'yes', 'on'].includes(raw);
}

function pruneStore(now: number) {
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }

  const maxKeys = getEnvNumber('RATE_LIMIT_MAX_KEYS', DEFAULT_MAX_KEYS, 100);
  if (store.size <= maxKeys) {
    return;
  }

  const overflow = store.size - maxKeys;
  const keys = store.keys();
  for (let index = 0; index < overflow; index += 1) {
    const next = keys.next().value as string | undefined;
    if (!next) {
      break;
    }
    store.delete(next);
  }
}

export function resolveRateLimitConfig(
  overrides: Partial<RateLimitConfig> = {}
): RateLimitConfig {
  return {
    enabled: overrides.enabled ?? getEnvBoolean('RATE_LIMIT_ENABLED', true),
    limit: overrides.limit ?? getEnvNumber('RATE_LIMIT_MAX', DEFAULT_LIMIT, 1),
    windowMs: overrides.windowMs ?? getEnvNumber('RATE_LIMIT_WINDOW_MS', DEFAULT_WINDOW_MS, 1000),
  };
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  cost = 1
): RateLimitResult {
  const now = Date.now();
  pruneStore(now);

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    const count = cost;
    store.set(key, { count, resetAt });
    return {
      allowed: count <= limit,
      limit,
      remaining: Math.max(0, limit - count),
      resetAt,
      windowMs,
    };
  }

  existing.count += cost;
  store.set(key, existing);

  return {
    allowed: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
    windowMs,
  };
}

export function applyRateLimitHeaders(response: NextResponse, result: RateLimitResult) {
  response.headers.set('X-RateLimit-Limit', String(result.limit));
  response.headers.set('X-RateLimit-Remaining', String(result.remaining));
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(result.resetAt / 1000)));
  if (!result.allowed) {
    const retryAfterSeconds = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
    response.headers.set('Retry-After', String(retryAfterSeconds));
  }
}
