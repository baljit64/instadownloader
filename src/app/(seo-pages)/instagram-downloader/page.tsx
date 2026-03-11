import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-downloader');

export default function InstagramDownloaderSeoPage() {
  return renderSeoRoute('instagram-downloader');
}
