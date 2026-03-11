import type { Metadata } from 'next';
import { getSeoRouteMetadata, renderSeoRoute } from '../../lib/seo-route';

export const metadata: Metadata = getSeoRouteMetadata('instagram-carousel-downloader');

export default function InstagramCarouselDownloaderSeoPage() {
  return renderSeoRoute('instagram-carousel-downloader');
}
