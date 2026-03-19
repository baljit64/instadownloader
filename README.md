This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Webshare Stats

Set `WEBSHARE_API_KEY` in your local or deployed server environment to enable the
internal proxy usage page at `/{locale}/proxy-stats` such as `/en/proxy-stats`.

Optional:

- `WEBSHARE_PLAN_ID` limits the query to one Webshare plan when your account has more
  than one.
- `WEB_SHARE_PROXY_POOL` supplies a comma- or newline-separated proxy pool for
  rotation. Entries can be `host`, `host:port`, `user:pass@host:port`, or a full
  URL (the app will add `WEB_SHARE_PROXY_PORT` or `WEB_SHARE_PROXY_USERNAME` and
  `WEB_SHARE_PROXY_PASSWORD` when missing).
- `WEB_SHARE_PROXY_ROTATE_EVERY` controls how many inbound requests share one proxy
  before rotating (default: 1).
- `WEB_SHARE_PROXY_COOLDOWN_MS` temporarily removes a proxy from rotation after
  repeated failures (default: 60000).
- `WEB_SHARE_PROXY_FAILURE_THRESHOLD` sets how many consecutive failures trigger
  a cooldown (default: 2).
- `WEB_SHARE_PROXY_HOST`, `WEB_SHARE_PROXY_PORT`, `WEB_SHARE_PROXY_USERNAME`, and
  `WEB_SHARE_PROXY_PASSWORD` keep the Instagram downloader routed through Webshare
  when no pool is configured.

## Rate Limiting & Cache

- `RATE_LIMIT_ENABLED` toggles in-memory rate limiting (default: true).
- `RATE_LIMIT_MAX` sets the max requests per IP per window (default: 120).
- `RATE_LIMIT_WINDOW_MS` sets the rate limit window in milliseconds (default: 60000).
- `RATE_LIMIT_MAX_KEYS` caps the in-memory limiter key count (default: 10000).
- `INSTAGRAM_CACHE_TTL_SECONDS` sets the Instagram extraction cache TTL (default: 600).
- `INSTAGRAM_CACHE_MAX_ENTRIES` limits Instagram cache entries (default: 500).
- `MEDIA_CACHE_TTL_SECONDS` sets the non-Instagram extraction cache TTL (default: 300).
- `MEDIA_CACHE_MAX_ENTRIES` limits non-Instagram cache entries (default: 500).

## Proxy Stats Access

- `PROXY_STATS_ACCESS_TOKEN` restricts access to `/{locale}/proxy-stats`. Supply the
  token via `?token=...`, `x-proxy-stats-token`, or `proxy_stats_token` cookie.
