import Image from 'next/image';
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
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100">
                <Image
                  src={tile.icon}
                  alt=""
                  width={30}
                  height={30}
                  unoptimized
                  className="h-7 w-7 object-contain"
                />
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
