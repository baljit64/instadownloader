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
    <header className="relative z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2.5" href={getLocalePath(locale)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <IconGlyph name="instagram" className="h-5 w-5" strokeWidth={2} />
          </div>
          <p className="font-display text-xl font-semibold tracking-tight text-slate-900">
            igdown.pro
          </p>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navigation.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition hover:text-slate-900 ${
                index === 0 ? 'text-slate-900' : ''
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
