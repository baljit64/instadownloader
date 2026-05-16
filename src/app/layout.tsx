import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { headers } from 'next/headers';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import LazyPwaClient from './components/LazyPwaClient';
import './globals.css';
import { defaultLocale, isSupportedLocale, localeInfo } from './lib/i18n';
import {
  absoluteUrl,
  getOpenGraphImages,
  getSiteUrl,
  getTwitterImages,
  siteAlternateNames,
  siteDescription,
  siteFeatureList,
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
const gaId =
  process.env.NEXT_PUBLIC_GA_ID ??
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
  '';
const enableVercelTelemetry = process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS === 'true';

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
  authors: [{ name: siteName, url: absoluteUrl('/en') }],
  creator: siteName,
  publisher: siteName,
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
    url: absoluteUrl('/en'),
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: getOpenGraphImages(),
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: getTwitterImages(),
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
  const homeUrl = absoluteUrl('/en');
  const websiteId = `${siteUrl}/#website`;
  const organizationId = `${siteUrl}/#organization`;
  const appId = `${siteUrl}/#app`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': websiteId,
        '@type': 'WebSite',
        name: siteName,
        alternateName: siteAlternateNames,
        url: homeUrl,
        description: siteDescription,
        inLanguage: 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${homeUrl}?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        name: siteTitle,
        description: siteDescription,
        url: homeUrl,
        inLanguage: 'en',
        isPartOf: {
          '@id': websiteId,
        },
      },
      {
        '@id': organizationId,
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
        logo: absoluteUrl('/pwa/icon-512.png'),
        sameAs: [siteUrl],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: 'support@igdown.pro',
          },
        ],
      },
      {
        '@type': 'SoftwareApplication',
        '@id': appId,
        name: siteName,
        alternateName: siteAlternateNames,
        url: homeUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Windows, macOS, Linux, Android, iOS',
        browserRequirements: 'Requires JavaScript and a modern browser',
        description: siteDescription,
        featureList: siteFeatureList,
        applicationSubCategory: 'Social Media Downloader',
        isAccessibleForFree: true,
        publisher: {
          '@id': organizationId,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
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
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){window.dataLayer.push(arguments);};
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}
        <LazyPwaClient />
        {enableVercelTelemetry ? <Analytics /> : null}
        {enableVercelTelemetry ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
