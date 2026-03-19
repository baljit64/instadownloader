import type { MetadataRoute } from 'next';
import { locales } from './lib/i18n';
import { seoPages } from './lib/seo-pages';
import { absoluteUrl } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const localeEntries: MetadataRoute.Sitemap = locales.map((locale, index) => ({
    url: absoluteUrl(`/${locale}`),
    changeFrequency: 'weekly',
    priority: index === 0 ? 1 : 0.9,
  }));

  const seoEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    changeFrequency: page.type === 'guide' ? 'monthly' : 'weekly',
    priority:
      page.slug === 'instagram-downloader' ? 0.95 : page.type === 'tool' ? 0.88 : 0.82,
  }));

  return [...localeEntries, ...seoEntries];
}
