import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProxyStatsPageView from '../../components/ProxyStatsPageView';
import {
  buildLocaleAlternates,
  getDictionary,
  getLocalePath,
  isSupportedLocale,
  localeInfo,
} from '../../lib/i18n';
import { absoluteUrl, siteName } from '../../lib/site';

export const dynamic = 'force-dynamic';

interface LocalizedProxyStatsPageProps {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    date?: string | string[];
    tzOffsetMinutes?: string | string[];
  }>;
}

export async function generateMetadata({
  params,
}: LocalizedProxyStatsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const canonicalPath = getLocalePath(locale, '/proxy-stats');

  return {
    title: dictionary.metadata.proxyStatsTitle,
    description: dictionary.metadata.proxyStatsDescription,
    alternates: {
      canonical: canonicalPath,
      languages: buildLocaleAlternates('/proxy-stats'),
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: dictionary.metadata.proxyStatsTitle,
      description: dictionary.metadata.proxyStatsDescription,
      url: absoluteUrl(canonicalPath),
      siteName,
      locale: localeInfo[locale].ogLocale,
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.proxyStatsTitle,
      description: dictionary.metadata.proxyStatsDescription,
    },
  };
}

export default async function LocalizedProxyStatsPage({
  params,
  searchParams,
}: LocalizedProxyStatsPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <ProxyStatsPageView
      copy={dictionary.proxyStats}
      currentLocale={locale}
      languageMenuLabel={dictionary.header.languageMenu}
      searchParams={searchParams}
    />
  );
}
