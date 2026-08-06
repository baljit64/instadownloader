import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  defaultLocale,
  detectPreferredLocale,
  isSupportedLocale,
  localeInfo,
  type Locale,
} from './app/lib/i18n/locales';
const canonicalPathRedirects = new Map<string, string>([
  ['/instagram-downloader', '/en'],
  ['/insta-downloader', '/en'],
  ['/reels-downloader', '/instagram-reel-downloader'],
  ['/photo-downloader', '/instagram-photo-downloader'],
  ['/carousel-downloader', '/instagram-carousel-downloader'],
  ['/download-instagram-posts', '/instagram-post-downloader'],
  ['/download-instagram-reels', '/instagram-reel-downloader'],
  ['/download-instagram-videos', '/instagram-video-downloader'],
  ['/instagram-to-mp4', '/instagram-video-downloader'],
  ['/download-instagram-stories', '/story-downloader'],
]);

function getLocaleFromPath(pathname: string): Locale | null {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  return firstSegment && isSupportedLocale(firstSegment) ? firstSegment : null;
}

function normalizePathname(pathname: string): string {
  if (pathname === '/') {
    return pathname;
  }

  return pathname.replace(/\/+$/, '');
}

function applyLocaleHeaders(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-locale', locale);
  requestHeaders.set('x-site-dir', localeInfo[locale].dir);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function proxy(request: NextRequest) {
  const hostHeader = request.headers.get('host');
  const normalizedHost = hostHeader?.toLowerCase() ?? '';
  const originalPathname = request.nextUrl.pathname;
  const normalizedPathname = normalizePathname(originalPathname);
  const canonicalPathRedirectTarget = canonicalPathRedirects.get(normalizedPathname);

  // Canonical host: redirect www.* to the root domain.
  if (normalizedHost.startsWith('www.')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.host = normalizedHost.slice(4);
    let varyByLanguage = false;

    if (originalPathname === '/') {
      const locale = detectPreferredLocale(request.headers.get('accept-language'));
      redirectUrl.pathname = `/${locale}`;
      varyByLanguage = true;
    } else if (canonicalPathRedirectTarget) {
      redirectUrl.pathname = canonicalPathRedirectTarget;
    }

    const response = NextResponse.redirect(redirectUrl, 308);
    if (varyByLanguage) {
      response.headers.set('Vary', 'Accept-Language');
    }

    return response;
  }

  const { pathname } = request.nextUrl;

  if (canonicalPathRedirectTarget) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = canonicalPathRedirectTarget;
    return NextResponse.redirect(redirectUrl, 308);
  }

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
    '/((?!api|_next/static|_next/image|_vercel|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|opengraph-image|twitter-image).*)',
  ],
};
