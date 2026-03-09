export const siteName = 'Insta Downloader';
export const siteTitle =
  'Media Downloader | Download Public Instagram, YouTube, TikTok, Facebook, X and Pinterest Links';
export const siteDescription =
  'Free online media downloader for public Instagram, YouTube, TikTok, Facebook, X, and Pinterest links. Paste a supported media URL and download videos or images instantly.';
export const siteKeywords = [
  'instagram downloader',
  'download instagram reel',
  'instagram video downloader',
  'instagram photo downloader',
  'instagram carousel downloader',
  'download public instagram post',
  'online instagram downloader',
];

function normalizeSiteUrl(value: string): string {
  if (!value) {
    return 'http://localhost:3000';
  }

  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export function getSiteUrl(): string {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000';

  return normalizeSiteUrl(rawSiteUrl).replace(/\/$/, '');
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
