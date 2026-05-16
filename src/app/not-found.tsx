import Link from 'next/link';
import { headers } from 'next/headers';
import { defaultLocale, getLocalePath, isSupportedLocale } from './lib/i18n';

function resolveLocale(value: string | null) {
  if (value && isSupportedLocale(value)) {
    return value;
  }

  return defaultLocale;
}

export default async function NotFound() {
  const requestHeaders = await headers();
  const locale = resolveLocale(requestHeaders.get('x-site-locale'));
  const homeHref = getLocalePath(locale);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-20 pt-16 sm:px-6 lg:px-8">
      <div className="reference-top-band" />

      <section className="surface-card relative z-10 mx-auto w-full max-w-2xl rounded-2xl p-8 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Error 404</p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          This page does not exist
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          The link may be broken or the page may have moved. You can return to the
          downloader home page or open one of the popular download tools below.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={homeHref}
            prefetch={false}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-semibold !text-white transition hover:bg-blue-700 hover:!text-white"
          >
            Back to Home
          </Link>
          <Link
            href="/instagram-downloader"
            prefetch={false}
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Instagram Downloader
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
          <Link
            href="/insta-downloader"
            prefetch={false}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
          >
            Insta Downloader
          </Link>
          <Link
            href="/instagram-reel-downloader"
            prefetch={false}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
          >
            Reel Downloader
          </Link>
          <Link
            href="/instagram-post-downloader"
            prefetch={false}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-600 transition hover:border-blue-300 hover:text-blue-700"
          >
            Post Downloader
          </Link>
        </div>
      </section>
    </main>
  );
}
