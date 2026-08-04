import Link from 'next/link';
import type { SeoPageConfig } from '../lib/seo-pages';
import { seoPageDetails } from '../lib/seo-page-details';
import { absoluteUrl, siteName } from '../lib/site';

function getReviewDateIso(value: string): string {
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

function formatReviewDate(value: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00.000Z`));
}

function buildStructuredData(page: SeoPageConfig) {
  const pageUrl = absoluteUrl(`/${page.slug}`);
  const pageId = `${pageUrl}#webpage`;
  const primaryEntityId = `${pageUrl}#primary-entity`;
  const organizationId = `${absoluteUrl('/')}#organization`;
  const websiteId = `${absoluteUrl('/')}#website`;
  const reviewedAtIso = getReviewDateIso(page.lastReviewedAt);
  const faqEntities = page.faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@id': pageId,
        '@type': 'WebPage',
        name: page.metadataTitle,
        description: page.metadataDescription,
        url: pageUrl,
        inLanguage: 'en',
        dateModified: reviewedAtIso,
        isPartOf: {
          '@id': websiteId,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Instagram Downloader',
            item: absoluteUrl('/en'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.shortTitle,
            item: pageUrl,
          },
        ],
      },
      ...(page.type === 'guide'
        ? [
            {
              '@id': primaryEntityId,
              '@type': 'Article',
              headline: page.heroTitle,
              name: page.metadataTitle,
              description: page.metadataDescription,
              url: pageUrl,
              inLanguage: 'en',
              dateModified: reviewedAtIso,
              keywords: page.keywords.join(', '),
              mainEntityOfPage: {
                '@id': pageId,
              },
              author: {
                '@type': 'Organization',
                name: siteName,
                url: absoluteUrl('/about'),
              },
              publisher: {
                '@id': organizationId,
              },
              image: absoluteUrl('/opengraph-image'),
            },
          ]
        : [
            {
              '@id': primaryEntityId,
              '@type': ['WebApplication', 'SoftwareApplication'],
              name: page.shortTitle,
              description: page.metadataDescription,
              url: pageUrl,
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Windows, macOS, Linux, Android, iOS',
              browserRequirements: 'Requires JavaScript and a modern browser',
              isAccessibleForFree: true,
              publisher: {
                '@id': organizationId,
              },
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            },
          ]),
      ...(faqEntities.length
        ? [
            {
              '@type': 'FAQPage',
              inLanguage: 'en',
              mainEntity: faqEntities,
            },
          ]
        : []),
    ],
  };
}

export default function SeoContentPage({
  page,
  relatedPages,
}: {
  page: SeoPageConfig;
  relatedPages: SeoPageConfig[];
}) {
  const structuredData = buildStructuredData(page);
  const reviewedLabel = formatReviewDate(page.lastReviewedAt);
  const detailSections = seoPageDetails[page.slug] ?? [];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="surface-card rounded-[40px] px-6 py-10 sm:px-10 lg:px-12">
        <nav className="text-sm text-[#726a92]">
          <Link href="/en" prefetch={false} className="font-medium text-[#2d7cff]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>{page.shortTitle}</span>
        </nav>

        <div className="mt-6 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            {page.heroEyebrow}
          </span>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-[#7a7398]">
            Last updated: {reviewedLabel}
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold tracking-[-0.05em] text-[#171923] sm:text-[3.6rem]">
            {page.heroTitle}
          </h1>
          <p className="mt-6 text-lg leading-9 text-[#5d5873]">
            {page.heroDescription}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/en"
            prefetch={false}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7a66f2,#8c71ff)] px-6 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(122,102,242,0.22)] transition hover:brightness-105"
          >
            Open downloader
          </Link>
          <Link
            href="/en"
            prefetch={false}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[rgba(130,113,255,0.18)] bg-white/82 px-5 text-sm font-semibold text-[#171923] transition hover:border-[#2d7cff] hover:text-[#2d7cff]"
          >
            Main downloader page
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {page.highlights.map((highlight) => (
          <article
            key={highlight}
            className="rounded-[28px] border border-white/80 bg-white/78 px-5 py-6 shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
          >
            <p className="text-sm leading-7 text-[#4c4760]">{highlight}</p>
          </article>
        ))}
      </section>

      <section className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            At a glance
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[2.7rem]">
            What this {page.type === 'guide' ? 'guide' : 'tool'} covers
          </h2>
          <p className="mt-5 text-base leading-8 text-[#726a92]">
            {page.shortTitle} explains the supported public-link workflow, the checks to
            make before downloading, and the limitations that can affect a result.
          </p>
        </div>
      </section>

      {detailSections.length ? (
        <section aria-labelledby="detailed-guide" className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            Detailed guide
          </span>
          <h2 id="detailed-guide" className="font-display mt-4 text-3xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[2.7rem]">
            Capabilities, quality, and limitations
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {detailSections.map((section) => (
              <article key={section.heading}>
                <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-[#171923]">
                  {section.heading}
                </h3>
                {section.paragraphs.map((paragraph) => (
                  <p className="mt-4 text-sm leading-7 text-[#6d6885]" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#6d6885]">
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          Step by step
        </span>
        <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[2.7rem]">
          How to use this Instagram flow
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {page.steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-6 shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f1edff] text-sm font-semibold text-[#5f54f5]">
                {index + 1}
              </span>
              <h3 className="font-display mt-5 text-[1.45rem] font-bold tracking-[-0.03em] text-[#171923]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6d6885]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          FAQ
        </span>
        <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[2.7rem]">
          Common questions
        </h2>

        <div className="mt-8 space-y-4">
          {page.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-[24px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-[#171923]">
                {faq.question}
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#6d6885]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          Related pages
        </span>
        <h2 className="font-display mt-4 text-3xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[2.7rem]">
          Keep exploring Instagram download topics
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedPages.map((relatedPage) => (
            <Link
              key={relatedPage.slug}
              href={`/${relatedPage.slug}`}
              prefetch={false}
              className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-6 shadow-[0_18px_40px_rgba(118,99,255,0.08)] transition hover:-translate-y-0.5 hover:border-[#cfc5ff]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7b74a3]">
                {relatedPage.type === 'guide' ? 'Guide' : 'Tool page'}
              </p>
              <h3 className="font-display mt-4 text-[1.4rem] font-bold tracking-[-0.03em] text-[#171923]">
                {relatedPage.shortTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#6d6885]">
                {relatedPage.metadataDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
