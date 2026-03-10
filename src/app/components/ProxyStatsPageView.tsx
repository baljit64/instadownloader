import { Suspense } from 'react';
import Link from 'next/link';
import WebshareStatsDateForm from './WebshareStatsDateForm';
import LanguageSwitcher from './LanguageSwitcher';
import {
  getLocalePath,
  localeInfo,
  type Locale,
  type TranslationDictionary,
} from '../lib/i18n';
import {
  formatUtcOffsetLabel,
  getTodayDateString,
  getWebshareDailyStats,
  parseTimezoneOffsetMinutes,
  type WebshareDailyStats,
} from '../lib/server/webshare-stats';

function getSingleValue(value: string | string[] | undefined): string | null {
  return typeof value === 'string' ? value : Array.isArray(value) ? value[0] ?? null : null;
}

function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeInfo[locale].intl).format(value);
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const amount = bytes / 1024 ** exponent;

  return `${amount.toFixed(amount >= 100 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function formatTimestamp(value: string | null, locale: Locale, emptyLabel: string): string {
  if (!value) {
    return emptyLabel;
  }

  return new Date(value).toLocaleString(localeInfo[locale].intl, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function getTopEntries(record: Record<string, number>) {
  return Object.entries(record).sort((left, right) => right[1] - left[1]).slice(0, 4);
}

function MetricCard({
  detail,
  label,
  value,
}: {
  detail?: string;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-[24px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">{label}</p>
      <p className="mt-3 font-display text-3xl font-bold text-[#171923]">{value}</p>
      {detail ? <p className="mt-2 text-sm text-[#726a92]">{detail}</p> : null}
    </article>
  );
}

function BreakdownCard({
  emptyLabel,
  entries,
  title,
}: {
  emptyLabel: string;
  entries: Array<[string, string]>;
  title: string;
}) {
  return (
    <article className="rounded-[24px] border border-white/80 bg-white/78 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
      <h2 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">{title}</h2>
      {entries.length ? (
        <div className="mt-4 space-y-3">
          {entries.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f7ff] px-4 py-3 text-sm text-[#171923]"
            >
              <span className="font-medium">{label}</span>
              <span className="font-semibold text-[#2d7cff]">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-[#726a92]">{emptyLabel}</p>
      )}
    </article>
  );
}

function StatsPanel({
  copy,
  locale,
  stats,
}: {
  copy: TranslationDictionary['proxyStats'];
  locale: Locale;
  stats: WebshareDailyStats;
}) {
  const protocolEntries = getTopEntries(stats.protocolsUsed).map(([label, value]) => [
    label,
    formatNumber(value, locale),
  ] as [string, string]);
  const countryEntries = getTopEntries(stats.countriesUsed).map(([label, value]) => [
    label,
    formatNumber(value, locale),
  ] as [string, string]);

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label={copy.totalRequests}
          value={formatNumber(stats.requestsTotal, locale)}
          detail={`${formatNumber(stats.requestsSuccessful, locale)} ${copy.succeeded}, ${formatNumber(stats.requestsFailed, locale)} ${copy.failed}`}
        />
        <MetricCard
          label={copy.totalBandwidth}
          value={formatBytes(stats.bandwidthTotal)}
          detail={`${copy.average} ${formatBytes(stats.bandwidthAverage)} ${copy.perRequest}`}
        />
        <MetricCard
          label={copy.proxiesUsed}
          value={formatNumber(stats.numberOfProxiesUsed, locale)}
          detail={`${copy.averageRps} ${stats.averageRps?.toFixed(4) ?? '0.0000'}`}
        />
        <MetricCard
          label={copy.lastRequest}
          value={formatTimestamp(stats.lastRequestSentAt, locale, copy.noRequestsRecorded)}
          detail={`${copy.window} ${formatUtcOffsetLabel(stats.tzOffsetMinutes)}`}
        />
      </div>

      <div className="mt-4 rounded-[26px] border border-white/80 bg-white/76 px-5 py-5 text-sm leading-7 text-[#726a92] shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
        <p>
          {copy.queryWindow}:{' '}
          <span className="font-medium text-[#171923]">{stats.rangeStartIso}</span> {copy.to}{' '}
          <span className="font-medium text-[#171923]">{stats.rangeEndIso}</span>
        </p>
        <p>{copy.rawTrafficNote}</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <BreakdownCard
          emptyLabel={copy.emptyProtocol}
          entries={protocolEntries}
          title={copy.protocolBreakdown}
        />
        <BreakdownCard
          emptyLabel={copy.emptyCountry}
          entries={countryEntries}
          title={copy.countryBreakdown}
        />
      </div>
    </>
  );
}

function StatsPanelSkeleton() {
  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <article
            key={index}
            className="rounded-[24px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
          >
            <div className="h-3 w-24 animate-pulse rounded-full bg-[#ddd5ff]" />
            <div className="mt-4 h-9 w-32 animate-pulse rounded-full bg-[#ece8ff]" />
            <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-[#f2eeff]" />
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-[26px] border border-white/80 bg-white/76 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
        <div className="h-4 w-full animate-pulse rounded-full bg-[#ece8ff]" />
        <div className="mt-3 h-4 w-11/12 animate-pulse rounded-full bg-[#f2eeff]" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <article
            key={index}
            className="rounded-[24px] border border-white/80 bg-white/78 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
          >
            <div className="h-3 w-28 animate-pulse rounded-full bg-[#ddd5ff]" />
            <div className="mt-4 space-y-3">
              {Array.from({ length: 3 }).map((__, rowIndex) => (
                <div
                  key={rowIndex}
                  className="h-11 animate-pulse rounded-2xl bg-[#f7f7ff]"
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

async function ProxyStatsResults({
  copy,
  locale,
  selectedDate,
  timezoneOffsetMinutes,
}: {
  copy: TranslationDictionary['proxyStats'];
  locale: Locale;
  selectedDate: string;
  timezoneOffsetMinutes: number;
}) {
  let stats: WebshareDailyStats | null = null;
  let errorMessage = '';

  if (process.env.WEBSHARE_API_KEY?.trim()) {
    try {
      stats = await getWebshareDailyStats(selectedDate, timezoneOffsetMinutes);
    } catch (error) {
      errorMessage =
        error instanceof Error ? error.message : copy.statsUnavailable;
    }
  } else {
    errorMessage = copy.setApiKey;
  }

  if (errorMessage) {
    return (
      <div className="mt-8 rounded-[24px] border border-[rgba(248,113,113,0.25)] bg-[rgba(254,242,242,0.94)] px-5 py-5 text-sm leading-7 text-[#991b1b]">
        <p className="font-semibold">{copy.statsUnavailable}</p>
        <p>{errorMessage}</p>
        <p>
          {copy.addApiKey}
        </p>
      </div>
    );
  }

  return stats ? <StatsPanel copy={copy} locale={locale} stats={stats} /> : null;
}

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
