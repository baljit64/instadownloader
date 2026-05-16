import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-carousel-download-guide');

export default function SeoPage() {
  return renderSeoRoute('instagram-carousel-download-guide');
}
