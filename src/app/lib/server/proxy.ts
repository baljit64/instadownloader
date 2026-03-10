import type { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

function getRequiredEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export function getProxyAgent() {
  const host = getRequiredEnv('WEB_SHARE_PROXY_HOST');
  const port = getRequiredEnv('WEB_SHARE_PROXY_PORT');
  const username = getRequiredEnv('WEB_SHARE_PROXY_USERNAME');
  const password = getRequiredEnv('WEB_SHARE_PROXY_PASSWORD');

  if (!host || !port || !username || !password) {
    return null;
  }

  const proxyUrl = `http://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}`;

  return new HttpsProxyAgent(proxyUrl);
}

export function getProxyAxiosConfig(): Pick<
  AxiosRequestConfig,
  'httpAgent' | 'httpsAgent' | 'proxy'
> {
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
