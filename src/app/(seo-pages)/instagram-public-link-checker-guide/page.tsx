import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-public-link-checker-guide');

export default function SeoPage() {
  return renderSeoRoute('instagram-public-link-checker-guide');
}
