import Link from 'next/link';
import type { LandingPageLink } from '../content';

interface PopularSearchesSectionProps {
  links: LandingPageLink[];
}

export default function PopularSearchesSection({ links }: PopularSearchesSectionProps) {
  if (!links.length) {
    return null;
  }

  return (
    <section className="surface-card mt-12 rounded-2xl p-6 sm:p-8">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Quick links
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Popular Instagram download tools
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Choose the media type or workflow that matches the public Instagram link you
          want to save.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            prefetch={false}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
