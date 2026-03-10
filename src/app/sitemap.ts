import type { MetadataRoute } from 'next';
import { locales } from './lib/i18n';
import { absoluteUrl } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale, index) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: index === 0 ? 1 : 0.9,
  }));
}
