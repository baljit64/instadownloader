import type { TranslationDictionary } from '../../../lib/i18n';
import IconGlyph from '../../IconGlyph';
import type { AiExperienceCard } from '../content';

interface AiExperienceSectionProps {
  cards: AiExperienceCard[];
  copy: TranslationDictionary['aiExperience'];
}

export default function AiExperienceSection({
  cards,
  copy,
}: AiExperienceSectionProps) {
  return (
    <section className="ai-experience-shell">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#816eff]">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.04em] text-[#18142f] sm:text-[3.35rem]">
          {copy.title}
        </h2>
        <p className="mt-5 text-lg leading-9 text-[#6d6887]">
          {copy.description}
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="ai-experience-card">
            <div className="ai-experience-icon">
              <IconGlyph name={card.icon} className="h-7 w-7" strokeWidth={2} />
            </div>
            <h3 className="font-display mt-6 text-[1.65rem] font-bold tracking-[-0.03em] text-[#191534]">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#6f6988]">
              {card.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
