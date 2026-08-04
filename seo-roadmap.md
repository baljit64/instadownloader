# IGDown SEO Roadmap

## Outcome

Build durable organic growth around the real public-link downloader, without unsupported claims, keyword-stuffed variants, or mass-published thin pages. Rankings cannot be guaranteed; the operating goal is improved eligibility, usefulness, discoverability, engagement, and conversion.

## Completed in this implementation

- Consolidated broad English intent on `/en`.
- Added comprehensive English homepage guidance and expanded visible FAQ coverage.
- Enriched canonical post, video, reel, photo, and carousel pages.
- Added canonical redirects for seven requested duplicate feature variants plus the story alias.
- Added noindex notices for unsupported Story and profile-picture workflows.
- Added About, Contact, Privacy, Terms, DMCA, and Cookie pages.
- Corrected root and page-level JSON-LD responsibilities.
- Added image and localized alternate entries to the sitemap.
- Gated optional Google Analytics behind consent.
- Upgraded Next.js, React, Axios, and Vitest; `npm audit` reports zero vulnerabilities.

## Days 0–30: release and establish evidence

1. Deploy and submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Inspect `/en` plus the five canonical tool pages; request indexing only after production validation.
3. Validate structured data and capture results in the release ticket.
4. Establish a dashboard for impressions, clicks, CTR, position, indexed URLs, canonical mismatches, LCP, INP, CLS, downloader submit success, and download completion.
5. Do not publish new blog articles until the canonical pages have two to four weeks of query data.
6. Fix any 4xx/5xx, soft-404, mobile usability, or canonical mismatch before content expansion.

## Days 31–60: improve from real queries

1. Cluster Search Console queries into broad, post, video, reel, photo, carousel, quality, device, privacy, and troubleshooting intent.
2. Rewrite titles/descriptions only where impressions are meaningful and CTR underperforms a comparable page.
3. Add first-party examples to pages with impressions but weak engagement: sanitized failure modes, tested browser steps, supported URL examples, and screenshots created from owned UI.
4. Publish at most two high-confidence articles per week from the plan, each with a distinct answer and clear owner/reviewer.
5. Add links from new articles to one primary tool and one supporting guide; add a reciprocal contextual link only when helpful.

## Days 61–90: authority and pruning

1. Compare pages within each cluster for query overlap. Merge or redirect pages with the same dominant intent.
2. Refresh pages only when functionality, screenshots, evidence, or guidance changed; do not change dates cosmetically.
3. Earn relevant links through useful assets: public-link troubleshooting checklist, browser download matrix, and transparent capability documentation.
4. Review extraction success by route and device. SEO pages that attract unsupported or failing intent should be corrected, noindexed, or pruned.
5. Decide whether a real `/blog` index and article system are justified by the first published batch.

## 3–12 months

- Expand translations only with reviewed, complete, equivalent content.
- Add Story/profile features and indexable pages only if the product can support them reliably without credential collection or access-control bypass.
- Split sitemaps when the canonical indexable inventory approaches operational limits, not before.
- Create an editorial change log and named review responsibility.
- Run quarterly content decay, internal-link, schema, accessibility, dependency, and field-performance reviews.

## Release gates

- TypeScript, ESLint, tests, production build, and browser smoke checks pass.
- `npm audit` has no unresolved production vulnerability.
- Every indexable route returns 200, a unique title/description/H1, self-canonical, and intended robots directive.
- Redirect aliases return one-hop 308 responses.
- Noindex capability notices are absent from sitemap.
- Claims match `isValidInstagramPostUrl` and live extractor behavior.

