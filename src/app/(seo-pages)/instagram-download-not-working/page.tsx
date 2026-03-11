import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-download-not-working');

export default function InstagramDownloadNotWorkingSeoPage() {
  return renderSeoRoute('instagram-download-not-working');
}
