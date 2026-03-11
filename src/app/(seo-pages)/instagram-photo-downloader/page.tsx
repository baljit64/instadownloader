import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-photo-downloader');

export default function InstagramPhotoDownloaderSeoPage() {
  return renderSeoRoute('instagram-photo-downloader');
}
