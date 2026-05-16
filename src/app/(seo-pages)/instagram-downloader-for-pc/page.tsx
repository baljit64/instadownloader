import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-downloader-for-pc');

export default function SeoPage() {
  return renderSeoRoute('instagram-downloader-for-pc');
}
