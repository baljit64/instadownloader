import { localeInfo, type Locale } from '../../lib/i18n';

export function getSingleValue(value: string | string[] | undefined): string | null {
  return typeof value === 'string' ? value : Array.isArray(value) ? value[0] ?? null : null;
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeInfo[locale].intl).format(value);
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const amount = bytes / 1024 ** exponent;

  return `${amount.toFixed(amount >= 100 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export function formatTimestamp(
  value: string | null,
  locale: Locale,
  emptyLabel: string
): string {
  if (!value) {
    return emptyLabel;
  }

  return new Date(value).toLocaleString(localeInfo[locale].intl, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function getTopEntries(record: Record<string, number>) {
  return Object.entries(record).sort((left, right) => right[1] - left[1]).slice(0, 4);
}
