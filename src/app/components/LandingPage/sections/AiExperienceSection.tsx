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
    <section className="surface-card mt-12 rounded-2xl p-6 md:p-8">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{copy.description}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <article key={card.title} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <IconGlyph name={card.icon} className="h-5 w-5" strokeWidth={2} />
            </div>
            <h3 className="font-display mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
