import type { TranslationDictionary } from '../../../lib/i18n';

interface ContactSectionProps {
  copy: TranslationDictionary['contactSection'];
}

export default function ContactSection({ copy }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8 lg:px-10"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            {copy.eyebrow}
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3.1rem]">
            {copy.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#726a92]">
            {copy.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${copy.emailValue}`}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7a66f2,#8c71ff)] px-6 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(122,102,242,0.22)] transition hover:brightness-105"
            >
              {copy.primaryAction}
            </a>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
              {copy.emailLabel}
            </p>
            <p className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-[#171923]">
              {copy.emailValue}
            </p>
          </article>
          <article className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
              {copy.supportCasesLabel}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#171923]">
              {copy.supportCasesValue}
            </p>
          </article>
          <article className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
              {copy.supportCoverageLabel}
            </p>
            <p className="mt-3 text-sm leading-7 text-[#171923]">
              {copy.supportCoverageValue}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
