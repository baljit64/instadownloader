import Link from 'next/link';
import type { Metadata } from 'next';
import WebshareStatsDateForm from '@/app/components/WebshareStatsDateForm';
import {
  formatUtcOffsetLabel,
  getTodayDateString,
  getWebshareDailyStats,
  parseTimezoneOffsetMinutes,
  type WebshareDailyStats,
} from '@/app/lib/server/webshare-stats';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Proxy Stats',
  description: 'Daily Webshare proxy usage for the downloader backend.',
  robots: {
    index: false,
    follow: false,
  },
};

interface ProxyStatsPageProps {
  searchParams: Promise<{
    date?: string | string[];
    tzOffsetMinutes?: string | string[];
  }>;
}

function getSingleValue(value: string | string[] | undefined): string | null {
  return typeof value === 'string' ? value : Array.isArray(value) ? value[0] ?? null : null;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
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

function formatTimestamp(value: string | null): string {
  if (!value) {
    return 'No requests recorded';
  }

  return new Date(value).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function getTopEntries(record: Record<string, number>) {
  return Object.entries(record).sort((left, right) => right[1] - left[1]).slice(0, 4);
}

function MetricCard({
  label,
  value,
  detail,
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
  entries: Array<[string, number]>;
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
              <span className="font-semibold text-[#2d7cff]">{formatNumber(value)}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-[#726a92]">{emptyLabel}</p>
      )}
    </article>
  );
}

function StatsPanel({ stats }: { stats: WebshareDailyStats }) {
  const protocolEntries = getTopEntries(stats.protocolsUsed);
  const countryEntries = getTopEntries(stats.countriesUsed);

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total Requests"
          value={formatNumber(stats.requestsTotal)}
          detail={`${formatNumber(stats.requestsSuccessful)} succeeded, ${formatNumber(stats.requestsFailed)} failed`}
        />
        <MetricCard
          label="Total Bandwidth"
          value={formatBytes(stats.bandwidthTotal)}
          detail={`Average ${formatBytes(stats.bandwidthAverage)} per request`}
        />
        <MetricCard
          label="Proxies Used"
          value={formatNumber(stats.numberOfProxiesUsed)}
          detail={`Average RPS ${stats.averageRps?.toFixed(4) ?? '0.0000'}`}
        />
        <MetricCard
          label="Last Request"
          value={formatTimestamp(stats.lastRequestSentAt)}
          detail={`Window ${formatUtcOffsetLabel(stats.tzOffsetMinutes)}`}
        />
      </div>

      <div className="mt-4 rounded-[26px] border border-white/80 bg-white/76 px-5 py-5 text-sm leading-7 text-[#726a92] shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
        <p>
          Query window: <span className="font-medium text-[#171923]">{stats.rangeStartIso}</span> to{' '}
          <span className="font-medium text-[#171923]">{stats.rangeEndIso}</span>
        </p>
        <p>
          Webshare counts raw proxy traffic. One user download in this app can create multiple
          proxy requests because the Instagram extractor tries fallback endpoints.
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <BreakdownCard
          emptyLabel="No protocol usage recorded for this day."
          entries={protocolEntries}
          title="Protocol Breakdown"
        />
        <BreakdownCard
          emptyLabel="No country usage recorded for this day."
          entries={countryEntries}
          title="Country Breakdown"
        />
      </div>
    </>
  );
}

export default async function ProxyStatsPage({ searchParams }: ProxyStatsPageProps) {
  const resolvedSearchParams = await searchParams;
  const today = getTodayDateString();
  const selectedDate = getSingleValue(resolvedSearchParams.date) ?? today;
  const timezoneOffsetMinutes = parseTimezoneOffsetMinutes(
    getSingleValue(resolvedSearchParams.tzOffsetMinutes)
  );

  let stats: WebshareDailyStats | null = null;
  let errorMessage = '';

  if (process.env.WEBSHARE_API_KEY?.trim()) {
    try {
      stats = await getWebshareDailyStats(selectedDate, timezoneOffsetMinutes);
    } catch (error) {
      errorMessage =
        error instanceof Error ? error.message : 'Unable to load Webshare stats right now.';
    }
  } else {
    errorMessage = 'Set WEBSHARE_API_KEY on the server to enable this page.';
  }

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
              Internal Usage
            </span>
            <h1 className="font-display mt-4 text-4xl font-bold text-[#171923]">
              Webshare proxy stats
            </h1>
            <p className="mt-4 text-base leading-7 text-[#726a92]">
              This page calls the Webshare aggregate stats API on the server and shows one
              selected day of proxy usage for the downloader backend.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-[rgba(130,113,255,0.18)] bg-white/80 px-5 text-sm font-semibold text-[#171923] transition hover:border-[#2d7cff] hover:text-[#2d7cff]"
          >
            Back to downloader
          </Link>
        </div>

        <div className="mt-8 rounded-[28px] border border-white/80 bg-white/68 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
          <WebshareStatsDateForm initialDate={today} />
        </div>

        {errorMessage ? (
          <div className="mt-8 rounded-[24px] border border-[rgba(248,113,113,0.25)] bg-[rgba(254,242,242,0.94)] px-5 py-5 text-sm leading-7 text-[#991b1b]">
            <p className="font-semibold">Stats unavailable</p>
            <p>{errorMessage}</p>
            <p>
              Add <code>WEBSHARE_API_KEY</code> to your server environment and reload this
              page.
            </p>
          </div>
        ) : null}

        {stats ? <StatsPanel stats={stats} /> : null}
      </section>
    </main>
  );
}
