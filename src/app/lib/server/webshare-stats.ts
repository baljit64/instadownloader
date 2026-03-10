import axios from 'axios';

const WEBSHARE_STATS_ENDPOINT = 'https://proxy.webshare.io/api/v2/stats/aggregate/';
const WEBSHARE_REQUEST_TIMEOUT_MS = 15_000;

interface WebshareAggregateResponse {
  average_concurrency?: number;
  average_rps?: number;
  bandwidth_average?: number;
  bandwidth_total?: number;
  countries_used?: Record<string, number>;
  last_request_sent_at?: string | null;
  number_of_proxies_used?: number;
  protocols_used?: Record<string, number>;
  requests_failed?: number;
  requests_successful?: number;
  requests_total?: number;
}

export interface WebshareDailyStats {
  averageConcurrency: number | null;
  averageRps: number | null;
  bandwidthAverage: number;
  bandwidthTotal: number;
  countriesUsed: Record<string, number>;
  date: string;
  lastRequestSentAt: string | null;
  numberOfProxiesUsed: number;
  protocolsUsed: Record<string, number>;
  rangeEndIso: string;
  rangeStartIso: string;
  requestsFailed: number;
  requestsSuccessful: number;
  requestsTotal: number;
  tzOffsetMinutes: number;
}

function coerceWholeNumber(value: string | null | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function validateDateInput(date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error('Invalid date. Use YYYY-MM-DD.');
  }

  return date;
}

function getUtcRangeForLocalDate(date: string, tzOffsetMinutes: number) {
  const [year, month, day] = validateDateInput(date)
    .split('-')
    .map((part) => Number.parseInt(part, 10));

  const startMs = Date.UTC(year, month - 1, day, 0, 0, 0) + tzOffsetMinutes * 60_000;
  const endMs = startMs + 86_400_000 - 1;

  return {
    endIso: new Date(endMs).toISOString(),
    startIso: new Date(startMs).toISOString(),
  };
}

export function getTodayDateString(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function parseTimezoneOffsetMinutes(rawValue: string | null | undefined): number {
  const parsed = coerceWholeNumber(rawValue, 0);

  if (parsed < -840 || parsed > 840) {
    return 0;
  }

  return parsed;
}

export function formatUtcOffsetLabel(tzOffsetMinutes: number): string {
  const totalMinutes = -tzOffsetMinutes;
  const sign = totalMinutes >= 0 ? '+' : '-';
  const absoluteMinutes = Math.abs(totalMinutes);
  const hours = String(Math.floor(absoluteMinutes / 60)).padStart(2, '0');
  const minutes = String(absoluteMinutes % 60).padStart(2, '0');

  return `UTC${sign}${hours}:${minutes}`;
}

export async function getWebshareDailyStats(
  date: string,
  tzOffsetMinutes: number
): Promise<WebshareDailyStats> {
  const apiKey = process.env.WEBSHARE_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('Missing WEBSHARE_API_KEY.');
  }

  const { startIso, endIso } = getUtcRangeForLocalDate(date, tzOffsetMinutes);
  const planId = process.env.WEBSHARE_PLAN_ID?.trim();

  const response = await axios.get<WebshareAggregateResponse>(WEBSHARE_STATS_ENDPOINT, {
    headers: {
      Authorization: `Token ${apiKey}`,
    },
    params: {
      timestamp__gte: startIso,
      timestamp__lte: endIso,
      ...(planId ? { plan_id: planId } : {}),
    },
    timeout: WEBSHARE_REQUEST_TIMEOUT_MS,
  });

  const payload = response.data ?? {};

  return {
    averageConcurrency:
      typeof payload.average_concurrency === 'number' ? payload.average_concurrency : null,
    averageRps: typeof payload.average_rps === 'number' ? payload.average_rps : null,
    bandwidthAverage:
      typeof payload.bandwidth_average === 'number' ? payload.bandwidth_average : 0,
    bandwidthTotal: typeof payload.bandwidth_total === 'number' ? payload.bandwidth_total : 0,
    countriesUsed: payload.countries_used ?? {},
    date,
    lastRequestSentAt:
      typeof payload.last_request_sent_at === 'string' ? payload.last_request_sent_at : null,
    numberOfProxiesUsed:
      typeof payload.number_of_proxies_used === 'number' ? payload.number_of_proxies_used : 0,
    protocolsUsed: payload.protocols_used ?? {},
    rangeEndIso: endIso,
    rangeStartIso: startIso,
    requestsFailed: typeof payload.requests_failed === 'number' ? payload.requests_failed : 0,
    requestsSuccessful:
      typeof payload.requests_successful === 'number' ? payload.requests_successful : 0,
    requestsTotal: typeof payload.requests_total === 'number' ? payload.requests_total : 0,
    tzOffsetMinutes,
  };
}
