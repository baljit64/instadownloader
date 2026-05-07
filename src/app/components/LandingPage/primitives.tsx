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
    <article className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${iconClassName}`}
      >
        <IconGlyph name={icon} className="h-7 w-7" strokeWidth={1.9} />
      </div>
      <h2 className="font-display mt-4 text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">{description}</p>
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
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <IconGlyph name={icon} className="h-5 w-5" strokeWidth={2} />
        </div>
        <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
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
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
      <div className="mt-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-slate-200 transition hover:text-white"
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
    <div className="mx-auto w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`h-10 w-10 rounded-full ${
            isNight
              ? 'bg-gradient-to-br from-slate-700 to-slate-900'
              : 'bg-gradient-to-br from-pink-300 to-orange-300'
          }`}
        />
        <div className="text-left">
          <p className="text-sm font-semibold text-slate-900">
            {isNight ? 'murphy.june' : 'codyfisher'}
          </p>
          <p className="text-xs text-slate-500">{copy.location}</p>
        </div>
      </div>

      <div
        className={`mt-4 overflow-hidden rounded-xl ${
          isNight ? 'h-64 bg-gradient-to-b from-slate-700 to-slate-900' : 'h-56 bg-slate-100'
        }`}
      >
        {isNight ? (
          <div className="flex h-full items-end p-4">
            <div className="flex w-full items-center justify-between rounded-lg bg-white/10 p-3 text-white">
              <div>
                <p className="text-sm font-semibold">{copy.previewReady}</p>
                <p className="text-xs text-white/75">{copy.previewDetected}</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <IconGlyph name="download" className="h-4 w-4" strokeWidth={2} />
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-sm text-slate-900">
        <span className="font-semibold">{copy.likedBy}</span>
      </p>
      <p className="mt-2 text-sm text-slate-600">
        {isNight ? copy.reelCaption : copy.photoCaption}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
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
      className={`surface-card grid items-center gap-8 rounded-2xl p-6 md:p-8 ${
        isNight ? 'lg:grid-cols-[minmax(0,1fr)_22rem]' : 'lg:grid-cols-[22rem_minmax(0,1fr)]'
      }`}
    >
      {isNight ? null : <MockInstagramCard copy={mockCardCopy} variant={variant} />}

      <div className={isNight ? 'text-left lg:pr-3' : 'text-left lg:pl-3'}>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{copy.description}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          {copy.learnMore}
          <span>→</span>
        </Link>
      </div>

      {isNight ? <MockInstagramCard copy={mockCardCopy} variant={variant} /> : null}
    </section>
  );
}
