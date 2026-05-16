import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('insta-downloader');

export default function InstaDownloaderSeoPage() {
  return renderSeoRoute('insta-downloader');
}
