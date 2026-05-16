import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('download-instagram-reel-by-link');

export default function SeoPage() {
  return renderSeoRoute('download-instagram-reel-by-link');
}
