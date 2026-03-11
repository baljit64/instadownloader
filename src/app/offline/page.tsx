import type { Metadata } from 'next';
import Link from 'next/link';
import { defaultLocale } from '../lib/i18n';

export const metadata: Metadata = {
  title: 'Offline',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <section className="surface-card w-full rounded-[36px] px-6 py-10 text-center sm:px-10">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          Offline mode
        </span>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3rem]">
          You are offline right now
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#726a92]">
          The downloader needs a network connection to fetch public media, but the app shell is
          still available. Reconnect and try the link again.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href={`/${defaultLocale}`}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7a66f2,#8c71ff)] px-6 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(122,102,242,0.22)] transition hover:brightness-105"
          >
            Back to app
          </Link>
        </div>
      </section>
    </main>
  );
}
