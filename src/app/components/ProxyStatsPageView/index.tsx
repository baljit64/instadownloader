import { Suspense } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';
import {
  getLocalePath,
  type Locale,
  type TranslationDictionary,
} from '../../lib/i18n';
import {
  getTodayDateString,
  parseTimezoneOffsetMinutes,
} from '../../lib/server/webshare-stats';
import { ProxyStatsResults, StatsPanelSkeleton } from './StatsPanels';
import { getSingleValue } from './formatters';
import WebshareStatsDateForm from './WebshareStatsDateForm';

interface ProxyStatsPageViewProps {
  copy: TranslationDictionary['proxyStats'];
  currentLocale: Locale;
  languageMenuLabel: string;
  searchParams: Promise<{
    date?: string | string[];
    tzOffsetMinutes?: string | string[];
  }>;
}

export default async function ProxyStatsPageView({
  copy,
  currentLocale,
  languageMenuLabel,
  searchParams,
}: ProxyStatsPageViewProps) {
  const resolvedSearchParams = await searchParams;
  const today = getTodayDateString();
  const selectedDate = getSingleValue(resolvedSearchParams.date) ?? today;
  const timezoneOffsetMinutes = parseTimezoneOffsetMinutes(
    getSingleValue(resolvedSearchParams.tzOffsetMinutes)
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="landing-grid" />
      <div className="landing-orb landing-orb-left" />
      <div className="landing-orb landing-orb-right" />

      <section className="surface-card relative overflow-hidden rounded-[40px] px-6 py-10 sm:px-8 lg:px-10">
        <div className="hero-glow hero-glow-pink" />
        <div className="hero-glow hero-glow-blue" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
              {copy.eyebrow}
            </span>
            <h1 className="font-display mt-4 text-4xl font-bold text-[#171923]">
              {copy.title}
            </h1>
            <p className="mt-4 text-base leading-7 text-[#726a92]">
              {copy.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              buttonLabel={languageMenuLabel}
              currentLocale={currentLocale}
            />
            <Link
              href={getLocalePath(currentLocale)}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-[rgba(130,113,255,0.18)] bg-white/80 px-5 text-sm font-semibold text-[#171923] transition hover:border-[#2d7cff] hover:text-[#2d7cff]"
            >
              {copy.backToDownloader}
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/80 bg-white/68 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
          <WebshareStatsDateForm
            initialDate={selectedDate}
            label={copy.usageDate}
            submitLabel={copy.loadStats}
          />
        </div>

        <Suspense
          key={`${selectedDate}-${timezoneOffsetMinutes}`}
          fallback={<StatsPanelSkeleton />}
        >
          <ProxyStatsResults
            copy={copy}
            locale={currentLocale}
            selectedDate={selectedDate}
            timezoneOffsetMinutes={timezoneOffsetMinutes}
          />
        </Suspense>
      </section>
    </main>
  );
}
