import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-link-copy-troubleshooting');

export default function SeoPage() {
  return renderSeoRoute('instagram-link-copy-troubleshooting');
}
