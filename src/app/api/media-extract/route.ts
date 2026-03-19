import { NextRequest, NextResponse } from 'next/server';
import type { MediaItem, SupportedPlatform } from '@/app/lib/media';
import {
  detectSupportedPlatform,
  normalizeSupportedMediaUrl,
  supportedPlatformLabels,
} from '@/app/lib/media';
import { createTtlCache, resolveCacheMaxEntries, resolveCacheTtlMs } from '@/app/lib/server/cache';
import { createRequestLogger } from '@/app/lib/server/logger';
import { extractPlatformMedia } from '@/app/lib/server/media-extractor';
import { getClientIp, getRequestId } from '@/app/lib/server/request-utils';
import { applyRateLimitHeaders, checkRateLimit, resolveRateLimitConfig } from '@/app/lib/server/rate-limit';

export const runtime = 'nodejs';

const MEDIA_CACHE_TTL_MS = resolveCacheTtlMs('MEDIA_CACHE_TTL_SECONDS', 5 * 60_000);
const MEDIA_CACHE_MAX = resolveCacheMaxEntries('MEDIA_CACHE_MAX_ENTRIES', 500);
const mediaCache = createTtlCache<MediaItem[]>(MEDIA_CACHE_MAX);
const RATE_LIMIT_OVERRIDES = { limit: 60, windowMs: 60_000 };

interface MediaExtractRequest {
  url?: string;
}

async function extractInstagramMedia(
  request: NextRequest,
  normalizedUrl: string,
  requestId: string
): Promise<Response> {
  const instagramEndpoint = new URL('/api/instagram-download', request.nextUrl.origin);

  return fetch(instagramEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-request': '1',
      'x-request-id': requestId,
      cookie: request.headers.get('cookie') || '',
    },
    body: JSON.stringify({ url: normalizedUrl }),
    cache: 'no-store',
  });
}

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);
  const logger = createRequestLogger(requestId, {
    route: 'media-extract',
    clientIp,
  });
  const requestStart = Date.now();
  logger.info('request.start', { method: request.method });
  const rateLimitConfig = resolveRateLimitConfig(RATE_LIMIT_OVERRIDES);
  const rateLimitResult = rateLimitConfig.enabled
    ? checkRateLimit(
        `media-extract:${clientIp}`,
        rateLimitConfig.limit,
        rateLimitConfig.windowMs
      )
    : null;

  const logResponse = (status: number) => {
    const durationMs = Date.now() - requestStart;
    if (status >= 500) {
      logger.error('request.complete', { status, durationMs });
      return;
    }
    if (status >= 400) {
      logger.warn('request.complete', { status, durationMs });
      return;
    }
    logger.info('request.complete', { status, durationMs });
  };

  const respondJson = (body: Record<string, unknown>, init?: { status?: number }) => {
    const response = NextResponse.json(body, init);
    response.headers.set('x-request-id', requestId);
    if (rateLimitResult) {
      applyRateLimitHeaders(response, rateLimitResult);
    }
    logResponse(response.status);
    return response;
  };

  if (rateLimitResult && !rateLimitResult.allowed) {
    logger.warn('rate_limit.blocked', { limit: rateLimitResult.limit });
    return respondJson(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let payload: MediaExtractRequest;

  try {
    payload = (await request.json()) as MediaExtractRequest;
  } catch {
    return respondJson({ error: 'Invalid request payload.' }, { status: 400 });
  }

  const incomingUrl = payload.url?.trim() ?? '';
  const provider = detectSupportedPlatform(incomingUrl);

  if (!provider) {
    return respondJson(
      {
        error:
          'Unsupported URL. Use a public Instagram, YouTube, TikTok, Facebook, X, or Pinterest link.',
      },
      { status: 400 }
    );
  }

  let normalizedUrl = '';
  try {
    normalizedUrl = normalizeSupportedMediaUrl(incomingUrl);
  } catch {
    return respondJson({ error: 'Invalid URL.' }, { status: 400 });
  }

  const cacheKey = `${provider}:${normalizedUrl}`;
  const cachedMedia = mediaCache.get(cacheKey);
  if (cachedMedia) {
    logger.info('cache.hit', { key: cacheKey, size: cachedMedia.length });
    const response = respondJson({ media: cachedMedia });
    response.headers.set('x-cache', 'hit');
    return response;
  }

  try {
    if (provider === 'instagram') {
      const instagramResponse = await extractInstagramMedia(
        request,
        normalizedUrl,
        requestId
      );
      let instagramData:
        | { error?: string; media?: MediaItem[] }
        | undefined;
      try {
        instagramData = (await instagramResponse.json()) as
          | { error?: string; media?: MediaItem[] }
          | undefined;
      } catch {
        instagramData = undefined;
      }

      if (!instagramResponse.ok) {
        return respondJson(
          { error: instagramData?.error || 'Unable to fetch Instagram media.' },
          { status: instagramResponse.status }
        );
      }

      const media = Array.isArray(instagramData?.media)
        ? instagramData.media.map((item) => ({
            ...item,
            provider,
          }))
        : [];

      if (!media.length) {
        return respondJson(
          { error: 'No downloadable media was found for this Instagram URL.' },
          { status: 404 }
        );
      }

      mediaCache.set(cacheKey, media, MEDIA_CACHE_TTL_MS);
      const response = respondJson({ media });
      response.headers.set('x-cache', 'miss');
      return response;
    }

    const media = await extractPlatformMedia(normalizedUrl, provider);

    if (!media.length) {
      return respondJson(
        {
          error: `No downloadable media was found for this ${supportedPlatformLabels[provider]} URL.`,
        },
        { status: 404 }
      );
    }

    const normalizedMedia = media.map((item) => ({
      ...item,
      provider: item.provider ?? (provider as SupportedPlatform),
    }));

    mediaCache.set(cacheKey, normalizedMedia, MEDIA_CACHE_TTL_MS);
    const response = respondJson({ media: normalizedMedia });
    response.headers.set('x-cache', 'miss');
    return response;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : `Unable to fetch media for ${supportedPlatformLabels[provider]}.`;

    logger.error('request.exception', { message });

    return respondJson(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
