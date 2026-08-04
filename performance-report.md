# Performance Report

## Targets

Use Google’s field thresholds at the 75th percentile, split by mobile and desktop: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. The brief’s LCP-under-2-seconds goal is retained as an internal stretch target, but 2.5 seconds is Google’s documented “good” threshold. Source: [web.dev Core Web Vitals](https://web.dev/articles/vitals), [threshold methodology](https://web.dev/articles/defining-core-web-vitals-thresholds).

## Current implementation strengths

- Public explanatory content is server rendered.
- Downloader interactivity is isolated to a client component.
- Result preview code is lazy-loaded only after successful extraction.
- Content images use `next/image`, intrinsic dimensions/`fill`, and responsive `sizes`.
- Google Analytics is not fetched before consent.
- Vercel Analytics and Speed Insights are opt-in by environment variable.
- A system font stack avoids external font requests and build-time font downloads.
- Static localized, SEO, trust, and capability pages minimize per-request rendering work.
- The sitemap, robots, OG images, and manifest use native metadata routes.

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Ant Design in the interactive form | Client JS and CSS cost | Measure route chunks; replace only if field INP/LCP data justifies the migration |
| System fonts vary slightly by operating system | Minor visual variation | Keep robust fallback stacks and verify layout on major platforms |
| Large English homepage | More HTML | Content is text-heavy and compressible; keep tool first and avoid heavy media additions |
| Service worker/PWA client | Client work | Verify registration timing and remove if offline value is not used |
| Remote extraction previews | Network variability | Reserve preview dimensions and lazy-load below result state |
| Third-party media/proxy latency | Download completion, not initial LCP | Track extraction and file-transfer timings separately from page CWV |

## Measurement plan

1. Run Lighthouse mobile on `/en`, a core tool page, and a guide with a production build.
2. Record JS transfer/execution and route chunks using Next’s analyzer if regressions appear.
3. Use Search Console/CrUX for 28-day field values; lab scores do not prove real-user CWV.
4. Add consented web-vitals reporting only if it has an operational owner.
5. Segment downloader API latency and success by provider independently of page rendering.

Google notes that excellent Core Web Vitals alone do not guarantee rankings and recommends an overall page experience. Source: [Google page experience](https://developers.google.com/search/docs/appearance/page-experience).
