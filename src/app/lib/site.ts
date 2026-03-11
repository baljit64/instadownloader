export const siteName = 'Insta Downloader';
export const siteTitle =
  'Instagram Downloader | Download Public Reels, Posts, Photos and Carousel Links';
export const siteDescription =
  'Download public Instagram reels, posts, photos, and carousel media online. Paste a public link to preview and save the file. Also supports public URLs from YouTube, TikTok, Facebook, X, and Pinterest.';
export const siteKeywords = [
  'instagram downloader',
  'instagram post downloader',
  'instagram reel downloader',
  'download instagram reel',
  'download instagram post',
  'instagram video downloader',
  'instagram photo downloader',
  'instagram image downloader',
  'instagram carousel downloader',
  'public instagram downloader',
  'download public instagram post',
  'save instagram post online',
  'insta post download',
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
