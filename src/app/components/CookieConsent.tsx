'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useSyncExternalStore } from 'react';

type ConsentChoice = 'accepted' | 'declined' | 'loading' | 'unset';

const CONSENT_KEY = 'igdown-analytics-consent';
const CONSENT_EVENT = 'igdown:consent-change';

function getConsentSnapshot(): ConsentChoice {
  const storedChoice = window.localStorage.getItem(CONSENT_KEY);
  return storedChoice === 'accepted' || storedChoice === 'declined' ? storedChoice : 'unset';
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
}

export default function CookieConsent({ measurementId }: { measurementId: string }) {
  const choice = useSyncExternalStore(subscribeToConsent, getConsentSnapshot, () => 'loading');

  function choose(nextChoice: 'accepted' | 'declined') {
    window.localStorage.setItem(CONSENT_KEY, nextChoice);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  return (
    <>
      {choice === 'accepted' ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag(){window.dataLayer.push(arguments);};
              gtag('js', new Date());
              gtag('config', '${measurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}

      {choice === 'unset' ? (
        <aside
          aria-label="Analytics cookie preferences"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        >
          <p className="font-display text-base font-semibold text-slate-900">
            Optional analytics
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            We use optional Google Analytics only with your permission. The downloader works
            the same if you decline. Read the <Link className="font-semibold text-blue-700 underline" href="/cookie-policy">cookie policy</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => choose('accepted')}
              type="button"
            >
              Allow analytics
            </button>
            <button
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={() => choose('declined')}
              type="button"
            >
              Decline
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
