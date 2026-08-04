import Link from 'next/link';
import type { SeoPageConfig } from '../../../lib/seo-pages';
import type { LandingPageLink } from '../content';

interface SeoResourcesSectionProps {
  allSeoPageLinks: LandingPageLink[];
  featuredSeoPages: SeoPageConfig[];
}

export default function SeoResourcesSection({
  allSeoPageLinks,
  featuredSeoPages,
}: SeoResourcesSectionProps) {
  if (!featuredSeoPages.length && !allSeoPageLinks.length) {
    return null;
  }

  return (
    <section className="surface-card mt-12 rounded-2xl p-6 sm:p-8">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Download help
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Instagram download guides and troubleshooting
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Find media-specific instructions, device help, safety guidance, and practical
          fixes for public links that do not resolve as expected.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredSeoPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            prefetch={false}
            className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {page.type === 'guide' ? 'Guide' : 'Tool page'}
            </p>
            <h3 className="font-display mt-3 text-base font-semibold text-slate-900">
              {page.shortTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{page.metadataDescription}</p>
          </Link>
        ))}
      </div>

      {allSeoPageLinks.length ? (
        <div className="mt-8">
          <h3 className="font-display text-base font-semibold text-slate-900">
            All download resources
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Browse every current guide and supported downloader page.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {allSeoPageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
