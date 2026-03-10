import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import LocaleHtmlController from '../components/LocaleHtmlController';
import { isSupportedLocale, localeInfo, locales } from '../lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <>
      <LocaleHtmlController dir={localeInfo[locale].dir} lang={locale} />
      {children}
    </>
  );
}
