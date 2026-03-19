import { describe, expect, it, vi } from 'vitest';

const resetEnv = () => {
  delete process.env.WEB_SHARE_PROXY_POOL;
  delete process.env.WEB_SHARE_PROXY_USERNAME;
  delete process.env.WEB_SHARE_PROXY_PASSWORD;
  delete process.env.WEB_SHARE_PROXY_PORT;
  delete process.env.WEB_SHARE_PROXY_ROTATE_EVERY;
  delete process.env.WEB_SHARE_PROXY_COOLDOWN_MS;
  delete process.env.WEB_SHARE_PROXY_FAILURE_THRESHOLD;
};

describe('proxy selection', () => {
  it('rotates through the proxy pool', async () => {
    resetEnv();
    process.env.WEB_SHARE_PROXY_POOL = '1.1.1.1:1111,2.2.2.2:2222';
    process.env.WEB_SHARE_PROXY_USERNAME = 'user';
    process.env.WEB_SHARE_PROXY_PASSWORD = 'pass';
    process.env.WEB_SHARE_PROXY_ROTATE_EVERY = '1';
    vi.resetModules();

    const { selectProxy } = await import('../proxy');
    const first = selectProxy();
    const second = selectProxy();

    expect(first.proxyUrl).not.toBeNull();
    expect(second.proxyUrl).not.toBeNull();
    expect(first.proxyUrl).not.toBe(second.proxyUrl);
    resetEnv();
  });
});
