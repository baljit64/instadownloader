import type { TranslationDictionary } from '../../../lib/i18n';
import HeroDownloadForm from '../../HeroDownloadForm';
import IconGlyph from '../../IconGlyph';
import { heroDecorations, heroDots } from '../constants';

interface HeroSectionProps {
  hero: TranslationDictionary['hero'];
}

export default function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-4 pt-10 text-center sm:px-10">
      {heroDecorations.map((item) => (
        <div
          key={`${item.icon}-${item.className}`}
          aria-hidden="true"
          className={`absolute hidden h-14 w-14 items-center justify-center rounded-2xl ${item.className} ${item.toneClassName} animate-[drift_7s_ease-in-out_infinite] lg:flex`}
        >
          <IconGlyph name={item.icon} className="h-7 w-7" strokeWidth={2} />
        </div>
      ))}

      {heroDots.map((className) => (
        <span
          key={className}
          aria-hidden="true"
          className={`absolute hidden h-2.5 w-2.5 rounded-full opacity-80 lg:block ${className}`}
        />
      ))}

      <div className="ai-hero-pill">
        {hero.aiSignals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>

      <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-[-0.05em] text-[#2a2d89] sm:text-6xl lg:text-[4.7rem]">
        {hero.title}
      </h1>

      <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-[#333047] sm:text-[1.45rem]">
        {hero.subtitle}
      </p>

      <HeroDownloadForm copy={hero} formats={hero.formats} />
    </section>
  );
}
