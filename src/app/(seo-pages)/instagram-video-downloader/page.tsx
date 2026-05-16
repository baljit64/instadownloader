import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-video-downloader');

export default function InstagramVideoDownloaderSeoPage() {
  return renderSeoRoute('instagram-video-downloader');
}
