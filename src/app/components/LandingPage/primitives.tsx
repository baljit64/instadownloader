import Link from 'next/link';
import IconGlyph, { type IconGlyphName } from '../IconGlyph';
import type { TranslationDictionary } from '../../lib/i18n';

export function BenefitCard({
  description,
  icon,
  iconClassName,
  title,
}: {
  description: string;
  icon: IconGlyphName;
  iconClassName: string;
  title: string;
}) {
  return (
    <article className="text-center">
      <div
        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] ${iconClassName}`}
      >
        <IconGlyph name={icon} className="h-10 w-10" strokeWidth={1.8} />
      </div>
      <h2 className="font-display mt-7 text-[2rem] font-bold tracking-[-0.03em] text-[#191534]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-[#8c88a4]">
        {description}
      </p>
    </article>
  );
}

export function DetailCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: IconGlyphName;
  title: string;
}) {
  return (
    <article className="rounded-[28px] border border-white/80 bg-white/70 px-6 py-8 text-center shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center text-[#171923]">
        <IconGlyph name={icon} className="h-8 w-8" strokeWidth={2} />
      </div>
      <h3 className="font-display mt-5 text-[1.95rem] font-bold tracking-[-0.03em] text-[#cb2e79]">
        {title}
      </h3>
      <div className="mx-auto mt-6 h-px w-full max-w-[18rem] bg-[#e6dfef]" />
      <p className="mx-auto mt-6 max-w-[22rem] text-base leading-8 text-[#5b5867]">
        {description}
      </p>
    </article>
  );
}

export function FooterColumn({
  links,
  title,
}: {
  links: Array<{ href: string; label: string }>;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
        {title}
      </h3>
      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-white/72 transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MockInstagramCard({
  copy,
  variant,
}: {
  copy: TranslationDictionary['mockCard'];
  variant: 'night' | 'ocean';
}) {
  const isNight = variant === 'night';

  return (
    <div className="mx-auto w-full max-w-[23rem] rounded-[2rem] border border-[#f0edf8] bg-white p-4 shadow-[0_30px_70px_rgba(33,28,69,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-full ${
              isNight
                ? 'bg-[linear-gradient(135deg,#3b1f47,#d04273)]'
                : 'bg-[linear-gradient(135deg,#d7d9df,#8891a8)]'
            }`}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-[#1d173a]">
              {isNight ? 'murphy.june' : 'codyfisher'}
            </p>
            <p className="text-xs text-[#9993b3]">{copy.location}</p>
          </div>
        </div>
        <div className="flex gap-1 text-[#b4afc8]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </div>
      </div>

      <div
        className={`relative mt-4 overflow-hidden rounded-[1.6rem] ${
          isNight
            ? 'h-[20rem] bg-[radial-gradient(circle_at_top,#0d6a63_0%,#111827_36%,#0a0c14_100%)]'
            : 'h-[17rem] bg-[linear-gradient(90deg,#f7e4dc_0%,#e9ecef_34%,#c5f1f1_65%,#88d7ea_100%)]'
        }`}
      >
        {isNight ? (
          <>
            <div className="absolute inset-x-10 top-12 h-24 rounded-full bg-[radial-gradient(circle,rgba(111,255,216,0.24),rgba(111,255,216,0))]" />
            <div className="absolute left-6 top-6 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Reel
            </div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(7,11,20,0),rgba(7,11,20,0.92))]" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <p className="text-lg font-semibold">{copy.previewReady}</p>
                <p className="text-xs text-white/70">{copy.previewDetected}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/14">
                <IconGlyph name="download" className="h-5 w-5" strokeWidth={2} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute left-[54%] top-[46%] h-2.5 w-20 -translate-x-1/2 rounded-full bg-[#c98a46] shadow-[0_10px_20px_rgba(201,138,70,0.28)]" />
            <div className="absolute left-[48%] top-[46%] h-2 w-6 -translate-x-1/2 rounded-full bg-[#a86f34]" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.2))]" />
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-[#8d86a9]">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#ff637f]" />
          <span className="h-4 w-4 rounded-full bg-[#ded7ef]" />
          <span className="h-4 w-4 rounded-full bg-[#ece7fb]" />
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#2b2744]" />
          <span className="h-2 w-2 rounded-full bg-[#615b7e]" />
          <span className="h-2 w-2 rounded-full bg-[#b1acc4]" />
        </div>
      </div>

      <p className="mt-4 text-sm text-[#282143]">
        <span className="font-semibold">{copy.likedBy}</span>
      </p>
      <p className="mt-2 text-sm text-[#6f678f]">
        {isNight ? copy.reelCaption : copy.photoCaption}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#b0abc4]">
        {isNight ? copy.reelPreviewLabel : copy.photoPreviewLabel}
      </p>
    </div>
  );
}

export function SpotlightSection({
  copy,
  href,
  id,
  mockCardCopy,
  variant,
}: {
  copy: TranslationDictionary['spotlight'][number];
  href: string;
  id: string;
  mockCardCopy: TranslationDictionary['mockCard'];
  variant: 'night' | 'ocean';
}) {
  const isNight = variant === 'night';

  return (
    <section
      id={id}
      className={`grid items-center gap-12 ${
        isNight ? 'lg:grid-cols-[minmax(0,1fr)_24rem]' : 'lg:grid-cols-[24rem_minmax(0,1fr)]'
      }`}
    >
      {isNight ? null : <MockInstagramCard copy={mockCardCopy} variant={variant} />}

      <div className={`${isNight ? 'text-left lg:pr-10' : 'text-left lg:pl-10'}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f86ff]">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] text-[#17142d] sm:text-[3.35rem]">
          {copy.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-9 text-[#6f688d]">
          {copy.description}
        </p>
        <Link
          href={href}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6c5ce7]"
        >
          {copy.learnMore}
          <span className="text-lg leading-none">+</span>
        </Link>
      </div>

      {isNight ? <MockInstagramCard copy={mockCardCopy} variant={variant} /> : null}
    </section>
  );
}
