import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('download-instagram-video-original-quality');

export default function SeoPage() {
  return renderSeoRoute('download-instagram-video-original-quality');
}
