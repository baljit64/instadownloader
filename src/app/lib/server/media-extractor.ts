import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import axios from 'axios';
import { load } from 'cheerio';
import { create as createYoutubeDl } from 'youtube-dl-exec';
import type { MediaItem, MediaType, SupportedPlatform } from '../media';

type YoutubeDlResult = Record<string, unknown>;

const REQUEST_TIMEOUT_MS = 25_000;
const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

let youtubeDlPromise:
  | Promise<ReturnType<typeof createYoutubeDl>>
  | null = null;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isLikelyVideoUrl(url: string): boolean {
  return /\.(?:mp4|m4v|mov|webm|m3u8)(?:\?|$)/i.test(url) || /\bvideoplayback\b/i.test(url);
}

function isLikelyImageUrl(url: string): boolean {
  return /\.(?:jpe?g|png|webp|gif)(?:\?|$)/i.test(url) || /\bytimg\.com\b|\bpinimg\.com\b/i.test(url);
}

function inferMediaType(url: string, ext?: string, explicitType?: unknown): MediaType | null {
  if (typeof explicitType === 'string') {
    if (explicitType === 'video') {
      return 'video';
    }
    if (explicitType === 'image') {
      return 'image';
    }
  }

  if (typeof ext === 'string') {
    if (/^(?:mp4|m4v|mov|webm|m3u8)$/i.test(ext)) {
      return 'video';
    }
    if (/^(?:jpe?g|png|webp|gif)$/i.test(ext)) {
      return 'image';
    }
  }

  if (isLikelyVideoUrl(url)) {
    return 'video';
  }

  if (isLikelyImageUrl(url)) {
    return 'image';
  }

  return null;
}

function pushMedia(
  media: MediaItem[],
  seen: Set<string>,
  provider: SupportedPlatform,
  rawUrl: unknown,
  options?: {
    ext?: string;
    thumbnailUrl?: string;
    title?: string;
    type?: unknown;
  }
) {
  if (typeof rawUrl !== 'string' || !/^https?:\/\//i.test(rawUrl)) {
    return;
  }

  const mediaType = inferMediaType(rawUrl, options?.ext, options?.type);
  if (!mediaType) {
    return;
  }

  if (seen.has(rawUrl)) {
    return;
  }

  seen.add(rawUrl);
  media.push({
    provider,
    thumbnailUrl: options?.thumbnailUrl,
    title: options?.title,
    type: mediaType,
    url: rawUrl,
  });
}

async function getYoutubeDlBinaryPath(): Promise<string> {
  const binaryName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
  const bundledBinaryPath = path.join(
    process.cwd(),
    'node_modules',
    'youtube-dl-exec',
    'bin',
    binaryName
  );

  const safeDir = path.join(os.tmpdir(), 'instadownloader-yt-dlp');
  const safeBinaryPath = path.join(safeDir, binaryName);

  await fs.mkdir(safeDir, { recursive: true });

  try {
    await fs.access(safeBinaryPath);
  } catch {
    await fs.copyFile(bundledBinaryPath, safeBinaryPath);
    if (process.platform !== 'win32') {
      await fs.chmod(safeBinaryPath, 0o755);
    }
  }

  return safeBinaryPath;
}

async function getYoutubeDl() {
  if (!youtubeDlPromise) {
    youtubeDlPromise = getYoutubeDlBinaryPath().then((binaryPath) =>
      createYoutubeDl(binaryPath)
    );
  }

  return youtubeDlPromise;
}

function extractMediaFromYoutubeDlPayload(
  provider: SupportedPlatform,
  payload: unknown,
  media: MediaItem[],
  seen: Set<string>,
  title?: string
) {
  if (!payload) {
    return;
  }

  if (Array.isArray(payload)) {
    payload.forEach((entry) =>
      extractMediaFromYoutubeDlPayload(provider, entry, media, seen, title)
    );
    return;
  }

  if (!isRecord(payload)) {
    return;
  }

  const resolvedTitle =
    typeof payload.title === 'string' ? payload.title : title;
  const thumbnailUrl =
    typeof payload.thumbnail === 'string' ? payload.thumbnail : undefined;

  if (Array.isArray(payload.entries) && payload.entries.length) {
    payload.entries.forEach((entry) =>
      extractMediaFromYoutubeDlPayload(provider, entry, media, seen, resolvedTitle)
    );
  }

  pushMedia(media, seen, provider, payload.url, {
    ext: typeof payload.ext === 'string' ? payload.ext : undefined,
    thumbnailUrl,
    title: resolvedTitle,
    type: payload._type,
  });

  if (Array.isArray(payload.requested_downloads)) {
    payload.requested_downloads.forEach((entry) => {
      if (!isRecord(entry)) {
        return;
      }

      pushMedia(media, seen, provider, entry.url, {
        ext: typeof entry.ext === 'string' ? entry.ext : undefined,
        thumbnailUrl,
        title: resolvedTitle,
      });
    });
  }

  if (!media.length && provider === 'pinterest') {
    pushMedia(media, seen, provider, payload.thumbnail, {
      ext: 'jpg',
      thumbnailUrl,
      title: resolvedTitle,
      type: 'image',
    });
  }
}

async function extractFromMetaTags(
  targetUrl: string,
  provider: SupportedPlatform
): Promise<MediaItem[]> {
  const response = await axios.get<string>(targetUrl, {
    headers: REQUEST_HEADERS,
    timeout: REQUEST_TIMEOUT_MS,
    validateStatus: () => true,
    maxRedirects: 5,
  });

  if (response.status >= 400 || !response.data) {
    return [];
  }

  const html = String(response.data);
  const $ = load(html);
  const seen = new Set<string>();
  const media: MediaItem[] = [];
  const pageTitle =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title').text().trim() ||
    undefined;

  const candidates: Array<[string | undefined, MediaType]> = [
    [$('meta[property="og:video:secure_url"]').attr('content'), 'video'],
    [$('meta[property="og:video"]').attr('content'), 'video'],
    [$('meta[name="twitter:player:stream"]').attr('content'), 'video'],
    [$('meta[property="og:image:secure_url"]').attr('content'), 'image'],
    [$('meta[property="og:image"]').attr('content'), 'image'],
    [$('meta[name="twitter:image"]').attr('content'), 'image'],
  ];

  candidates.forEach(([url, type]) => {
    pushMedia(media, seen, provider, url, {
      title: pageTitle,
      type,
    });
  });

  return media;
}

export async function extractPlatformMedia(
  targetUrl: string,
  provider: SupportedPlatform
): Promise<MediaItem[]> {
  const youtubeDl = await getYoutubeDl();
  const seen = new Set<string>();
  const media: MediaItem[] = [];

  try {
    const payload = (await youtubeDl(targetUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      skipDownload: true,
      noPlaylist: true,
    })) as YoutubeDlResult;

    extractMediaFromYoutubeDlPayload(provider, payload, media, seen);
  } catch {
    // Fall through to HTML metadata extraction below.
  }

  if (media.length) {
    return media;
  }

  return extractFromMetaTags(targetUrl, provider);
}
