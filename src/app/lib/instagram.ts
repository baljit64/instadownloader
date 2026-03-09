export type InstagramMediaType = 'image' | 'video';

export interface InstagramMediaItem {
  url: string;
  type: InstagramMediaType;
}

const INSTAGRAM_POST_REGEX =
  /^https?:\/\/(www\.)?instagram\.com\/(p|reel|reels|tv)\/[A-Za-z0-9_-]+\/?(?:\?.*)?$/i;

export function isValidInstagramPostUrl(value: string): boolean {
  return INSTAGRAM_POST_REGEX.test(value.trim());
}

export function normalizeInstagramPostUrl(value: string): string {
  const parsed = new URL(value.trim());
  const normalizedPath = parsed.pathname.replace(/^\/reels\//, '/reel/');

  parsed.search = '';
  parsed.hash = '';

  if (!normalizedPath.endsWith('/')) {
    parsed.pathname = `${normalizedPath}/`;
  } else {
    parsed.pathname = normalizedPath;
  }

  return parsed.toString();
}
