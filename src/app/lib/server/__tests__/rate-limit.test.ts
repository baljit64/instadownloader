import { describe, expect, it } from 'vitest';
import { checkRateLimit } from '../rate-limit';

describe('rate limiter', () => {
  it('blocks after exceeding the limit', () => {
    const key = `test-${Date.now()}`;
    const first = checkRateLimit(key, 2, 1000);
    const second = checkRateLimit(key, 2, 1000);
    const third = checkRateLimit(key, 2, 1000);

    expect(first.allowed).toBe(true);
    expect(second.allowed).toBe(true);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });
});
