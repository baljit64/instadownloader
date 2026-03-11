import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-post-downloader');

export default function InstagramPostDownloaderSeoPage() {
  return renderSeoRoute('instagram-post-downloader');
}
