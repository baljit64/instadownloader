import type { MetadataRoute } from 'next';
import { defaultLocale } from './lib/i18n';
import { siteDescription, siteName } from './lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `/${defaultLocale}`,
    name: siteName,
    short_name: 'InstaDownloader',
    description: siteDescription,
    lang: 'en',
    start_url: `/${defaultLocale}`,
    scope: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
    orientation: 'portrait',
    background_color: '#f7f4ff',
    theme_color: '#2d7cff',
    categories: ['utilities', 'photo', 'video', 'productivity'],
    icons: [
      {
        src: '/pwa/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Open downloader',
        short_name: 'Downloader',
        url: `/${defaultLocale}`,
      },
      {
        name: 'Proxy stats',
        short_name: 'Stats',
        url: `/${defaultLocale}/proxy-stats`,
      },
    ],
    prefer_related_applications: false,
  };
}
