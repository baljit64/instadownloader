import type { MetadataRoute } from 'next';
import { siteDescription, siteName } from './lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: 'InstaDownloader',
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f4ff',
    theme_color: '#2d7cff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
