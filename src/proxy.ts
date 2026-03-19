import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['en', 'hi', 'es', 'fr'] as const;
type Locale = (typeof locales)[number];

const defaultLocale: Locale = 'en';

const localeDirs: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  hi: 'ltr',
  es: 'ltr',
  fr: 'ltr',
};

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function getLocaleFromPath(pathname: string): Locale | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return firstSegment && isLocale(firstSegment) ? firstSegment : null;
}

function detectPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    const baseLocale = candidate.split('-')[0];

    if (baseLocale && isLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return defaultLocale;
}

function applyLocaleHeaders(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-locale', locale);
  requestHeaders.set('x-site-dir', localeDirs[locale]);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const locale = detectPreferredLocale(request.headers.get('accept-language'));
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}`;

    const response = NextResponse.redirect(redirectUrl, 307);
    response.headers.set('Vary', 'Accept-Language');
    return response;
  }

  const locale = getLocaleFromPath(pathname) ?? defaultLocale;
  return applyLocaleHeaders(request, locale);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|opengraph-image|twitter-image).*)',
  ],
};
