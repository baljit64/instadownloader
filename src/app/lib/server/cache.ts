export interface TtlCache<T> {
  get: (key: string) => T | null;
  set: (key: string, value: T, ttlMs: number) => void;
  size: () => number;
}

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

export function resolveCacheTtlMs(envName: string, fallbackMs: number): number {
  const seconds = getEnvNumber(envName, Math.round(fallbackMs / 1000), 1);
  return seconds * 1000;
}

export function resolveCacheMaxEntries(envName: string, fallback: number): number {
  return getEnvNumber(envName, fallback, 10);
}

export function createTtlCache<T>(maxEntries: number): TtlCache<T> {
  const store = new Map<string, { value: T; expiresAt: number }>();

  const touch = (key: string, entry: { value: T; expiresAt: number }) => {
    store.delete(key);
    store.set(key, entry);
  };

  const pruneIfNeeded = () => {
    if (store.size <= maxEntries) {
      return;
    }
    const overflow = store.size - maxEntries;
    const keys = store.keys();
    for (let index = 0; index < overflow; index += 1) {
      const key = keys.next().value as string | undefined;
      if (!key) {
        break;
      }
      store.delete(key);
    }
  };

  return {
    get(key) {
      const entry = store.get(key);
      if (!entry) {
        return null;
      }
      if (entry.expiresAt <= Date.now()) {
        store.delete(key);
        return null;
      }
      touch(key, entry);
      return entry.value;
    },
    set(key, value, ttlMs) {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
      pruneIfNeeded();
    },
    size() {
      return store.size;
    },
  };
}
