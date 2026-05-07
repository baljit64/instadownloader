import type { TranslationDictionary } from '../../../lib/i18n';

interface ContactSectionProps {
  copy: TranslationDictionary['contactSection'];
}

export default function ContactSection({ copy }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="surface-card mt-12 rounded-2xl p-6 sm:p-8"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            {copy.eyebrow}
          </span>
          <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            {copy.description}
          </p>

          <div className="mt-6">
            <a
              href={`mailto:${copy.emailValue}`}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              {copy.primaryAction}
            </a>
          </div>
        </div>

        <div className="grid gap-3">
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {copy.emailLabel}
            </p>
            <p className="mt-2 font-display text-base font-semibold text-slate-900">
              {copy.emailValue}
            </p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {copy.supportCasesLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{copy.supportCasesValue}</p>
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {copy.supportCoverageLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {copy.supportCoverageValue}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
