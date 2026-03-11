import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('public-vs-private-instagram-links');

export default function PublicVsPrivateInstagramLinksSeoPage() {
  return renderSeoRoute('public-vs-private-instagram-links');
}
