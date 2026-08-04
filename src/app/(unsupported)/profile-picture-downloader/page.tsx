import type { Metadata } from 'next';
import CapabilityNoticePage, { type CapabilityNotice } from '../../components/CapabilityNoticePage';
import { absoluteUrl, getOpenGraphImages, getTwitterImages, siteName } from '../../lib/site';

const notice: CapabilityNotice = {
  slug: 'profile-picture-downloader',
  title: 'Instagram Profile Picture Downloads Are Not Currently Supported',
  description: 'IGDown currently accepts supported public media URLs, not Instagram usernames or profile pages, so profile-picture extraction is unavailable.',
  explanation: [
    'Profile-picture lookup is an account-based workflow that differs from resolving media attached to a public post or reel. The current product validates public media routes and will not pretend that a username or profile page is a supported post URL.',
    'Do not share account credentials or session cookies with another service to retrieve a profile image. If the image was published in a public post, use that post’s /p/ link instead. This notice is excluded from the sitemap and marked noindex to keep search claims aligned with real functionality.',
  ],
};

export const metadata: Metadata = {
  title: { absolute: notice.title },
  description: notice.description,
  alternates: { canonical: '/profile-picture-downloader' },
  robots: { index: false, follow: true },
  openGraph: { type: 'website', siteName, title: notice.title, description: notice.description, url: absoluteUrl('/profile-picture-downloader'), images: getOpenGraphImages() },
  twitter: { card: 'summary_large_image', title: notice.title, description: notice.description, images: getTwitterImages() },
};

export default function ProfilePictureDownloaderNoticePage() { return <CapabilityNoticePage notice={notice} />; }
