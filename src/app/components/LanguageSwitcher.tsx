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
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-400">
        <span className="text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">
          {localeInfo[currentLocale].shortLabel}
        </span>
        <span className="hidden sm:inline">{buttonLabel}</span>
        <span aria-hidden="true" className="text-[0.65rem] text-slate-500">
          v
        </span>
      </summary>

      <div className="absolute right-0 top-full z-[60] mt-2 w-[16rem] rounded-lg border border-slate-200 bg-white p-3 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {buttonLabel}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {locales.map((locale) => {
            const hrefPathname = localizePathname(pathname, locale);
            const href = queryString ? `${hrefPathname}?${queryString}` : hrefPathname;
            const isActive = locale === currentLocale;

            return (
              <Link
                key={locale}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
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
