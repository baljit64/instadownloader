'use client';

const CONSENT_KEY = 'igdown-analytics-consent';
const CONSENT_EVENT = 'igdown:consent-change';

export default function ResetCookieConsentButton() {
  function resetConsent() {
    window.localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  return (
    <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" onClick={resetConsent} type="button">
      Reset analytics preference
    </button>
  );
}
