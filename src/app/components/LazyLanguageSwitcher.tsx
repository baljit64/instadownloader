'use client';

import dynamic from 'next/dynamic';
import type { Locale } from '../lib/i18n';

const DeferredLanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="h-10 w-[11.5rem] animate-pulse rounded-lg border border-slate-200 bg-slate-50"
    />
  ),
});

interface LazyLanguageSwitcherProps {
  buttonLabel: string;
  currentLocale: Locale;
}

export default function LazyLanguageSwitcher({
  buttonLabel,
  currentLocale,
}: LazyLanguageSwitcherProps) {
  return (
    <DeferredLanguageSwitcher
      buttonLabel={buttonLabel}
      currentLocale={currentLocale}
    />
  );
}
