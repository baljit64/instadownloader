import Link from 'next/link';
import { getLocalePath, type Locale } from '../../../lib/i18n';
import IconGlyph from '../../IconGlyph';
import LanguageSwitcher from '../../LanguageSwitcher';
import type { LandingPageLink } from '../content';

interface LandingPageHeaderProps {
  languageMenuLabel: string;
  locale: Locale;
  navigation: LandingPageLink[];
}

export default function LandingPageHeader({
  languageMenuLabel,
  locale,
  navigation,
}: LandingPageHeaderProps) {
  return (
    <header className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-6">
        <Link className="flex items-center gap-3" href={getLocalePath(locale)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/85 text-[#6d5cf2] shadow-[0_14px_30px_rgba(109,92,242,0.16)] ring-1 ring-white/70">
            <IconGlyph name="instagram" className="h-6 w-6" strokeWidth={2} />
          </div>
          <div>
            <p className="font-display text-[1.85rem] font-bold tracking-[-0.04em] text-white">
              igdown.io
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 text-sm font-semibold text-white/85 md:flex">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition hover:text-white ${
                index === 0 ? 'border-b-2 border-white pb-1 text-white' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <LanguageSwitcher
          buttonLabel={languageMenuLabel}
          currentLocale={locale}
        />
      </div>
    </header>
  );
}
