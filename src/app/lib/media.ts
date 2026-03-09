export type MediaType = 'image' | 'video';

export type SupportedPlatform =
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'facebook'
  | 'x'
  | 'pinterest';

export interface MediaItem {
  provider?: SupportedPlatform;
  thumbnailUrl?: string;
  title?: string;
  type: MediaType;
  url: string;
}

export const supportedPlatformLabels: Record<SupportedPlatform, string> = {
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  x: 'X / Twitter',
  pinterest: 'Pinterest',
};

const SUPPORTED_HOSTS: Array<[SupportedPlatform, RegExp]> = [
  ['instagram', /(^|\.)instagram\.com$/i],
  ['youtube', /(^|\.)youtube\.com$/i],
  ['youtube', /(^|\.)youtu\.be$/i],
  ['tiktok', /(^|\.)tiktok\.com$/i],
  ['facebook', /(^|\.)facebook\.com$/i],
  ['facebook', /(^|\.)fb\.watch$/i],
  ['x', /(^|\.)x\.com$/i],
  ['x', /(^|\.)twitter\.com$/i],
  ['pinterest', /(^|\.)pinterest\.com$/i],
  ['pinterest', /(^|\.)pin\.it$/i],
];

export function detectSupportedPlatform(value: string): SupportedPlatform | null {
  try {
    const parsed = new URL(value.trim());
    const hostname = parsed.hostname.toLowerCase();

    for (const [platform, pattern] of SUPPORTED_HOSTS) {
      if (pattern.test(hostname)) {
        return platform;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function isSupportedMediaUrl(value: string): boolean {
  return Boolean(detectSupportedPlatform(value));
}

export function normalizeSupportedMediaUrl(value: string): string {
  const parsed = new URL(value.trim());
  const platform = detectSupportedPlatform(parsed.toString());

  parsed.hash = '';

  if (platform === 'instagram') {
    const normalizedPath = parsed.pathname.replace(/^\/reels\//, '/reel/');
    parsed.search = '';
    parsed.pathname = normalizedPath.endsWith('/')
      ? normalizedPath
      : `${normalizedPath}/`;
  }

  if (platform === 'youtube' && /(^|\.)youtu\.be$/i.test(parsed.hostname)) {
    const videoId = parsed.pathname.split('/').filter(Boolean)[0];
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
  }

  if (platform === 'x') {
    parsed.hostname = 'x.com';
  }

  return parsed.toString();
}
