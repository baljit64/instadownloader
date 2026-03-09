import { NextRequest, NextResponse } from 'next/server';
import type { MediaItem, SupportedPlatform } from '@/app/lib/media';
import {
  detectSupportedPlatform,
  normalizeSupportedMediaUrl,
  supportedPlatformLabels,
} from '@/app/lib/media';
import { extractPlatformMedia } from '@/app/lib/server/media-extractor';

export const runtime = 'nodejs';

interface MediaExtractRequest {
  url?: string;
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function extractInstagramMedia(
  request: NextRequest,
  normalizedUrl: string
): Promise<Response> {
  const instagramEndpoint = new URL('/api/instagram-download', request.nextUrl.origin);

  return fetch(instagramEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: request.headers.get('cookie') || '',
    },
    body: JSON.stringify({ url: normalizedUrl }),
    cache: 'no-store',
  });
}

export async function POST(request: NextRequest) {
  let payload: MediaExtractRequest;

  try {
    payload = (await request.json()) as MediaExtractRequest;
  } catch {
    return errorResponse('Invalid request payload.', 400);
  }

  const incomingUrl = payload.url?.trim() ?? '';
  const provider = detectSupportedPlatform(incomingUrl);

  if (!provider) {
    return errorResponse(
      'Unsupported URL. Use a public Instagram, YouTube, TikTok, Facebook, X, or Pinterest link.',
      400
    );
  }

  const normalizedUrl = normalizeSupportedMediaUrl(incomingUrl);

  try {
    if (provider === 'instagram') {
      const instagramResponse = await extractInstagramMedia(request, normalizedUrl);
      const instagramData = (await instagramResponse.json()) as
        | { error?: string; media?: MediaItem[] }
        | undefined;

      if (!instagramResponse.ok) {
        return errorResponse(
          instagramData?.error || 'Unable to fetch Instagram media.',
          instagramResponse.status
        );
      }

      const media = Array.isArray(instagramData?.media)
        ? instagramData.media.map((item) => ({
            ...item,
            provider,
          }))
        : [];

      if (!media.length) {
        return errorResponse('No downloadable media was found for this Instagram URL.', 404);
      }

      return NextResponse.json({ media });
    }

    const media = await extractPlatformMedia(normalizedUrl, provider);

    if (!media.length) {
      return errorResponse(
        `No downloadable media was found for this ${supportedPlatformLabels[provider]} URL.`,
        404
      );
    }

    return NextResponse.json({
      media: media.map((item) => ({
        ...item,
        provider: item.provider ?? (provider as SupportedPlatform),
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : `Unable to fetch media for ${supportedPlatformLabels[provider]}.`;

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 }
    );
  }
}
