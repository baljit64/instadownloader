import type { MetadataRoute } from 'next';
import { locales } from './lib/i18n';
import { DEFAULT_REVIEW_DATE, activeSeoPages } from './lib/seo-pages';
import { absoluteUrl } from './lib/site';
import { trustPages } from './lib/trust-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const localeLastModified = new Date(`${DEFAULT_REVIEW_DATE}T00:00:00.000Z`);

  const localeEntries: MetadataRoute.Sitemap = locales.map((locale, index) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: localeLastModified,
    changeFrequency: 'weekly',
    priority: index === 0 ? 1 : 0.9,
    images: [
      absoluteUrl('/opengraph-image'),
      absoluteUrl('/images/eiffel-tower.jpg'),
      absoluteUrl('/images/taj-mahal.jpg'),
    ],
    alternates: {
      languages: Object.fromEntries([
        ...locales.map((alternateLocale) => [alternateLocale, absoluteUrl(`/${alternateLocale}`)]),
        ['x-default', absoluteUrl('/en')],
      ]),
    },
  }));

  const seoEntries: MetadataRoute.Sitemap = activeSeoPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: new Date(`${page.lastReviewedAt}T00:00:00.000Z`),
    changeFrequency: page.type === 'guide' ? 'monthly' : 'weekly',
    priority: page.type === 'tool' ? 0.88 : 0.82,
    images: [absoluteUrl('/opengraph-image')],
  }));

  const trustEntries: MetadataRoute.Sitemap = Object.values(trustPages).map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: new Date(`${page.updatedAt}T00:00:00.000Z`),
    changeFrequency: 'yearly',
    priority: page.slug === 'about' || page.slug === 'contact' ? 0.65 : 0.5,
    images: [absoluteUrl('/opengraph-image')],
  }));

  return [...localeEntries, ...seoEntries, ...trustEntries];
}
