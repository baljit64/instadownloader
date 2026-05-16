import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-downloader-without-app');

export default function SeoPage() {
  return renderSeoRoute('instagram-downloader-without-app');
}
