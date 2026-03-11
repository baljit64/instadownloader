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
    <section className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          Search intent coverage
        </span>
        <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3.1rem]">
          Explore focused Instagram download pages
        </h2>
        <p className="mt-5 text-base leading-8 text-[#726a92]">
          These pages target the main Instagram download queries users search for,
          including posts, reels, photos, carousel media, and troubleshooting.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {featuredSeoPages.map((page) => (
          <Link
            key={page.slug}
            href={`/${page.slug}`}
            className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-6 shadow-[0_18px_40px_rgba(118,99,255,0.08)] transition hover:-translate-y-0.5 hover:border-[#cfc5ff]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7b74a3]">
              {page.type === 'guide' ? 'Guide' : 'Tool page'}
            </p>
            <h3 className="font-display mt-4 text-[1.5rem] font-bold tracking-[-0.03em] text-[#171923]">
              {page.shortTitle}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#6d6885]">
              {page.metadataDescription}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
