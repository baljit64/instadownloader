# Internal Linking Plan

## Goals

- Keep `/en` the strongest broad-intent hub.
- Make every indexable page reachable through crawlable navigation.
- Route users to the most specific working tool and relevant help.
- Avoid linking to redirected aliases, noindex notices as feature claims, internal stats, or API routes.

## Implemented structure

```text
/en
├── canonical tool pages
│   ├── /instagram-post-downloader
│   ├── /instagram-video-downloader
│   ├── /instagram-reel-downloader
│   ├── /instagram-photo-downloader
│   └── /instagram-carousel-downloader
├── intent guides and troubleshooting
└── trust
    ├── /about
    ├── /contact
    ├── /privacy-policy
    ├── /terms-of-service
    ├── /dmca-policy
    └── /cookie-policy
```

The homepage links all active SEO pages through the resource hub, highlights seven priority pages, and links trust routes in the footer. SEO and trust pages share global header/footer links. Each SEO page links `/en`, four governed related pages, and its breadcrumb path.

## Anchor rules

- Use concise descriptive anchors: “Instagram reel downloader,” “reel troubleshooting guide,” or “Privacy policy.”
- Do not repeat exact-match anchors unnaturally in every paragraph.
- Link to canonical URLs only.
- Do not use “click here” where a descriptive noun phrase is available.
- Keep footer links stable; use in-content links for contextual relationships.

## Cluster linking requirements

| Page type | Must link to | Recommended reciprocal link |
|---|---|---|
| Tool page | `/en`, one troubleshooting guide, one adjacent media type, trust footer | From homepage and relevant guides |
| Troubleshooting guide | Exact tool page, safety guide, `/contact` | From related tool page |
| Device guide | `/en`, relevant media tool, troubleshooting | From homepage device section when useful |
| Rights/safety page | `/terms-of-service`, `/privacy-policy`, `/dmca-policy`, supported tools | From footer and copyright references |
| Blog article | One primary tool, one support article, one trust page where relevant | From cluster hub after article earns value |

## Monthly orphan/cannibalization check

Export all indexable URLs and inlinks. Flag pages with zero internal inlinks, links pointing through redirects, more than one page receiving the same dominant query cluster, and pages whose related links do not match intent. Resolve with contextual links, merge/redirect, or noindex—not indiscriminate footer expansion.

