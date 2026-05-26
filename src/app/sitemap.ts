import type { MetadataRoute } from 'next';
import { locales } from './lib/i18n';
import { DEFAULT_REVIEW_DATE, activeSeoPages } from './lib/seo-pages';
import { absoluteUrl } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const localeLastModified = new Date(`${DEFAULT_REVIEW_DATE}T00:00:00.000Z`);

  const localeEntries: MetadataRoute.Sitemap = locales.map((locale, index) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: localeLastModified,
    changeFrequency: 'weekly',
    priority: index === 0 ? 1 : 0.9,
  }));

  const seoEntries: MetadataRoute.Sitemap = activeSeoPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: new Date(`${page.lastReviewedAt}T00:00:00.000Z`),
    changeFrequency: page.type === 'guide' ? 'monthly' : 'weekly',
    priority: page.type === 'tool' ? 0.88 : 0.82,
  }));

  return [...localeEntries, ...seoEntries];
}
