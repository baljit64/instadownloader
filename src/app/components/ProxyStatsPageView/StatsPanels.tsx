import {
  formatUtcOffsetLabel,
  getWebshareDailyStats,
  type WebshareDailyStats,
} from '../../lib/server/webshare-stats';
import type { Locale, TranslationDictionary } from '../../lib/i18n';
import {
  formatBytes,
  formatNumber,
  formatTimestamp,
  getTopEntries,
} from './formatters';

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

export function StatsPanelSkeleton() {
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

export async function ProxyStatsResults({
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
        <p>{copy.addApiKey}</p>
      </div>
    );
  }

  return stats ? <StatsPanel copy={copy} locale={locale} stats={stats} /> : null;
}
