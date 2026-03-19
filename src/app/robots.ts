import type { MetadataRoute } from 'next';
import { getSiteUrl } from './lib/site';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const host = new URL(siteUrl).host;

  return {
    host,
    sitemap: `${siteUrl}/sitemap.xml`,
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/stats', '/proxy-stats', '/*/proxy-stats', '/offline'],
      },
    ],
  };
}
