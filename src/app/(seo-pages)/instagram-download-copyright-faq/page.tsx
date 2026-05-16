import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-download-copyright-faq');

export default function SeoPage() {
  return renderSeoRoute('instagram-download-copyright-faq');
}
