export const siteName = 'Insta Downloader';
export const siteTitle =
  'Instagram Downloader | Download Reels, Videos, Photos and Carousels';
export const siteDescription =
  'Free online Instagram downloader for public reels, videos, photos, IGTV, and carousel posts. Paste an Instagram link and download media instantly on desktop or mobile.';
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
