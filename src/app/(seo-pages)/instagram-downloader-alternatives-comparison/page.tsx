import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-downloader-alternatives-comparison');

export default function SeoPage() {
  return renderSeoRoute('instagram-downloader-alternatives-comparison');
}
