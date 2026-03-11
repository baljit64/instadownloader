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
      className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8"
    >
      <div className="mx-auto max-w-5xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3.1rem]">
          {copy.title}
        </h2>
        <p className="mx-auto mt-5 max-w-5xl text-lg leading-9 text-[#5b5867]">
          {copy.description}
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {aboutCards.map((card) => (
          <DetailCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
