import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoContentPage from '../components/SeoContentPage';
import { buildSeoPageMetadata, getSeoPage, seoPageMap } from './seo-pages';

export function getSeoRouteMetadata(slug: string): Metadata {
  const page = getSeoPage(slug);

  if (!page) {
    return {};
  }

  return buildSeoPageMetadata(page);
}

export function renderSeoRoute(slug: string) {
  const page = getSeoPage(slug);

  if (!page) {
    notFound();
  }

  const relatedPages = page.relatedSlugs
    .map((relatedSlug) => seoPageMap[relatedSlug])
    .filter(Boolean);

  return <SeoContentPage page={page} relatedPages={relatedPages} />;
}
