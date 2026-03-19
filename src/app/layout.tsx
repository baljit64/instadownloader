import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import PwaClient from './components/PwaClient';
import './globals.css';
import { defaultLocale, isSupportedLocale, localeInfo } from './lib/i18n';
import {
  absoluteUrl,
  getSiteUrl,
  siteDescription,
  siteKeywords,
  siteName,
  siteTitle,
} from './lib/site';

const bodyFont = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
});

const displayFont = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: siteKeywords,
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/pwa/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/pwa/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/pwa/icon-192.png',
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteName,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: '#2d7cff',
  colorScheme: 'light',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{
    locale?: string;
  }>;
}>) {
  const requestHeaders = await headers();
  const resolvedParams = params ? await params : undefined;
  const localeCandidate = requestHeaders.get('x-site-locale') ?? resolvedParams?.locale;
  const locale =
    localeCandidate && isSupportedLocale(localeCandidate)
      ? localeCandidate
      : defaultLocale;
  const requestDir = requestHeaders.get('x-site-dir');
  const dir = requestDir === 'rtl' || requestDir === 'ltr' ? requestDir : localeInfo[locale].dir;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        description: siteDescription,
      },
      {
        '@type': 'WebApplication',
        name: siteName,
        url: siteUrl,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        description: siteDescription,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={dir}>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <PwaClient />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
