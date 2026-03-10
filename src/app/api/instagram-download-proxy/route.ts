import axios from 'axios';
import { getProxyAxiosConfig } from '@/app/lib/server/proxy';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ALLOWED_HOSTS =
  /(?:cdninstagram\.com|scontent[-._a-z0-9]*\.fbcdn\.net|fbcdn\.net|instagram\.com)/i;

const TIMEOUT_MS = 30_000;
const PROXY_AXIOS_CONFIG = getProxyAxiosConfig();

export async function GET(request: NextRequest) {
  const mediaUrl = request.nextUrl.searchParams.get('url');

  if (!mediaUrl) {
    return NextResponse.json({ error: 'Missing url parameter.' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(mediaUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid url.' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.test(parsed.hostname)) {
    return NextResponse.json({ error: 'Disallowed host.' }, { status: 403 });
  }

  try {
    const upstream = await axios.get(mediaUrl, {
      ...PROXY_AXIOS_CONFIG,
      responseType: 'arraybuffer',
      timeout: TIMEOUT_MS,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Referer: 'https://www.instagram.com/',
      },
      validateStatus: () => true,
      maxRedirects: 5,
    });

    if (upstream.status >= 400) {
      return NextResponse.json(
        { error: 'Failed to fetch media.' },
        { status: upstream.status }
      );
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
    const body =
      upstream.data instanceof ArrayBuffer
        ? upstream.data
        : upstream.data.buffer.slice(
            upstream.data.byteOffset,
            upstream.data.byteOffset + upstream.data.byteLength
          );

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(body.byteLength),
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Download failed.' }, { status: 502 });
  }
}
