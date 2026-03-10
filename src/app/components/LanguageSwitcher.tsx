'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  type Locale,
  localeInfo,
  locales,
  localizePathname,
} from '../lib/i18n';

interface LanguageSwitcherProps {
  buttonLabel: string;
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  buttonLabel,
  currentLocale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <details className="relative z-50">
      <summary className="flex h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-4 text-sm font-semibold text-[#251f4f] shadow-[0_12px_24px_rgba(109,92,242,0.1)] transition hover:border-[#7c6cff]/40">
        <span className="text-[0.72rem] uppercase tracking-[0.24em] text-[#7b73a9]">
          {localeInfo[currentLocale].shortLabel}
        </span>
        <span className="hidden sm:inline">{buttonLabel}</span>
        <span aria-hidden="true" className="text-xs text-[#7b73a9]">
          v
        </span>
      </summary>

      <div className="absolute right-0 top-full z-[60] mt-3 w-[17rem] rounded-[24px] border border-white/90 bg-white p-4 shadow-[0_24px_60px_rgba(78,64,166,0.22)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7b73a9]">
          {buttonLabel}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {locales.map((locale) => {
            const hrefPathname = localizePathname(pathname, locale);
            const href = queryString ? `${hrefPathname}?${queryString}` : hrefPathname;
            const isActive = locale === currentLocale;

            return (
              <Link
                key={locale}
                href={href}
                className={`rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-[#6f62ff] text-white shadow-[0_14px_30px_rgba(111,98,255,0.18)]'
                    : 'bg-[#f7f5ff] text-[#251f4f] hover:bg-[#efebff]'
                }`}
              >
                {localeInfo[locale].nativeName}
              </Link>
            );
          })}
        </div>
      </div>
    </details>
  );
}
