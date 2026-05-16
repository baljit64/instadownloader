export type AnalyticsParamValue = string | number | boolean | null;

export type AnalyticsEventParams = Record<string, AnalyticsParamValue>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: string,
  params: AnalyticsEventParams = {}
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}
