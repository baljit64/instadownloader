# IGDown SEO Audit

Audit date: 2026-08-05  
Scope: all public App Router pages, metadata routes, public assets, shared components, and SEO configuration in this repository.

## Executive summary

IGDown already had a sound Next.js foundation: server-rendered pages, localized home routes, metadata helpers, self-referencing canonicals, robots and sitemap metadata routes, generated social images, and tests governing SEO landing pages. The largest risks were content quality and accuracy rather than basic crawlability. The English homepage was too brief for the requested user guide, core landing pages shared a thin template, unsupported Story/profile capabilities appeared in keyword coverage, trust/legal pages were absent, analytics could load before consent, and structured data described the English homepage from every route.

The implementation now keeps `/en` as the broad English canonical, enriches the homepage and five core media pages, consolidates duplicate aliases with 308 redirects, publishes trust/legal content, noindexes transparent unsupported-capability notices, includes image and language data in the sitemap, corrects page-specific schemas, and gates Google Analytics behind consent.

Google explicitly says it has no preferred word count and recommends people-first content rather than pages created mainly for search traffic. The requested 2,500–3,500-word homepage target is therefore treated as a content brief, not a ranking formula. Sources: [helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Findings

| Issue | Severity | Why it matters | Recommended fix | Expected SEO impact | Status |
|---|---|---|---|---|---|
| Homepage lacked comprehensive decision-help content | High | Users had little guidance on formats, devices, privacy, rights, or failures | Keep the downloader first; add accurate long-form guidance, support matrix, limitations, and 10 visible FAQs | Better intent satisfaction and long-tail relevance | Implemented |
| Core media landing pages were thin and highly templated | High | Repetitive pages can look scaled or doorway-like and provide little incremental value | Add format-specific capabilities, quality, device, troubleshooting, and rights sections to post, video, reel, photo, and carousel pages | Higher usefulness and clearer intent separation | Implemented |
| Unsupported Story/profile terms were advertised | High | Misleading claims harm trust and violate structured-data/content accuracy principles | Remove unsupported keywords/features; provide noindex capability notices and do not add them to the sitemap | Fewer poor-intent landings; stronger trust | Implemented |
| Duplicate requested slug variants could fragment signals | High | Several aliases target the same user need | 308 redirect aliases such as `/reels-downloader` and `/download-instagram-reels` to one canonical page | Consolidated links and reduced cannibalization | Implemented |
| About, Contact, Privacy, Terms, DMCA, and Cookie pages absent | High | Missing ownership, policy, and contact context weakens trust | Publish unique, internally linked trust pages with metadata and WebPage schemas | Better transparency and user confidence | Implemented |
| Root JSON-LD emitted a `/en` WebPage and app entity on every route | High | Schema did not represent the page users were viewing | Keep sitewide Organization/WebSite at root; emit WebPage, Article, WebApplication, FAQ, and Breadcrumb entities at relevant pages | More accurate entity understanding and fewer validation ambiguities | Implemented |
| Google Analytics loaded without an explicit choice | High | Optional tracking should align with disclosed privacy choices | Load GA only after consent and store/reset the preference locally | Trust/compliance improvement; small initial network reduction | Implemented |
| Sitemap omitted trust pages, images, and language relationships | Medium | Important pages and media/language signals were less explicit | Include trust routes, image locations, and localized alternates; exclude redirects/noindex pages | More complete discovery and cleaner sitemap governance | Implemented |
| English broad intent split across legacy pages | Medium | `/instagram-downloader`, `/insta-downloader`, and `/en` overlapped | Preserve permanent redirects to `/en`; do not list legacy paths in sitemap or internal links | Stronger canonical cluster | Already implemented and retained |
| FAQ rich-result expectations could be overstated | Medium | Valid FAQ markup does not guarantee a rich result | Keep schema limited to visible FAQs; do not promise SERP treatment | Prevents misleading reporting | Implemented/documented |
| SearchAction requested without a site-search feature | Medium | Marking the downloader as site search would be inaccurate | Omit SearchAction until a real internal search experience exists | Schema accuracy over checkbox coverage | Intentionally omitted |
| No separate XML file named `image-sitemap.xml` | Low | Google accepts image extensions within a regular sitemap | Use image entries in `/sitemap.xml`; split only if volume later warrants it | Equivalent discovery at current scale | Implemented in main sitemap |
| Localized pages exist only for en/hi/es/fr, not all proposed languages | Medium | hreflang must point only to real, equivalent translations | Retain four valid alternates plus x-default; add languages only after human-quality translation | Avoids invalid or low-quality localized pages | Correct by design |
| Some old unused PDF-branded shared components remain in source | Low | They increase maintenance confusion but are not routed or shipped by the edited pages | Confirm no imports, then remove in a separate cleanup change | Maintainability improvement, little direct SEO effect | Backlog |
| Field Core Web Vitals are not available in repository-only audit | Medium | Lab/build checks cannot prove 75th-percentile real-user results | Monitor Search Console/CrUX after release and segment mobile/desktop | Enables evidence-based performance work | Post-deploy |
| Search Console/index coverage and backlinks were unavailable | Medium | Repository review cannot confirm indexing, queries, manual actions, or authority | Verify ownership, submit sitemap, inspect priority URLs, and review weekly | Required for outcome measurement | Post-deploy |

## Page and HTML review

- One visible H1 is used on home, SEO, trust, error, and capability pages reviewed.
- Heading hierarchy is H1 → H2 → H3 in the new guide and detail sections.
- Downloader results are client-interactive, but primary explanatory content, internal links, schemas, and metadata are server rendered.
- Supported content images use `next/image`, fixed intrinsic dimensions or `fill` plus `sizes`, and descriptive alt text.
- The remaining raw `<img>` is a dynamic remote result preview where Next image optimization is not appropriate; it includes alt text and fixed container styling.
- URL routes are lowercase and hyphenated. Duplicate aliases use permanent redirects.
- API, internal stats, and offline utility routes are excluded through robots rules and/or noindex metadata.

## Crawl and index model

Google describes redirects and canonical annotations as strong canonicalization signals and sitemap inclusion as a weaker supporting signal. IGDown stacks these consistently: aliases redirect, canonical pages self-canonicalize, and only canonical indexable pages enter the sitemap. Source: [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Noindex notices remain crawlable (`follow`) so users and crawlers can discover supported alternatives. Robots.txt is not used as a canonicalization tool.

## Remaining external validation

1. Deploy with `NEXT_PUBLIC_SITE_URL=https://igdown.pro` and verify generated absolute URLs.
2. Run Google Rich Results Test on `/en`, one tool page, one guide, `/about`, and `/contact`.
3. Validate `/sitemap.xml` and `/robots.txt` from production.
4. Use Search Console URL Inspection to compare declared and Google-selected canonicals.
5. Record CrUX/Search Console Core Web Vitals at the 75th percentile after enough field traffic exists.
6. Crawl production with a crawler that executes JavaScript and compare status, canonical, title, description, H1, indexability, and inlinks.

