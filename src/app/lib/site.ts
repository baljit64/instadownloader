export const siteName = 'Insta Downloader';
export const siteTitle =
  'Instagram Downloader (Insta Downloader) | Download Post, Reel, Video and Photo Links';
export const siteDescription =
  'Insta Downloader for public Instagram links. Download reels, posts, videos, photos, and carousel media by pasting a link. Also known as IG Downloader and InstaDownloader.';
export const siteKeywords = [
  'instagram downloader',
  'insta downloader',
  'ig downloader',
  'instadownloader',
  'igdown',
  'instagram post downloader',
  'instagram reel downloader',
  'instagram video downloader',
  'instagram link downloader',
  'download instagram reel',
  'download instagram post',
  'download instagram post link',
  'download instagram reel link',
  'save instagram reel',
  'save instagram video',
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
