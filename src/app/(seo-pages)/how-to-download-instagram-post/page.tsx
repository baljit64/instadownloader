import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('how-to-download-instagram-post');

export default function HowToDownloadInstagramPostSeoPage() {
  return renderSeoRoute('how-to-download-instagram-post');
}
