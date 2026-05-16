import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
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

  if (page.status === 'pruned') {
    permanentRedirect(page.canonicalTarget);
  }

  const relatedPages = page.relatedSlugs
    .map((relatedSlug) => seoPageMap[relatedSlug])
    .filter((relatedPage): relatedPage is typeof page =>
      Boolean(relatedPage && relatedPage.status === 'active')
    );

  return <SeoContentPage page={page} relatedPages={relatedPages} />;
}
