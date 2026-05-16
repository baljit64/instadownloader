export const siteName = 'Insta Downloader';
export const siteTitle =
  'Instagram Downloader - Download Video, Photos, Reels & IGTV';
export const siteDescription =
  'Fast, free, and secure Instagram downloader for public links. Download videos, photos, reels, IGTV, and carousel posts without login.';
export const siteKeywords = [
  'instagram downloader',
  'insta downloader',
  'ig downloader',
  'instagram video downloader',
  'download instagram video',
  'instagram photo downloader',
  'download instagram photo',
  'instagram reels downloader',
  'download instagram reels',
  'instagram igtv downloader',
  'download instagram igtv',
  'instagram carousel downloader',
  'download instagram carousel',
  'instagram story downloader',
  'download instagram story',
  'free instagram downloader',
  'instagram downloader no login',
  'online instagram downloader',
  'instagram downloader by link',
  'download instagram post by link',
  'download instagram reel by link',
  'instagram post downloader',
  'instagram reel downloader',
  'save instagram videos',
  'save instagram photos',
  'instagram link downloader',
];

export const siteAlternateNames = [
  'Instagram Downloader',
  'Insta Downloader',
  'IG Downloader',
];

export const siteFeatureList = [
  'Instagram video downloader',
  'Instagram photo downloader',
  'Instagram reels downloader',
  'Instagram IGTV downloader',
  'Instagram carousel downloader',
  'Public-link downloader without login',
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
