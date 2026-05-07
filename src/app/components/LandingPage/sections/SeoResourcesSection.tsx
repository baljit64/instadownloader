import Link from 'next/link';
import type { SeoPageConfig } from '../../../lib/seo-pages';

interface SeoResourcesSectionProps {
  featuredSeoPages: SeoPageConfig[];
}

export default function SeoResourcesSection({
  featuredSeoPages,
}: SeoResourcesSectionProps) {
  if (!featuredSeoPages.length) {
    return null;
  }

  return (
    <section className="surface-card mt-12 rounded-2xl p-6 sm:p-8">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Search intent coverage
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Explore focused Instagram download pages
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          These pages target the main Instagram download queries users search for,
          including posts, reels, photos, carousel media, and troubleshooting.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredSeoPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
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
    </section>
  );
}
