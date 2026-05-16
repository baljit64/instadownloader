import type { TranslationDictionary } from '../../../lib/i18n';
import type { WebsiteTile } from '../content';

interface SupportedPlatformsSectionProps {
  copy: TranslationDictionary['supportedPlatforms'];
  websiteTiles: WebsiteTile[];
}

export default function SupportedPlatformsSection({
  copy,
  websiteTiles,
}: SupportedPlatformsSectionProps) {
  const getPlatformBadge = (label: string) => {
    const normalized = label.trim();

    if (!normalized) {
      return 'NA';
    }

    const words = normalized.split(/[^A-Za-z0-9]+/).filter(Boolean);
    const letters =
      words.length > 1
        ? `${words[0][0] ?? ''}${words[1][0] ?? ''}`
        : (words[0] ?? '').slice(0, 2);

    return letters.toUpperCase();
  };

  return (
    <section
      id="supported-platforms"
      className="surface-card mt-12 rounded-2xl p-6 text-center sm:p-8"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
        {copy.eyebrow}
      </span>
      <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
        {copy.title}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        {copy.sectionDescription}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {websiteTiles.map((tile) => (
          <article
            key={tile.label}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-700"
                aria-label={`${tile.label} platform`}
              >
                {getPlatformBadge(tile.label)}
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tile.statusTone}`}>
                {tile.status}
              </span>
            </div>
            <h3 className="mt-3 text-base font-semibold text-slate-900">{tile.label}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">{tile.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
