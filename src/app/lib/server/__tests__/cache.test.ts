import { describe, expect, it, vi } from 'vitest';
import { createTtlCache } from '../cache';

describe('ttl cache', () => {
  it('expires entries after ttl', () => {
    vi.useFakeTimers();
    const cache = createTtlCache<string>(2);
    cache.set('a', 'one', 1000);
    expect(cache.get('a')).toBe('one');
    vi.advanceTimersByTime(1001);
    expect(cache.get('a')).toBeNull();
    vi.useRealTimers();
  });

  it('evicts oldest entries when exceeding max', () => {
    const cache = createTtlCache<string>(2);
    cache.set('a', 'one', 1000);
    cache.set('b', 'two', 1000);
    cache.set('c', 'three', 1000);
    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toBe('two');
    expect(cache.get('c')).toBe('three');
  });
});
