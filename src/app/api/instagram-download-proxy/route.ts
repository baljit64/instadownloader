import { Readable } from 'stream';
import { createRequestLogger } from '@/app/lib/server/logger';
import { proxyRequest } from '@/app/lib/server/proxy-request';
import { getClientIp, getRequestId } from '@/app/lib/server/request-utils';
import { applyRateLimitHeaders, checkRateLimit, resolveRateLimitConfig } from '@/app/lib/server/rate-limit';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_HOSTS =
  /(?:cdninstagram\.com|scontent[-._a-z0-9]*\.fbcdn\.net|fbcdn\.net|instagram\.com)/i;

const TIMEOUT_MS = 30_000;
const RATE_LIMIT_OVERRIDES = { limit: 120, windowMs: 60_000 };

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);
  const clientIp = getClientIp(request);
  const logger = createRequestLogger(requestId, {
    route: 'instagram-download-proxy',
    clientIp,
  });
  const requestStart = Date.now();
  logger.info('request.start', { method: request.method });
  const rateLimitConfig = resolveRateLimitConfig(RATE_LIMIT_OVERRIDES);
  const rateLimitResult = rateLimitConfig.enabled
    ? checkRateLimit(
        `instagram-download-proxy:${clientIp}`,
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

  if (!mediaUrl) {
    return respondJson({ error: 'Missing url parameter.' }, { status: 400 });
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

  if (!ALLOWED_HOSTS.test(parsed.hostname)) {
    return respondJson({ error: 'Disallowed host.' }, { status: 403 });
  }

  try {
    const { response: upstream } = await proxyRequest<NodeJS.ReadableStream>(
      {
        url: mediaUrl,
        method: 'GET',
        responseType: 'stream',
        timeout: TIMEOUT_MS,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Referer: 'https://www.instagram.com/',
        },
        validateStatus: () => true,
        maxRedirects: 5,
      },
      {
        requestId,
        name: 'instagram.download',
        rotateOnRetry: true,
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

    const ext = contentType.includes('video')
      ? 'mp4'
      : contentType.includes('png')
        ? 'png'
        : contentType.includes('webp')
          ? 'webp'
          : 'jpg';

    const filename = `instagram-media.${ext}`;
    const stream = upstream.data;
    const body = Readable.toWeb(stream);
    const response = new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, max-age=3600',
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
