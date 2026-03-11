import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-reel-downloader');

export default function InstagramReelDownloaderSeoPage() {
  return renderSeoRoute('instagram-reel-downloader');
}
