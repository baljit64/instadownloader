import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandingPage from '../components/LandingPage';
import {
  buildLocaleAlternates,
  getDictionary,
  getLocalePath,
  isSupportedLocale,
  localeInfo,
} from '../lib/i18n';
import {
  absoluteUrl,
  getOpenGraphImages,
  getTwitterImages,
  siteKeywords,
  siteName,
} from '../lib/site';

interface LocalizedHomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: LocalizedHomePageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const canonicalPath = getLocalePath(locale);

  return {
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription,
    keywords: siteKeywords,
    alternates: {
      canonical: canonicalPath,
      languages: buildLocaleAlternates(),
    },
    openGraph: {
      type: 'website',
      siteName,
      title: dictionary.metadata.homeTitle,
      description: dictionary.metadata.homeDescription,
      url: absoluteUrl(canonicalPath),
      locale: localeInfo[locale].ogLocale,
      images: getOpenGraphImages(),
    },
    twitter: {
      card: 'summary_large_image',
      title: dictionary.metadata.homeTitle,
      description: dictionary.metadata.homeDescription,
      images: getTwitterImages(),
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: LocalizedHomePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return <LandingPage dictionary={getDictionary(locale)} locale={locale} />;
}
