import type { TranslationDictionary } from '../../../lib/i18n';
import HeroDownloadForm from '../../HeroDownloadForm';

interface HeroSectionProps {
  hero: TranslationDictionary['hero'];
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="px-4 pb-4 pt-12 text-center sm:px-6">
      <div className="mx-auto mb-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
        {hero.aiSignals.map((signal) => (
          <span
            key={signal}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {signal}
          </span>
        ))}
      </div>

      <h1 className="font-display mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
        {hero.title}
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        {hero.subtitle}
      </p>

      <HeroDownloadForm copy={hero} formats={hero.formats} />
    </section>
  );
}
