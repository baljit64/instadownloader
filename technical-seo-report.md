# Technical SEO Report

## Architecture

IGDown uses Next.js App Router server components for public pages. `/` redirects by `Accept-Language` to one of `/en`, `/hi`, `/es`, or `/fr`. The root layout reads locale request headers so public pages are server-rendered on demand with the correct document language and direction; their route source and content registries remain deterministic. Interactive downloader code is isolated in a client component.

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

- 30 localized home URLs with reciprocal hreflang alternates and x-default;
- all active canonical tool/guide pages;
- six trust pages;
- image locations for the OG image and homepage content images;
- meaningful `lastModified` dates tied to the review/update data.

Redirected, noindex, API, stats, and offline URLs are excluded. `/robots.txt` allows public pages, disallows APIs/internal utility routes, advertises the sitemap, and declares the canonical host.

Google recommends including only URLs intended for search and notes that sitemaps can carry image and alternate-language information. Source: [Google sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [build a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Internationalization

The localized homepage set now covers 30 languages plus `x-default` to `/en`. URL slugs and language tags are governed separately where needed: Czech uses `cs`, Norwegian Bokmål uses `nb`, and Chinese alternates emit `zh-CN` and `zh-TW`. Arabic, Hebrew, and Persian render RTL. English-only feature, guide, and legal pages do not emit invented language alternates. Primary UI and metadata are localized; supporting copy should continue through native-speaker editorial review.

## Crawlability and rendering

Primary content and internal links render on the server. The downloader form requires JavaScript, which is acceptable because indexing does not depend on form execution. Link components use real anchor elements. Canonical URLs are emitted by Next metadata in the document head.

## Deployment requirements

- Set `NEXT_PUBLIC_SITE_URL=https://igdown.pro` in production; preview hosts must not be indexed as canonical production.
- Keep the `www` → apex redirect and HTTPS redirect at the platform layer.
- Confirm `X-Robots-Tag` is not injected by hosting on public pages.
- Configure Google/Bing verification environment variables as documented in the root layout.
- Verify URL response headers after every proxy/redirect change.

## Security response headers

Next config now applies `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` restrictions for unused device capabilities, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `Cross-Origin-Opener-Policy: same-origin-allow-popups`. Vercel supplies HSTS in production. A strict Content Security Policy remains a separately tested task because extraction previews, optional analytics, and service-worker behavior must be inventoried before enforcement.
