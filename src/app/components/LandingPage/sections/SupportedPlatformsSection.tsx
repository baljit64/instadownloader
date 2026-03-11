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
      className="surface-card mt-24 rounded-[38px] px-6 py-10 text-center sm:px-8"
    >
      <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
        {copy.eyebrow}
      </span>
      <h2 className="font-display mt-4 text-4xl font-bold text-[#171923]">
        {copy.title}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#726a92]">
        {copy.sectionDescription}
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {websiteTiles.map((tile) => (
          <article
            key={tile.label}
            className="rounded-[28px] border border-white/80 bg-white/76 px-5 py-6 text-left shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#f5f7ff] shadow-[inset_0_0_0_1px_rgba(214,223,255,0.9)]">
                <Image
                  src={tile.icon}
                  alt=""
                  width={40}
                  height={40}
                  unoptimized
                  className="h-10 w-10 object-contain"
                />
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${tile.statusTone}`}
              >
                {tile.status}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#171923]">{tile.label}</h3>
            <p className="mt-2 text-sm leading-6 text-[#726a92]">{tile.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
