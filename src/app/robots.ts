import type { MetadataRoute } from 'next';
import { getSiteUrl } from './lib/site';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  };
}
