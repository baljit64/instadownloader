# Technical SEO Report

## Architecture

IGDown uses Next.js App Router server components for public pages. `/` redirects by `Accept-Language` to one of `/en`, `/hi`, `/es`, or `/fr`; static locale parameters pre-render those four routes. English feature and guide routes are static files backed by a typed content registry. Interactive downloader code is isolated in a client component.

## Metadata

- Root metadata supplies a base, site defaults, icons, manifest, robots defaults, verification tokens, Open Graph, and Twitter defaults.
- Localized home metadata supplies unique translated title/description, self-canonical, full language alternates, locale-specific Open Graph locale, and Twitter data.
- Active SEO pages use unique guarded title/description values, self-canonicals, robots directives, Open Graph, and Twitter cards.
- Trust and unsupported-capability pages have route-specific metadata. Unsupported pages are `noindex,follow`.
- Stats/offline/API utility routes are not intended landing pages.

## Canonical and redirect map

| Source | Destination | Reason |
|---|---|---|
| `/instagram-downloader` | `/en` | Consolidate broad English intent |
| `/insta-downloader` | `/en` | Consolidate shorthand broad intent |
| `/reels-downloader`, `/download-instagram-reels` | `/instagram-reel-downloader` | One reel canonical |
| `/photo-downloader` | `/instagram-photo-downloader` | One photo canonical |
| `/carousel-downloader` | `/instagram-carousel-downloader` | One carousel canonical |
| `/download-instagram-posts` | `/instagram-post-downloader` | One post canonical |
| `/download-instagram-videos`, `/instagram-to-mp4` | `/instagram-video-downloader` | One video canonical |
| `/download-instagram-stories` | `/story-downloader` | One transparent unsupported notice |

Redirects are 308 and resolve in one hop. Canonical destinations are the only versions linked internally and included in the sitemap.

## Sitemap and robots

`/sitemap.xml` contains:

- four localized home URLs with hreflang alternates and x-default;
- all active canonical tool/guide pages;
- six trust pages;
- image locations for the OG image and homepage content images;
- meaningful `lastModified` dates tied to the review/update data.

Redirected, noindex, API, stats, and offline URLs are excluded. `/robots.txt` allows public pages, disallows APIs/internal utility routes, advertises the sitemap, and declares the canonical host.

Google recommends including only URLs intended for search and notes that sitemaps can carry image and alternate-language information. Source: [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Internationalization

Only real translations receive hreflang: `en`, `hi`, `es`, `fr`, plus `x-default` to `/en`. English-only feature, guide, and legal pages do not emit invented language alternates. Adding `de`, `it`, `pt`, `ar`, or `id` requires complete, reviewed equivalents first.

## Crawlability and rendering

Primary content and internal links render on the server. The downloader form requires JavaScript, which is acceptable because indexing does not depend on form execution. Link components use real anchor elements. Canonical URLs are emitted by Next metadata in the document head.

## Deployment requirements

- Set `NEXT_PUBLIC_SITE_URL=https://igdown.pro` in production; preview hosts must not be indexed as canonical production.
- Keep the `www` → apex redirect and HTTPS redirect at the platform layer.
- Confirm `X-Robots-Tag` is not injected by hosting on public pages.
- Configure Google/Bing verification environment variables as documented in the root layout.
- Verify URL response headers after every proxy/redirect change.

