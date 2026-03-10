import axios from 'axios';
import type { SupportedPlatform } from '@/app/lib/media';
import { getProxyAxiosConfig } from '@/app/lib/server/proxy';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const REQUEST_TIMEOUT_MS = 30_000;
const INSTAGRAM_PROXY_AXIOS_CONFIG = getProxyAxiosConfig();
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
  const mediaUrl = request.nextUrl.searchParams.get('url');
  const providerParam = request.nextUrl.searchParams.get('provider');
  const mediaType = request.nextUrl.searchParams.get('type');

  if (!mediaUrl || !providerParam || !isSupportedPlatform(providerParam)) {
    return NextResponse.json({ error: 'Missing or invalid download parameters.' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(mediaUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid url.' }, { status: 400 });
  }

  if (!isAllowedMediaHost(providerParam, parsed.hostname)) {
    return NextResponse.json({ error: 'Disallowed host.' }, { status: 403 });
  }

  try {
    const upstream = await axios.get(mediaUrl, {
      ...(providerParam === 'instagram' ? INSTAGRAM_PROXY_AXIOS_CONFIG : {}),
      responseType: 'arraybuffer',
      timeout: REQUEST_TIMEOUT_MS,
      headers: {
        ...REQUEST_HEADERS,
        Referer: getReferer(providerParam),
      },
      validateStatus: () => true,
      maxRedirects: 5,
    });

    if (upstream.status >= 400) {
      return NextResponse.json({ error: 'Failed to fetch media.' }, { status: upstream.status });
    }

    const contentType =
      (upstream.headers['content-type'] as string) ?? 'application/octet-stream';
    const ext = inferExtension(contentType, mediaType);
    const filename = `${providerParam}-media.${ext}`;
    const upstreamBody = upstream.data as ArrayBuffer | Uint8Array;
    const bodyBytes =
      upstreamBody instanceof ArrayBuffer
        ? new Uint8Array(upstreamBody)
        : new Uint8Array(
            upstreamBody.buffer,
            upstreamBody.byteOffset,
            upstreamBody.byteLength
          );
    const body = bodyBytes.slice().buffer;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Cache-Control': 'private, max-age=3600',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(bodyBytes.byteLength),
        'Content-Type': contentType,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Download failed.' }, { status: 502 });
  }
}
