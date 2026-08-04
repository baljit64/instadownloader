# Implemented SEO Code

Production code remains in the application’s normal `src/` tree; this directory indexes the implementation rather than duplicating deployable source.

## Main changes

- Homepage guide: `src/app/components/LandingPage/sections/HomeGuideSection.tsx`
- Homepage FAQ/schema/link model: `src/app/components/LandingPage/content.ts`
- SEO page registry and metadata: `src/app/lib/seo-pages.ts`
- Core page detail content: `src/app/lib/seo-page-details.ts`
- SEO route schema/rendering: `src/app/components/SeoContentPage.tsx`
- Canonical aliases and locale redirects: `src/proxy.ts`
- Sitemap and image/hreflang entries: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`
- Sitewide entities/default metadata: `src/app/layout.tsx`, `src/app/lib/site.ts`
- Trust content/routes: `src/app/lib/trust-pages.ts`, `src/app/(trust)/`
- Unsupported capability notices: `src/app/(unsupported)/`
- Public navigation: `src/app/components/PublicSiteHeader.tsx`, `PublicSiteFooter.tsx`
- Consent-gated analytics: `src/app/components/CookieConsent.tsx`
- Accessible downloader updates: `src/app/components/HeroDownloadForm/index.tsx`
- SEO governance tests: `src/app/lib/__tests__/seo-pages.test.ts`

## Verification commands

```bash
npx tsc --noEmit
npm run lint
npm test
npm run build
npm audit
```

Post-deploy checks requiring a production URL are listed in the audit and schema/performance reports.

