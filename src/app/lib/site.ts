export const siteName = 'Insta Downloader';
export const siteTitle =
  'Instagram Downloader | Download Posts & Reels by Link';
export const siteDescription =
  'Insta Downloader for public Instagram links. Paste a post or reel URL to download videos, photos, and carousel media quickly.';
export const siteKeywords = [
  'instagram downloader',
  'insta downloader',
  'ig downloader',
  'instagram post downloader',
  'instagram reel downloader',
  'instagram video downloader',
  'download instagram reel',
  'download instagram post',
  'download instagram post link',
  'download instagram reel link',
  'instagram photo downloader',
  'instagram carousel downloader',
  'instagram link downloader',
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

export function getOpenGraphImages() {
  return [
    {
      url: absoluteUrl('/opengraph-image'),
      width: 1200,
      height: 630,
      alt: siteName,
    },
  ];
}

export function getTwitterImages() {
  return [
    {
      url: absoluteUrl('/twitter-image'),
      width: 1200,
      height: 630,
      alt: siteName,
    },
  ];
}
