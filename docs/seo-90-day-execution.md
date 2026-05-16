# 90-Day SEO Execution Playbook

This project uses `/en` as the primary broad-intent ranking URL for English traffic.

## 1) Architecture defaults

- Primary ranking URL: `/en`
- Pruned broad URLs redirected permanently to `/en`:
  - `/instagram-downloader`
  - `/insta-downloader`
- Keep distinct intent pages only:
  - video
  - reel
  - post
  - photo
  - carousel
  - troubleshooting
  - public-vs-private guidance

## 2) Content production cadence (6 pages/month)

### Month 1
- `download-instagram-post-by-link`
- `download-instagram-reel-by-link`
- `instagram-downloader-no-login`
- `instagram-downloader-without-app`
- `download-instagram-photo-hd`
- `instagram-download-safety-guide`

### Month 2
- `download-instagram-video-original-quality`
- `instagram-carousel-download-guide`
- `instagram-downloader-for-iphone`
- `instagram-downloader-for-android`
- `instagram-downloader-for-pc`
- `instagram-link-copy-troubleshooting`

### Month 3
- `instagram-reel-download-not-working-fixes`
- `instagram-post-download-not-working-fixes`
- `instagram-public-link-checker-guide`
- `instagram-downloader-best-practices`
- `instagram-download-copyright-faq`
- `instagram-downloader-alternatives-comparison`

## 3) Weekly operating loop

1. Pull GSC query and page reports.
2. Cluster by intent group (broad, reel, post, photo, troubleshooting, device).
3. Update underperforming titles/H1/intro copy in 2-week cycles.
4. Run pruning review for overlap/cannibalization.
5. Publish and index-request updated pages.

## 4) Acceptance checks before publish

- SEO guardrail CI passes.
- No pruned URL appears in sitemap.
- No redirect chains on priority landing URLs.
- Canonical target is correct for every page.
- Claims match real product behavior (public links only).
