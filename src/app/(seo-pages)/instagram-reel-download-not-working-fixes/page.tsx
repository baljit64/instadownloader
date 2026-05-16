import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-reel-download-not-working-fixes');

export default function SeoPage() {
  return renderSeoRoute('instagram-reel-download-not-working-fixes');
}
