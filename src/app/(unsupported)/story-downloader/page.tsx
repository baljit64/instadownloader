import type { Metadata } from 'next';
import CapabilityNoticePage, { type CapabilityNotice } from '../../components/CapabilityNoticePage';
import { absoluteUrl, getOpenGraphImages, getTwitterImages, siteName } from '../../lib/site';

const notice: CapabilityNotice = {
  slug: 'story-downloader',
  title: 'Instagram Story Downloads Are Not Currently Supported',
  description: 'IGDown does not currently download Instagram Stories because reliable story access commonly requires authenticated, short-lived Instagram context.',
  explanation: [
    'The current extractor is intentionally limited to supported public /p/, /reel/, /reels/, and /tv/ links. It does not request an Instagram password, session cookie, or access token and does not attempt to bypass Close Friends, private-account, or sign-in controls.',
    'Never give a third-party downloader your Instagram credentials to unlock a Story. If a creator also publishes the media as a public post or reel, copy that public URL and use the main downloader. This notice is excluded from the sitemap and marked noindex so the site does not compete for a capability it cannot deliver.',
  ],
};

export const metadata: Metadata = {
  title: { absolute: notice.title },
  description: notice.description,
  alternates: { canonical: '/story-downloader' },
  robots: { index: false, follow: true },
  openGraph: { type: 'website', siteName, title: notice.title, description: notice.description, url: absoluteUrl('/story-downloader'), images: getOpenGraphImages() },
  twitter: { card: 'summary_large_image', title: notice.title, description: notice.description, images: getTwitterImages() },
};

export default function StoryDownloaderNoticePage() { return <CapabilityNoticePage notice={notice} />; }
