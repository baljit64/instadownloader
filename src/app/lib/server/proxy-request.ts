import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { createRequestLogger } from './logger';
import {
  type ProxySelection,
  reportProxyFailure,
  reportProxySuccess,
  selectProxy,
} from './proxy';

const DEFAULT_RETRY_STATUSES = [429, 500, 502, 503, 504];

export interface ProxyRequestOptions {
  attempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  retryStatuses?: number[];
  shouldRetryResponse?: (response: AxiosResponse) => boolean;
  shouldRetryError?: (error: unknown) => boolean;
  proxySelection?: ProxySelection;
  rotateOnRetry?: boolean;
  useProxy?: boolean;
  requestId?: string;
  name?: string;
  logContext?: Record<string, unknown>;
}

export interface ProxyRequestResult<T> {
  response: AxiosResponse<T>;
  proxyId: string | null;
  attempt: number;
  durationMs: number;
}

function isRetryableAxiosError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const axiosError = error as AxiosError;
  const code = axiosError.code?.toUpperCase();
  if (!code) {
    return false;
  }

  return [
    'ECONNABORTED',
    'ETIMEDOUT',
    'ECONNRESET',
    'EPIPE',
    'ENOTFOUND',
    'EAI_AGAIN',
  ].includes(code);
}

function jitterDelay(baseMs: number): number {
  const jitter = Math.floor(Math.random() * 150);
  return baseMs + jitter;
}

function getDelayMs(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  const exponential = baseDelayMs * 2 ** (attempt - 1);
  return Math.min(maxDelayMs, jitterDelay(exponential));
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function summarizeUrl(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    const parsed = new URL(value);
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return value.slice(0, 128);
  }
}

export async function proxyRequest<T>(
  config: AxiosRequestConfig,
  options: ProxyRequestOptions = {}
): Promise<ProxyRequestResult<T>> {
  const attempts = Math.max(1, options.attempts ?? 2);
  const baseDelayMs = Math.max(50, options.baseDelayMs ?? 250);
  const maxDelayMs = Math.max(baseDelayMs, options.maxDelayMs ?? 2000);
  const retryStatuses = new Set(options.retryStatuses ?? DEFAULT_RETRY_STATUSES);
  const rotateOnRetry = options.rotateOnRetry ?? true;
  const useProxy = options.useProxy ?? true;
  const logger = options.requestId
    ? createRequestLogger(options.requestId, {
        component: 'proxy-request',
        ...(options.logContext ?? {}),
      })
    : null;

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const selection = useProxy
      ? options.proxySelection && (!rotateOnRetry || attempt === 1)
        ? options.proxySelection
        : selectProxy()
      : {
          proxyUrl: null,
          proxyId: null,
          config: {},
        };
    const mergedConfig = {
      ...config,
      ...selection.config,
    };
    const start = Date.now();

    try {
      const response = await axios.request<T>(mergedConfig);
      const durationMs = Date.now() - start;
      const shouldRetry =
        Boolean(options.shouldRetryResponse?.(response)) ||
        retryStatuses.has(response.status);

      if (shouldRetry && typeof (response.data as { destroy?: () => void })?.destroy === 'function') {
        (response.data as { destroy: () => void }).destroy();
      }

      if (selection.proxyUrl) {
        if (shouldRetry) {
          reportProxyFailure(selection.proxyUrl);
        } else {
          reportProxySuccess(selection.proxyUrl);
        }
      }

      logger?.info('proxy.request', {
        name: options.name,
        attempt,
        status: response.status,
        durationMs,
        proxyId: selection.proxyId,
        url: summarizeUrl(config.url),
      });

      if (!shouldRetry || attempt === attempts) {
        return {
          response,
          proxyId: selection.proxyId,
          attempt,
          durationMs,
        };
      }

      logger?.warn('proxy.retry', {
        name: options.name,
        attempt,
        status: response.status,
        proxyId: selection.proxyId,
      });
    } catch (error) {
      const durationMs = Date.now() - start;
      lastError = error;
      const shouldRetry =
        options.shouldRetryError?.(error) ?? isRetryableAxiosError(error);

      if (selection.proxyUrl) {
        reportProxyFailure(selection.proxyUrl);
      }

      logger?.warn('proxy.error', {
        name: options.name,
        attempt,
        durationMs,
        proxyId: selection.proxyId,
        retrying: shouldRetry && attempt < attempts,
      });

      if (!shouldRetry || attempt === attempts) {
        throw error;
      }
    }

    await sleep(getDelayMs(attempt, baseDelayMs, maxDelayMs));
  }

  throw lastError;
}
