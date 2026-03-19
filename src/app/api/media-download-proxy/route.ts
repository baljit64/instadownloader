import { Readable } from 'stream';
import type { SupportedPlatform } from '@/app/lib/media';
import { createRequestLogger } from '@/app/lib/server/logger';
import { proxyRequest } from '@/app/lib/server/proxy-request';
import { getClientIp, getRequestId } from '@/app/lib/server/request-utils';
import { applyRateLimitHeaders, checkRateLimit, resolveRateLimitConfig } from '@/app/lib/server/rate-limit';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REQUEST_TIMEOUT_MS = 30_000;
const RATE_LIMIT_OVERRIDES = { limit: 120, windowMs: 60_000 };
const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
};

const ALLOWED_MEDIA_HOSTS: Record<SupportedPlatform, RegExp[]> = {
  instagram: [
    /(^|\.)instagram\.com$/i,
    /(^|\.)cdninstagram\.com$/i,
    /(^|\.)fbcdn\.net$/i,
  ],
  youtube: [
    /(^|\.)googlevideo\.com$/i,
    /(^|\.)ytimg\.com$/i,
    /(^|\.)youtube\.com$/i,
    /(^|\.)youtu\.be$/i,
  ],
  tiktok: [
    /(^|\.)tiktok\.com$/i,
    /(^|\.)tiktokcdn\.com$/i,
    /(^|\.)ibyteimg\.com$/i,
    /(^|\.)muscdn\.com$/i,
    /(^|\.)byteoversea\.com$/i,
  ],
  facebook: [
    /(^|\.)facebook\.com$/i,
    /(^|\.)fbcdn\.net$/i,
    /(^|\.)fbsbx\.com$/i,
  ],
  x: [
    /(^|\.)x\.com$/i,
    /(^|\.)twitter\.com$/i,
    /(^|\.)twimg\.com$/i,
  ],
  pinterest: [
    /(^|\.)pinterest\.com$/i,
    /(^|\.)pinimg\.com$/i,
  ],
};

function isSupportedPlatform(value: string | null): value is SupportedPlatform {
  return Boolean(value && value in ALLOWED_MEDIA_HOSTS);
}

function isAllowedMediaHost(provider: SupportedPlatform, hostname: string): boolean {
  return ALLOWED_MEDIA_HOSTS[provider].some((pattern) => pattern.test(hostname));
}

function getReferer(provider: SupportedPlatform): string {
  switch (provider) {
    case 'instagram':
      return 'https://www.instagram.com/';
    case 'youtube':
      return 'https://www.youtube.com/';
    case 'tiktok':
      return 'https://www.tiktok.com/';
    case 'facebook':
      return 'https://www.facebook.com/';
    case 'x':
      return 'https://x.com/';
    case 'pinterest':
      return 'https://www.pinterest.com/';
  }
}

function inferExtension(contentType: string, mediaType: string | null): string {
  if (contentType.includes('video') || mediaType === 'video') {
    return 'mp4';
  }

  if (contentType.includes('png')) {
    return 'png';
  }

  if (contentType.includes('webp')) {
    return 'webp';
  }

  if (contentType.includes('gif')) {
    return 'gif';
  }

  return 'jpg';
}

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);
  const logger = createRequestLogger(requestId, {
    route: 'media-download-proxy',
    clientIp,
  });
  const requestStart = Date.now();
  logger.info('request.start', { method: request.method });
  const rateLimitConfig = resolveRateLimitConfig(RATE_LIMIT_OVERRIDES);
  const rateLimitResult = rateLimitConfig.enabled
    ? checkRateLimit(
        `media-download-proxy:${clientIp}`,
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

  const applyCommonHeaders = (response: NextResponse) => {
    response.headers.set('x-request-id', requestId);
    if (rateLimitResult) {
      applyRateLimitHeaders(response, rateLimitResult);
    }
    logResponse(response.status);
    return response;
  };

  const respondJson = (body: Record<string, unknown>, init?: { status?: number }) =>
    applyCommonHeaders(NextResponse.json(body, init));

  if (rateLimitResult && !rateLimitResult.allowed) {
    logger.warn('rate_limit.blocked', { limit: rateLimitResult.limit });
    return respondJson(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const mediaUrl = request.nextUrl.searchParams.get('url');
  const providerParam = request.nextUrl.searchParams.get('provider');
  const mediaType = request.nextUrl.searchParams.get('type');

  if (!mediaUrl || !providerParam || !isSupportedPlatform(providerParam)) {
    return respondJson({ error: 'Missing or invalid download parameters.' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(mediaUrl);
  } catch {
    return respondJson({ error: 'Invalid url.' }, { status: 400 });
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return respondJson({ error: 'Invalid url protocol.' }, { status: 400 });
  }

  if (parsed.username || parsed.password) {
    return respondJson({ error: 'Invalid url credentials.' }, { status: 400 });
  }

  if (!isAllowedMediaHost(providerParam, parsed.hostname)) {
    return respondJson({ error: 'Disallowed host.' }, { status: 403 });
  }

  try {
    const { response: upstream } = await proxyRequest<Readable>(
      {
        url: mediaUrl,
        method: 'GET',
        responseType: 'stream',
        timeout: REQUEST_TIMEOUT_MS,
        headers: {
          ...REQUEST_HEADERS,
          Referer: getReferer(providerParam),
        },
        validateStatus: () => true,
        maxRedirects: 5,
      },
      {
        requestId,
        name: `media.download.${providerParam}`,
        rotateOnRetry: true,
        useProxy: providerParam === 'instagram',
      }
    );

    if (upstream.status >= 400) {
      if (typeof upstream.data?.destroy === 'function') {
        upstream.data.destroy();
      }
      return respondJson({ error: 'Failed to fetch media.' }, { status: upstream.status });
    }

    const contentType =
      (upstream.headers['content-type'] as string) ?? 'application/octet-stream';
    const ext = inferExtension(contentType, mediaType);
    const filename = `${providerParam}-media.${ext}`;
    const stream = upstream.data;
    const body = Readable.toWeb(stream) as unknown as ReadableStream<Uint8Array>;
    const response = new NextResponse(body, {
      status: 200,
      headers: {
        'Cache-Control': 'private, max-age=3600',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': contentType,
      },
    });

    const contentLength = upstream.headers['content-length'];
    if (typeof contentLength === 'string' && contentLength) {
      response.headers.set('Content-Length', contentLength);
    }

    return applyCommonHeaders(response);
  } catch {
    return respondJson({ error: 'Download failed.' }, { status: 502 });
  }
}
