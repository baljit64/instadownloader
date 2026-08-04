import Link from 'next/link';
import { absoluteUrl } from '../lib/site';

export interface CapabilityNotice {
  description: string;
  explanation: string[];
  slug: string;
  title: string;
}

export default function CapabilityNoticePage({ notice }: { notice: CapabilityNotice }) {
  const pageUrl = absoluteUrl(`/${notice.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: notice.title,
    description: notice.description,
    url: pageUrl,
    inLanguage: 'en',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Capability notice</p>
      <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{notice.title}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-700">{notice.description}</p>
      <section className="surface-card mt-10 rounded-2xl p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-slate-950">Why this limitation exists</h2>
        {notice.explanation.map((paragraph) => <p className="mt-4 text-base leading-8 text-slate-700" key={paragraph}>{paragraph}</p>)}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white" href="/en">Use the public post downloader</Link>
          <Link className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900" href="/instagram-download-safety-guide">Read the safety guide</Link>
        </div>
      </section>
    </main>
  );
}
