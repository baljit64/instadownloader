import Link from 'next/link';
import type { TrustPageConfig } from '../lib/trust-pages';
import { absoluteUrl } from '../lib/site';
import ResetCookieConsentButton from './ResetCookieConsentButton';

export default function TrustContentPage({ page }: { page: TrustPageConfig }) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': page.slug === 'contact' ? 'ContactPage' : page.slug === 'about' ? 'AboutPage' : 'WebPage',
    '@id': `${pageUrl}#webpage`,
    name: page.title,
    description: page.description,
    url: pageUrl,
    inLanguage: 'en',
    dateModified: `${page.updatedAt}T00:00:00.000Z`,
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Instagram Downloader', item: absoluteUrl('/en') },
        { '@type': 'ListItem', position: 2, name: page.title, item: pageUrl },
      ],
    },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <Link className="font-medium text-blue-700" href="/en">Home</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page">{page.title}</span>
      </nav>
      <header className="mt-8 max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">{page.eyebrow}</p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{page.title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-700">{page.intro}</p>
        <p className="mt-3 text-sm text-slate-500">Last updated: 5 August 2026</p>
        {page.slug === 'contact' ? (
          <a className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white" href="mailto:support@igdown.pro">Email support@igdown.pro</a>
        ) : null}
      </header>
      <div className="mt-12 space-y-8">
        {page.sections.map((section) => (
          <section className="surface-card rounded-2xl p-6 sm:p-8" key={section.heading}>
            <h2 className="font-display text-2xl font-semibold text-slate-950">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p className="mt-4 text-base leading-8 text-slate-700" key={paragraph}>{paragraph}</p>
            ))}
            {section.points ? (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700">
                {section.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            ) : null}
            {page.slug === 'cookie-policy' && section.heading === 'Changing your choice' ? <ResetCookieConsentButton /> : null}
          </section>
        ))}
      </div>
    </main>
  );
}
