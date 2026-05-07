import type { TranslationDictionary } from '../../../lib/i18n';
import type { AboutCard } from '../content';
import { DetailCard } from '../primitives';

interface AboutSectionProps {
  aboutCards: AboutCard[];
  copy: TranslationDictionary['aboutSection'];
}

export default function AboutSection({ aboutCards, copy }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="surface-card mt-12 rounded-2xl p-6 sm:p-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">
          {copy.description}
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {aboutCards.map((card) => (
          <DetailCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
