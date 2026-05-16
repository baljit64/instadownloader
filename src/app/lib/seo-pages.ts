import type { Metadata } from 'next';
import {
  absoluteUrl,
  getOpenGraphImages,
  getTwitterImages,
  siteName,
} from './site';

export interface SeoFaq {
  answer: string;
  question: string;
}

export interface SeoStep {
  description: string;
  title: string;
}

export type SeoPageStatus = 'active' | 'pruned';

export interface SeoPageConfig {
  canonicalTarget: string;
  description: string;
  faqs: SeoFaq[];
  heroDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  highlights: string[];
  intentCluster: string;
  keywords: string[];
  lastReviewedAt: string;
  metadataDescription: string;
  metadataTitle: string;
  primaryKeyword: string;
  relatedSlugs: string[];
  shortTitle: string;
  slug: string;
  status: SeoPageStatus;
  steps: SeoStep[];
  type: 'guide' | 'tool';
}

const DEFAULT_REVIEW_DATE = '2026-05-16';

function createSeoPage(
  page: Omit<SeoPageConfig, 'canonicalTarget' | 'lastReviewedAt' | 'status'> & {
    canonicalTarget?: string;
    lastReviewedAt?: string;
    status?: SeoPageStatus;
  }
): SeoPageConfig {
  return {
    status: page.status ?? 'active',
    canonicalTarget: page.canonicalTarget ?? `/${page.slug}`,
    lastReviewedAt: page.lastReviewedAt ?? DEFAULT_REVIEW_DATE,
    ...page,
  };
}

export const seoPages: SeoPageConfig[] = [
  createSeoPage({
    slug: 'instagram-downloader',
    status: 'pruned',
    canonicalTarget: '/en',
    type: 'tool',
    shortTitle: 'Instagram Downloader',
    primaryKeyword: 'instagram downloader',
    intentCluster: 'core-commercial',
    metadataTitle: 'Instagram Downloader by Link | IGDown',
    metadataDescription:
      'This legacy broad page is pruned and now permanently redirects to the main /en downloader hub for instagram downloader and ig downloader intent.',
    heroEyebrow: 'Legacy page',
    heroTitle: 'Instagram Downloader page moved to the main /en hub',
    heroDescription:
      'This URL is retired to reduce overlap and keyword cannibalization. Use the primary /en page for broad downloader searches.',
    description:
      'We keep this entry as a governed redirect target so search engines and users consistently land on one canonical broad-intent page.',
    keywords: ['instagram downloader', 'insta downloader', 'ig downloader'],
    highlights: [
      'Permanently redirected to /en.',
      'Removed from sitemap and internal featured blocks.',
      'Retained only to prevent duplicate broad-intent pages.',
    ],
    steps: [
      {
        title: 'Use the /en downloader page',
        description: 'The primary ranking and conversion page is now /en.',
      },
      {
        title: 'Use distinct intent pages when needed',
        description: 'Photo, reel, post, and troubleshooting pages stay separate.',
      },
      {
        title: 'Avoid duplicate broad pages',
        description: 'A single broad hub helps consolidate ranking signals.',
      },
    ],
    faqs: [
      {
        question: 'Why was this broad page pruned?',
        answer:
          'To avoid overlap with other broad downloader pages and consolidate ranking signals on /en.',
      },
      {
        question: 'Does this URL still work?',
        answer: 'Yes, but it now permanently redirects to /en.',
      },
      {
        question: 'Where should broad downloader keywords point?',
        answer: 'They should point to /en as the primary commercial hub.',
      },
    ],
    relatedSlugs: ['instagram-post-downloader', 'instagram-reel-downloader'],
  }),
  createSeoPage({
    slug: 'insta-downloader',
    status: 'pruned',
    canonicalTarget: '/en',
    type: 'tool',
    shortTitle: 'Insta Downloader',
    primaryKeyword: 'insta downloader',
    intentCluster: 'core-commercial',
    metadataTitle: 'Insta Downloader by Link | IGDown',
    metadataDescription:
      'This shorthand broad page is pruned and permanently redirects to /en so insta downloader and instadownloader intent resolves to one canonical hub.',
    heroEyebrow: 'Legacy page',
    heroTitle: 'Insta Downloader page moved to the primary /en page',
    heroDescription:
      'This URL is intentionally retired to avoid broad-term duplication. The main /en page now handles the core intent.',
    description:
      'Pruning overlapping shorthand pages helps maintain cleaner information architecture and reduces doorway-style duplication risk.',
    keywords: ['insta downloader', 'instadownloader', 'igdown'],
    highlights: [
      'Permanently redirected to /en.',
      'No longer included in sitemap or internal SEO tiles.',
      'Used only as a managed legacy redirect.',
    ],
    steps: [
      {
        title: 'Search broad terms on /en',
        description: 'Core commercial intent now resolves on one page.',
      },
      {
        title: 'Use specific pages for media-type intent',
        description: 'Reel, post, photo, and carousel pages remain active.',
      },
      {
        title: 'Keep redirects stable long-term',
        description: 'Stable 308 redirects preserve user and crawler clarity.',
      },
    ],
    faqs: [
      {
        question: 'Is insta downloader still supported?',
        answer: 'Yes, through the /en downloader hub.',
      },
      {
        question: 'Why not keep both broad pages active?',
        answer:
          'Multiple near-duplicate broad pages can split relevance and weaken overall ranking performance.',
      },
      {
        question: 'Will old links break?',
        answer: 'No, they permanently redirect to /en.',
      },
    ],
    relatedSlugs: ['instagram-video-downloader', 'instagram-photo-downloader'],
  }),
  createSeoPage({
    slug: 'instagram-video-downloader',
    type: 'tool',
    shortTitle: 'Instagram Video Downloader',
    primaryKeyword: 'instagram video downloader',
    intentCluster: 'video-download',
    metadataTitle: 'Instagram Video Downloader for Public Links',
    metadataDescription:
      'Download public Instagram videos by link with a clear preview-first flow. Supports reels and feed videos without login for public URLs.',
    heroEyebrow: 'Video tool',
    heroTitle: 'Instagram video download for public reel and feed links',
    heroDescription:
      'Use this page when your intent is video-specific. It explains copy-link, preview, and download steps for public Instagram video URLs.',
    description:
      'A focused video page helps users and search engines separate video intent from photo, carousel, and broad downloader searches.',
    keywords: [
      'instagram video downloader',
      'download instagram video',
      'save instagram video',
      'instagram reel video downloader',
    ],
    highlights: [
      'Targets video-only Instagram intent.',
      'Covers both reels and feed videos.',
      'Keeps public-link capability claims accurate.',
    ],
    steps: [
      {
        title: 'Copy a public video URL',
        description: 'Use the post or reel share menu to copy the full link.',
      },
      {
        title: 'Paste into the downloader form',
        description: 'Submit the URL and wait for the preview card.',
      },
      {
        title: 'Download the resolved video',
        description: 'Save the file from the preview result card.',
      },
    ],
    faqs: [
      {
        question: 'Does this support private videos?',
        answer: 'No. This flow supports public Instagram links only.',
      },
      {
        question: 'Is this different from reel download?',
        answer: 'It includes reel intent, but focuses on all Instagram video cases.',
      },
      {
        question: 'Do I need an app install?',
        answer: 'No. The downloader works from the browser for public links.',
      },
    ],
    relatedSlugs: [
      'download-instagram-video-original-quality',
      'instagram-reel-downloader',
      'instagram-download-not-working',
      'instagram-link-copy-troubleshooting',
    ],
  }),
  createSeoPage({
    slug: 'instagram-post-downloader',
    type: 'tool',
    shortTitle: 'Instagram Post Downloader',
    primaryKeyword: 'instagram post downloader',
    intentCluster: 'post-download',
    metadataTitle: 'Instagram Post Downloader for Public Links',
    metadataDescription:
      'Download public Instagram post links with a clean copy-paste-preview flow. Built for feed post intent and public URL troubleshooting.',
    heroEyebrow: 'Post tool',
    heroTitle: 'Instagram post download for public feed links',
    heroDescription:
      'Use this page when you need standard feed post downloads from public links and want clear steps for reliable extraction.',
    description:
      'A post-specific page matches feed-post intent and reduces confusion with reel, video, and carousel-specific behavior.',
    keywords: [
      'instagram post downloader',
      'download instagram post',
      'download instagram post link',
      'insta post download',
    ],
    highlights: [
      'Focused on feed post intent.',
      'Works with public post URLs.',
      'Clarifies multi-item behavior for carousel posts.',
    ],
    steps: [
      {
        title: 'Copy the public post URL',
        description: 'Use Instagram share options and copy the full link.',
      },
      {
        title: 'Paste the URL',
        description: 'Submit the post URL in the downloader input field.',
      },
      {
        title: 'Preview and download',
        description: 'Use the result card to save the resolved media.',
      },
    ],
    faqs: [
      {
        question: 'Can one post return multiple files?',
        answer: 'Yes. Carousel posts can return multiple downloadable assets.',
      },
      {
        question: 'Can this download private posts?',
        answer: 'No. Private or restricted posts are outside supported scope.',
      },
      {
        question: 'Is this page optimized for post intent?',
        answer: 'Yes. It targets post-specific queries and usage patterns.',
      },
    ],
    relatedSlugs: [
      'download-instagram-post-by-link',
      'how-to-download-instagram-post',
      'instagram-carousel-downloader',
      'instagram-post-download-not-working-fixes',
    ],
  }),
  createSeoPage({
    slug: 'instagram-reel-downloader',
    type: 'tool',
    shortTitle: 'Instagram Reel Downloader',
    primaryKeyword: 'instagram reel downloader',
    intentCluster: 'reel-download',
    metadataTitle: 'Instagram Reel Downloader for Public Links',
    metadataDescription:
      'Download Instagram reels from public links in a browser-based flow. Paste a reel URL, preview the media, and save with direct download.',
    heroEyebrow: 'Reel tool',
    heroTitle: 'Instagram reel download by public URL',
    heroDescription:
      'This reel-focused page serves users searching for fast reel downloads with clear guidance on public-link requirements.',
    description:
      'Reel intent is distinct from feed-post intent, so a dedicated page improves relevance and user clarity.',
    keywords: [
      'instagram reel downloader',
      'download instagram reel',
      'download instagram reel link',
      'save instagram reel',
    ],
    highlights: [
      'Purpose-built for reel search intent.',
      'Works with public reel links.',
      'Includes troubleshooting paths for failed reel extraction.',
    ],
    steps: [
      {
        title: 'Copy the reel link',
        description: 'Grab the full public reel URL from Instagram share.',
      },
      {
        title: 'Paste and resolve',
        description: 'Submit the link and wait for preview generation.',
      },
      {
        title: 'Download the reel',
        description: 'Use the primary download action on the preview card.',
      },
    ],
    faqs: [
      {
        question: 'Why can a reel fail even when visible?',
        answer:
          'Upstream responses can be inconsistent. Link format and access checks still matter for extraction.',
      },
      {
        question: 'Is login required for reels?',
        answer: 'No. The downloader is for public links and does not require login.',
      },
      {
        question: 'Where should I troubleshoot failed reels?',
        answer: 'Use the reel troubleshooting and link copy guidance pages.',
      },
    ],
    relatedSlugs: [
      'download-instagram-reel-by-link',
      'instagram-reel-download-not-working-fixes',
      'instagram-link-copy-troubleshooting',
      'instagram-video-downloader',
    ],
  }),
  createSeoPage({
    slug: 'instagram-photo-downloader',
    type: 'tool',
    shortTitle: 'Instagram Photo Downloader',
    primaryKeyword: 'instagram photo downloader',
    intentCluster: 'photo-download',
    metadataTitle: 'Instagram Photo Downloader for Public Links',
    metadataDescription:
      'Download public Instagram photos by link with preview-first results. Best for single-image posts and image-first public Instagram URLs.',
    heroEyebrow: 'Photo tool',
    heroTitle: 'Instagram photo download for public image posts',
    heroDescription:
      'This page targets image-first download intent and helps users understand quality expectations for public Instagram photos.',
    description:
      'Photo-specific intent deserves dedicated content so users can find image guidance without navigating reel or video copy.',
    keywords: [
      'instagram photo downloader',
      'download instagram photo',
      'instagram image downloader',
      'instagram photo download',
    ],
    highlights: [
      'Focused on image-post use cases.',
      'Explains quality based on public source availability.',
      'Supports direct download from preview cards.',
    ],
    steps: [
      {
        title: 'Copy a public photo URL',
        description: 'Open the post and copy the full image-post URL.',
      },
      {
        title: 'Paste into the downloader',
        description: 'Submit the link and wait for image preview output.',
      },
      {
        title: 'Download the image',
        description: 'Save the resolved file from the result card.',
      },
    ],
    faqs: [
      {
        question: 'Can this keep original quality?',
        answer:
          'Output quality depends on the best public asset returned by the source at extraction time.',
      },
      {
        question: 'Do photo posts ever include multiple items?',
        answer: 'Yes. Some photo posts are carousel posts with multiple files.',
      },
      {
        question: 'Do I need a separate app for photos?',
        answer: 'No. Browser flow is enough for supported public links.',
      },
    ],
    relatedSlugs: [
      'download-instagram-photo-hd',
      'instagram-carousel-downloader',
      'download-instagram-post-by-link',
      'instagram-download-safety-guide',
    ],
  }),
  createSeoPage({
    slug: 'instagram-carousel-downloader',
    type: 'tool',
    shortTitle: 'Instagram Carousel Downloader',
    primaryKeyword: 'instagram carousel downloader',
    intentCluster: 'carousel-download',
    metadataTitle: 'Instagram Carousel Downloader for Public Links',
    metadataDescription:
      'Download public Instagram carousel posts and save multiple media items from one link. See how multi-slide previews and downloads work.',
    heroEyebrow: 'Carousel tool',
    heroTitle: 'Instagram carousel download for multi-slide posts',
    heroDescription:
      'This page is for users who need downloads from multi-item posts rather than single-image or reel links.',
    description:
      'Carousel behavior differs from single media posts, so this page explains multi-item extraction and download handling clearly.',
    keywords: [
      'instagram carousel downloader',
      'download instagram carousel',
      'instagram multi image downloader',
      'instagram slider downloader',
    ],
    highlights: [
      'Targets multi-item carousel intent.',
      'Explains why one link can return several files.',
      'Pairs with dedicated carousel guidance pages.',
    ],
    steps: [
      {
        title: 'Copy the carousel URL',
        description: 'Use the full public link for the multi-slide post.',
      },
      {
        title: 'Run extraction',
        description: 'Paste the link and let the tool resolve each media item.',
      },
      {
        title: 'Download selected slides',
        description: 'Save each resolved item from the preview grid.',
      },
    ],
    faqs: [
      {
        question: 'Can I download every slide in a carousel?',
        answer:
          'The extractor attempts all publicly available items in the post and returns what it can resolve.',
      },
      {
        question: 'Why separate carousel from photo pages?',
        answer: 'Carousel intent has different expectations and multi-file behavior.',
      },
      {
        question: 'Does this require account login?',
        answer: 'No. It is designed for public URLs only.',
      },
    ],
    relatedSlugs: [
      'instagram-carousel-download-guide',
      'instagram-photo-downloader',
      'instagram-post-downloader',
      'instagram-link-copy-troubleshooting',
    ],
  }),
  createSeoPage({
    slug: 'how-to-download-instagram-post',
    type: 'guide',
    shortTitle: 'How to Download Instagram Posts',
    primaryKeyword: 'how to download instagram post',
    intentCluster: 'how-to',
    metadataTitle: 'How to Download an Instagram Post by Link',
    metadataDescription:
      'Step-by-step guide to download a public Instagram post by link. Learn the correct copy, paste, preview, and save flow with common mistakes.',
    heroEyebrow: 'How-to guide',
    heroTitle: 'How to download an Instagram post by public link',
    heroDescription:
      'Follow this practical guide when you want clear instructions for post downloads instead of generic tool marketing copy.',
    description:
      'Instructional intent pages help capture how-to queries and support the core downloader with better user education.',
    keywords: [
      'how to download instagram post',
      'download instagram post guide',
      'save instagram post online',
      'copy instagram post url',
    ],
    highlights: [
      'Built for instructional search intent.',
      'Matches the real public-link product flow.',
      'Links to targeted troubleshooting paths.',
    ],
    steps: [
      {
        title: 'Find the public post',
        description: 'Open the post and confirm it is publicly viewable.',
      },
      {
        title: 'Copy the full URL',
        description: 'Use share options or browser address bar.',
      },
      {
        title: 'Paste and save',
        description: 'Submit the URL, preview, and download the media file.',
      },
    ],
    faqs: [
      {
        question: 'Can I paste a username instead of a post link?',
        answer: 'No. A full public post URL is required for extraction.',
      },
      {
        question: 'Does this guide also apply to reels?',
        answer: 'The flow is similar, but reels have dedicated pages and fixes.',
      },
      {
        question: 'What causes the most failures?',
        answer: 'Malformed links and non-public URLs are the most common causes.',
      },
    ],
    relatedSlugs: [
      'download-instagram-post-by-link',
      'instagram-post-downloader',
      'instagram-link-copy-troubleshooting',
      'instagram-post-download-not-working-fixes',
    ],
  }),
  createSeoPage({
    slug: 'instagram-download-not-working',
    type: 'guide',
    shortTitle: 'Instagram Download Not Working',
    primaryKeyword: 'instagram downloader not working',
    intentCluster: 'troubleshooting',
    metadataTitle: 'Instagram Downloader Not Working? Fix Guide',
    metadataDescription:
      'Troubleshoot failed Instagram downloads for public links. Learn common link, availability, and extraction issues and how to fix them quickly.',
    heroEyebrow: 'Troubleshooting guide',
    heroTitle: 'Instagram download not working? Start with these checks',
    heroDescription:
      'Use this guide when a public link fails so you can diagnose URL format, availability, and extraction issues in a structured way.',
    description:
      'Troubleshooting content captures high-intent recovery queries and helps users complete downloads after an initial failure.',
    keywords: [
      'instagram downloader not working',
      'instagram download not working',
      'instagram link failed',
      'instagram download fix',
    ],
    highlights: [
      'Built for failure-recovery intent.',
      'Separates link issues from upstream response issues.',
      'Connects users to targeted reel and post fix pages.',
    ],
    steps: [
      {
        title: 'Confirm link visibility',
        description: 'Make sure the post is public and link is complete.',
      },
      {
        title: 'Retry with exact URL',
        description: 'Avoid profile links, copied text, or shortened fragments.',
      },
      {
        title: 'Check intent-specific fixes',
        description: 'Use reel or post troubleshooting pages for deeper checks.',
      },
    ],
    faqs: [
      {
        question: 'Can private links be fixed with retries?',
        answer: 'No. Private links are outside the supported public-link workflow.',
      },
      {
        question: 'Why do some links fail intermittently?',
        answer:
          'Upstream endpoint behavior can vary, so repeated attempts may differ for certain links.',
      },
      {
        question: 'Where do I report persistent failures?',
        answer: 'Use support contact with the failing URL and error details.',
      },
    ],
    relatedSlugs: [
      'instagram-reel-download-not-working-fixes',
      'instagram-post-download-not-working-fixes',
      'instagram-link-copy-troubleshooting',
      'public-vs-private-instagram-links',
    ],
  }),
  createSeoPage({
    slug: 'public-vs-private-instagram-links',
    type: 'guide',
    shortTitle: 'Public vs Private Instagram Links',
    primaryKeyword: 'public vs private instagram links',
    intentCluster: 'public-vs-private',
    metadataTitle: 'Public vs Private Instagram Links Guide',
    metadataDescription:
      'Understand public versus private Instagram links for downloader tools. Learn what can be supported and how to avoid misleading expectations.',
    heroEyebrow: 'Capability guide',
    heroTitle: 'Public vs private Instagram links: what is supported',
    heroDescription:
      'Read this page to understand why public-link rules matter and why private access claims should stay out of user-facing SEO copy.',
    description:
      'Clear public-versus-private guidance improves trust and helps search engines map accurate product capabilities to intent.',
    keywords: [
      'public vs private instagram links',
      'public instagram downloader',
      'private instagram post download',
      'instagram public link',
    ],
    highlights: [
      'Defines the supported boundary clearly.',
      'Prevents overpromising in SEO copy.',
      'Links users to correct intent pages after validation.',
    ],
    steps: [
      {
        title: 'Check if the post is public',
        description: 'Private-account content is not part of this workflow.',
      },
      {
        title: 'Copy the exact media URL',
        description: 'Use a complete post or reel link, not a profile URL.',
      },
      {
        title: 'Continue on the matching page',
        description: 'Open reel, post, photo, or carousel pages as needed.',
      },
    ],
    faqs: [
      {
        question: 'Why does public/private language matter for SEO?',
        answer: 'Accurate capability claims reduce mismatch and improve user trust.',
      },
      {
        question: 'Can a private post be downloaded in this tool?',
        answer: 'No. The supported flow is for public URLs only.',
      },
      {
        question: 'Where should broad intent users start?',
        answer: 'Start at /en and follow intent-specific pages when needed.',
      },
    ],
    relatedSlugs: [
      'instagram-public-link-checker-guide',
      'instagram-download-not-working',
      'instagram-downloader-no-login',
      'instagram-link-copy-troubleshooting',
    ],
  }),
  createSeoPage({
    slug: 'download-instagram-post-by-link',
    type: 'guide',
    shortTitle: 'Download Instagram Post by Link',
    primaryKeyword: 'download instagram post by link',
    intentCluster: 'post-download',
    metadataTitle: 'Download Instagram Post by Link Guide',
    metadataDescription:
      'Download Instagram post media from a public link. This guide covers exact URL format, preview checks, and fast save steps from the downloader.',
    heroEyebrow: 'Post link guide',
    heroTitle: 'Download Instagram posts by link in a simple flow',
    heroDescription:
      'This page targets by-link post queries with practical steps and direct paths back to the main downloader form.',
    description:
      'By-link phrasing is a strong intent variant and deserves dedicated content to improve query-to-page match.',
    keywords: [
      'download instagram post by link',
      'instagram post link download',
      'save instagram post link',
      'download instagram post url',
    ],
    highlights: [
      'Matches by-link post search phrasing.',
      'Shows exact public URL usage.',
      'Connects directly to /en conversion flow.',
    ],
    steps: [
      {
        title: 'Copy public post link',
        description: 'Get the complete URL from Instagram share options.',
      },
      {
        title: 'Paste and validate',
        description: 'Submit the URL in the downloader to load preview.',
      },
      {
        title: 'Download post media',
        description: 'Save from the result card once media is resolved.',
      },
    ],
    faqs: [
      {
        question: 'Does this include carousel posts?',
        answer: 'Yes, when the public post contains multiple carousel items.',
      },
      {
        question: 'Can I use shortened links?',
        answer: 'Use full links whenever possible to reduce parsing failures.',
      },
      {
        question: 'Where do I start downloading now?',
        answer: 'Open /en and paste the public post URL into the form.',
      },
    ],
    relatedSlugs: [
      'instagram-post-downloader',
      'how-to-download-instagram-post',
      'instagram-link-copy-troubleshooting',
      'instagram-post-download-not-working-fixes',
    ],
  }),
  createSeoPage({
    slug: 'download-instagram-reel-by-link',
    type: 'guide',
    shortTitle: 'Download Instagram Reel by Link',
    primaryKeyword: 'download instagram reel by link',
    intentCluster: 'reel-download',
    metadataTitle: 'Download Instagram Reel by Link Guide',
    metadataDescription:
      'Download Instagram reels using a public link in a fast browser flow. Learn clean URL copy, preview validation, and direct download steps.',
    heroEyebrow: 'Reel link guide',
    heroTitle: 'Download Instagram reels by link with preview-first steps',
    heroDescription:
      'This guide targets by-link reel intent with focused troubleshooting and a clear route to the main downloader form.',
    description:
      'Reel by-link queries map to high action intent, so this page focuses on execution and failure prevention.',
    keywords: [
      'download instagram reel by link',
      'instagram reel link download',
      'save reel from instagram link',
      'reel downloader by url',
    ],
    highlights: [
      'Covers by-link reel queries directly.',
      'Explains public-link requirement in plain language.',
      'Links to reel-specific troubleshooting paths.',
    ],
    steps: [
      {
        title: 'Copy the public reel URL',
        description: 'Use the share option to copy the full reel link.',
      },
      {
        title: 'Paste into /en form',
        description: 'Submit the URL and wait for preview generation.',
      },
      {
        title: 'Download the reel file',
        description: 'Use the result card download action once available.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to sign in?',
        answer: 'No. Public-link reels can be processed without login.',
      },
      {
        question: 'Why does reel copy format matter?',
        answer: 'Incorrect or partial links commonly fail to resolve media.',
      },
      {
        question: 'Where are advanced reel fixes?',
        answer: 'Use the reel not-working and link troubleshooting guides.',
      },
    ],
    relatedSlugs: [
      'instagram-reel-downloader',
      'instagram-reel-download-not-working-fixes',
      'instagram-link-copy-troubleshooting',
      'instagram-video-downloader',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-no-login',
    type: 'guide',
    shortTitle: 'Instagram Downloader No Login',
    primaryKeyword: 'instagram downloader no login',
    intentCluster: 'no-login',
    metadataTitle: 'Instagram Downloader No Login Required',
    metadataDescription:
      'Use Instagram downloader flows for public links without account login. Learn what no-login support means and what private links cannot do.',
    heroEyebrow: 'No-login guide',
    heroTitle: 'Instagram downloader with no login for public URLs',
    heroDescription:
      'This page clarifies no-login expectations and keeps claims accurate by separating public-link support from private-content access.',
    description:
      'No-login intent is common in downloader queries and benefits from explicit capability boundaries and trust-focused copy.',
    keywords: [
      'instagram downloader no login',
      'insta downloader without login',
      'instagram download no sign in',
      'public instagram downloader',
    ],
    highlights: [
      'Explains no-login capability accurately.',
      'Prevents private-content confusion.',
      'Drives users to /en for direct action.',
    ],
    steps: [
      {
        title: 'Use a public media URL',
        description: 'No-login flow starts with a valid public post or reel link.',
      },
      {
        title: 'Paste into downloader',
        description: 'Submit the link on /en and load the preview result.',
      },
      {
        title: 'Download when resolved',
        description: 'Use the card action once media extraction is ready.',
      },
    ],
    faqs: [
      {
        question: 'Does no-login mean private posts are supported?',
        answer: 'No. No-login applies to public-link downloads only.',
      },
      {
        question: 'Why highlight no-login intent?',
        answer: 'It matches a frequent user requirement in search queries.',
      },
      {
        question: 'Can I use this on mobile browsers?',
        answer: 'Yes. The same public-link flow works on mobile and desktop.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader-without-app',
      'public-vs-private-instagram-links',
      'instagram-downloader-for-iphone',
      'instagram-downloader-for-android',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-without-app',
    type: 'guide',
    shortTitle: 'Instagram Downloader Without App',
    primaryKeyword: 'instagram downloader without app',
    intentCluster: 'without-app',
    metadataTitle: 'Instagram Downloader Without App Install',
    metadataDescription:
      'Download public Instagram links without installing an app. Use a browser-only flow with link paste, media preview, and direct file save.',
    heroEyebrow: 'Browser flow guide',
    heroTitle: 'Instagram downloader without app installation',
    heroDescription:
      'This page targets users who prefer browser-based downloads and want to avoid extension or app install steps.',
    description:
      'Without-app intent aligns with lightweight usage and helps attract high-conversion users seeking immediate browser tools.',
    keywords: [
      'instagram downloader without app',
      'download instagram without app',
      'instagram browser downloader',
      'insta downloader online',
    ],
    highlights: [
      'Built for browser-only usage intent.',
      'Keeps flow simple: paste, preview, download.',
      'Aligns with public-link support boundaries.',
    ],
    steps: [
      {
        title: 'Open /en in browser',
        description: 'No install is needed for public-link downloads.',
      },
      {
        title: 'Paste public link',
        description: 'Use a complete post or reel URL in the form.',
      },
      {
        title: 'Save from preview',
        description: 'Download directly from the returned media card.',
      },
    ],
    faqs: [
      {
        question: 'Is this better than an app for quick downloads?',
        answer: 'For many users, a browser flow is faster and easier to start.',
      },
      {
        question: 'Do I need to register an account?',
        answer: 'No. Public-link downloads do not require account registration.',
      },
      {
        question: 'Can this be used on PC and phone?',
        answer: 'Yes. The browser flow is cross-device for supported links.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader-no-login',
      'instagram-downloader-for-pc',
      'instagram-downloader-for-iphone',
      'instagram-downloader-for-android',
    ],
  }),
  createSeoPage({
    slug: 'download-instagram-photo-hd',
    type: 'guide',
    shortTitle: 'Download Instagram Photo HD',
    primaryKeyword: 'download instagram photo hd',
    intentCluster: 'photo-download',
    metadataTitle: 'Download Instagram Photo in HD by Link',
    metadataDescription:
      'Download Instagram photos in the best available quality from public links. Learn HD expectations, preview checks, and clean save steps.',
    heroEyebrow: 'Photo quality guide',
    heroTitle: 'Download Instagram photos in HD from public links',
    heroDescription:
      'This page targets HD photo intent and explains practical quality limits based on source availability from public Instagram media.',
    description:
      'Quality-oriented searchers convert better when expectations are clear and promises stay aligned with technically available outputs.',
    keywords: [
      'download instagram photo hd',
      'instagram photo hd downloader',
      'save instagram photo high quality',
      'instagram image quality download',
    ],
    highlights: [
      'Targets HD photo intent directly.',
      'Explains realistic quality outcomes.',
      'Links users to photo and carousel flows.',
    ],
    steps: [
      {
        title: 'Use a public image URL',
        description: 'Copy the complete post URL that contains the photo.',
      },
      {
        title: 'Run preview check',
        description: 'Paste URL and verify image resolves correctly.',
      },
      {
        title: 'Download best available file',
        description: 'Save the highest-quality media returned by the source.',
      },
    ],
    faqs: [
      {
        question: 'Does HD always mean original camera quality?',
        answer: 'No. Output depends on the best publicly exposed media version.',
      },
      {
        question: 'Can carousel slides keep quality too?',
        answer: 'Yes, each resolved slide can be downloaded individually.',
      },
      {
        question: 'Where do I start downloading now?',
        answer: 'Use /en and paste the public photo post URL.',
      },
    ],
    relatedSlugs: [
      'instagram-photo-downloader',
      'instagram-carousel-downloader',
      'instagram-download-safety-guide',
      'download-instagram-post-by-link',
    ],
  }),
  createSeoPage({
    slug: 'instagram-download-safety-guide',
    type: 'guide',
    shortTitle: 'Instagram Download Safety Guide',
    primaryKeyword: 'instagram download safety',
    intentCluster: 'safety',
    metadataTitle: 'Instagram Download Safety Guide',
    metadataDescription:
      'Instagram download safety guide for public-link workflows. Learn secure usage habits, phishing checks, and realistic capability boundaries.',
    heroEyebrow: 'Safety guide',
    heroTitle: 'Instagram download safety for public-link users',
    heroDescription:
      'Use this guide to avoid risky download patterns and understand safe behavior when saving media from public Instagram links.',
    description:
      'Safety-focused pages build user trust and can attract risk-aware traffic that still has downloader intent.',
    keywords: [
      'instagram download safety',
      'safe instagram downloader',
      'instagram link safety',
      'secure media downloader',
    ],
    highlights: [
      'Explains safe usage practices.',
      'Helps users detect suspicious links.',
      'Reinforces public-only capability boundaries.',
    ],
    steps: [
      {
        title: 'Verify link source',
        description: 'Use links copied from official Instagram share options.',
      },
      {
        title: 'Avoid unknown tools and scripts',
        description: 'Use trusted browser flow with clear behavior and support.',
      },
      {
        title: 'Check permissions and downloads',
        description: 'Review file type and source before opening saved files.',
      },
    ],
    faqs: [
      {
        question: 'Does safety guidance improve SEO trust signals?',
        answer: 'Yes. Helpful, accurate content supports quality perception.',
      },
      {
        question: 'Can safety pages promise private-content access?',
        answer: 'No. Safety guidance should remain accurate and non-misleading.',
      },
      {
        question: 'Should users still start at /en?',
        answer: 'Yes. /en remains the primary downloader action page.',
      },
    ],
    relatedSlugs: [
      'public-vs-private-instagram-links',
      'instagram-downloader-no-login',
      'instagram-download-copyright-faq',
      'instagram-downloader-best-practices',
    ],
  }),
  createSeoPage({
    slug: 'download-instagram-video-original-quality',
    type: 'guide',
    shortTitle: 'Download Instagram Video Original Quality',
    primaryKeyword: 'download instagram video original quality',
    intentCluster: 'quality',
    metadataTitle: 'Download Instagram Video in Original Quality',
    metadataDescription:
      'Learn how to download Instagram videos in the best available quality from public links. Includes preview checks and quality expectation tips.',
    heroEyebrow: 'Video quality guide',
    heroTitle: 'Download Instagram videos in best available quality',
    heroDescription:
      'This page targets original-quality video intent with practical guidance on public-source limits and cleaner extraction outcomes.',
    description:
      'Quality-driven video keywords need explicit guidance to reduce bounce from unrealistic expectations and mismatched promises.',
    keywords: [
      'download instagram video original quality',
      'instagram video quality download',
      'save instagram video hd',
      'instagram reel original quality',
    ],
    highlights: [
      'Addresses quality-first video intent.',
      'Explains best-available output boundaries.',
      'Links to reel and video-specific tools.',
    ],
    steps: [
      {
        title: 'Use full public video URL',
        description: 'Copy the exact reel or feed video link.',
      },
      {
        title: 'Check preview quality',
        description: 'Validate the loaded asset before downloading.',
      },
      {
        title: 'Save best available file',
        description: 'Download the highest-quality resolved media item.',
      },
    ],
    faqs: [
      {
        question: 'Is true original quality always available?',
        answer: 'Output depends on what public source endpoints expose.',
      },
      {
        question: 'Does this work for reels?',
        answer: 'Yes, public reels are included in video quality workflows.',
      },
      {
        question: 'Where should users start conversion flow?',
        answer: 'Use /en with a valid public video URL.',
      },
    ],
    relatedSlugs: [
      'instagram-video-downloader',
      'instagram-reel-downloader',
      'download-instagram-reel-by-link',
      'instagram-reel-download-not-working-fixes',
    ],
  }),
  createSeoPage({
    slug: 'instagram-carousel-download-guide',
    type: 'guide',
    shortTitle: 'Instagram Carousel Download Guide',
    primaryKeyword: 'instagram carousel download guide',
    intentCluster: 'carousel-download',
    metadataTitle: 'Instagram Carousel Download Guide',
    metadataDescription:
      'Step-by-step guide for downloading Instagram carousel posts from public links. Learn multi-slide extraction and per-item download behavior.',
    heroEyebrow: 'Carousel guide',
    heroTitle: 'Instagram carousel download steps for public links',
    heroDescription:
      'This guide supports users who need reliable carousel workflows and want clear expectations around multi-item extraction results.',
    description:
      'Carousel guides improve intent specificity and support one-to-many media workflows that differ from single-post pages.',
    keywords: [
      'instagram carousel download guide',
      'download carousel post instagram',
      'instagram multi image download',
      'instagram slide downloader',
    ],
    highlights: [
      'Focused on multi-item carousel behavior.',
      'Explains per-slide download actions.',
      'Supports troubleshooting for partial results.',
    ],
    steps: [
      {
        title: 'Copy carousel post URL',
        description: 'Use the exact public link for the target post.',
      },
      {
        title: 'Run media extraction',
        description: 'Paste the link and wait for all available items.',
      },
      {
        title: 'Download each needed item',
        description: 'Save files one by one from the preview grid.',
      },
    ],
    faqs: [
      {
        question: 'Why do some carousels return fewer items?',
        answer: 'Only publicly resolvable assets can be returned by extraction.',
      },
      {
        question: 'Is this separate from photo download intent?',
        answer: 'Yes. Carousel intent includes multi-item expectations.',
      },
      {
        question: 'Should I use full URL or short URL?',
        answer: 'Use full URLs for better parser reliability.',
      },
    ],
    relatedSlugs: [
      'instagram-carousel-downloader',
      'instagram-photo-downloader',
      'instagram-post-downloader',
      'instagram-link-copy-troubleshooting',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-for-iphone',
    type: 'guide',
    shortTitle: 'Instagram Downloader for iPhone',
    primaryKeyword: 'instagram downloader for iphone',
    intentCluster: 'device-iphone',
    metadataTitle: 'Instagram Downloader for iPhone',
    metadataDescription:
      'Use Instagram downloader on iPhone with a browser-first flow for public links. Copy URL, preview media, and download without extra apps.',
    heroEyebrow: 'iPhone guide',
    heroTitle: 'Instagram downloader workflow for iPhone users',
    heroDescription:
      'This page targets iPhone-specific intent and shows how to run the same public-link download flow smoothly on mobile Safari.',
    description:
      'Device-intent pages capture platform-specific queries while reusing the same core downloader capability and conversion path.',
    keywords: [
      'instagram downloader for iphone',
      'download instagram on iphone',
      'insta reel download iphone',
      'instagram link downloader ios',
    ],
    highlights: [
      'Targets iPhone-specific queries.',
      'Uses browser-only public-link flow.',
      'Links to no-login and without-app guidance.',
    ],
    steps: [
      {
        title: 'Copy public Instagram URL',
        description: 'Use Instagram app share options on iPhone.',
      },
      {
        title: 'Open /en in browser',
        description: 'Paste the link into the downloader form.',
      },
      {
        title: 'Download from preview',
        description: 'Save media when extraction completes.',
      },
    ],
    faqs: [
      {
        question: 'Does iPhone require a dedicated app?',
        answer: 'No. Browser flow works for supported public links.',
      },
      {
        question: 'Can I download both posts and reels?',
        answer: 'Yes, if the links are public and resolvable.',
      },
      {
        question: 'Where are iPhone troubleshooting tips?',
        answer: 'Use link-copy and not-working guide pages for diagnostics.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader-no-login',
      'instagram-downloader-without-app',
      'instagram-link-copy-troubleshooting',
      'instagram-download-not-working',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-for-android',
    type: 'guide',
    shortTitle: 'Instagram Downloader for Android',
    primaryKeyword: 'instagram downloader for android',
    intentCluster: 'device-android',
    metadataTitle: 'Instagram Downloader for Android',
    metadataDescription:
      'Use Instagram downloader on Android through a fast browser flow for public links. Paste URL, preview media, and save files in seconds.',
    heroEyebrow: 'Android guide',
    heroTitle: 'Instagram downloader workflow for Android users',
    heroDescription:
      'This page targets Android downloader queries with simple, app-free guidance for public-link downloads.',
    description:
      'Android intent pages capture device-specific searches and keep the same conversion endpoint centered on /en.',
    keywords: [
      'instagram downloader for android',
      'download instagram on android',
      'insta reel download android',
      'instagram link downloader android',
    ],
    highlights: [
      'Targets Android-specific search intent.',
      'Works with browser-based public-link flow.',
      'Supports post, reel, and photo use cases.',
    ],
    steps: [
      {
        title: 'Copy media URL in Instagram app',
        description: 'Grab the full public post or reel link.',
      },
      {
        title: 'Paste link on /en',
        description: 'Use the downloader form to generate preview.',
      },
      {
        title: 'Download the resolved media',
        description: 'Save directly from the output card.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to install anything on Android?',
        answer: 'No. The workflow is browser-first for public links.',
      },
      {
        question: 'Can Android users download reels by link?',
        answer: 'Yes, with a valid public reel URL.',
      },
      {
        question: 'What if link parsing fails on mobile?',
        answer: 'Use the link-copy troubleshooting page to fix malformed URLs.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader-no-login',
      'instagram-downloader-without-app',
      'instagram-link-copy-troubleshooting',
      'instagram-reel-download-not-working-fixes',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-for-pc',
    type: 'guide',
    shortTitle: 'Instagram Downloader for PC',
    primaryKeyword: 'instagram downloader for pc',
    intentCluster: 'device-pc',
    metadataTitle: 'Instagram Downloader for PC',
    metadataDescription:
      'Use Instagram downloader on PC with a clean browser workflow for public links. Paste URL, inspect preview, and download posts or reels quickly.',
    heroEyebrow: 'PC guide',
    heroTitle: 'Instagram downloader workflow for PC browsers',
    heroDescription:
      'This page targets desktop users who want quick public-link downloads without extension friction.',
    description:
      'PC-intent pages align with desktop search behavior and provide direct conversion paths back to the /en downloader hub.',
    keywords: [
      'instagram downloader for pc',
      'download instagram on computer',
      'instagram link downloader desktop',
      'insta reel download pc',
    ],
    highlights: [
      'Targets PC and desktop downloader intent.',
      'No extension required for basic workflow.',
      'Supports reels, posts, photos, and carousel links.',
    ],
    steps: [
      {
        title: 'Copy the public Instagram URL',
        description: 'Use browser or app share options to copy full URL.',
      },
      {
        title: 'Paste link on /en form',
        description: 'Submit URL and verify preview output.',
      },
      {
        title: 'Download media file',
        description: 'Use the output card to save file on desktop.',
      },
    ],
    faqs: [
      {
        question: 'Is PC flow different from mobile?',
        answer: 'Core workflow is the same, with minor browser UI differences.',
      },
      {
        question: 'Can I use this without login on PC?',
        answer: 'Yes, for public links no login is required.',
      },
      {
        question: 'Where should failed links be debugged?',
        answer: 'Use not-working and link-copy troubleshooting pages.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader-without-app',
      'instagram-downloader-no-login',
      'instagram-link-copy-troubleshooting',
      'instagram-download-not-working',
    ],
  }),
  createSeoPage({
    slug: 'instagram-link-copy-troubleshooting',
    type: 'guide',
    shortTitle: 'Instagram Link Copy Troubleshooting',
    primaryKeyword: 'instagram link copy troubleshooting',
    intentCluster: 'link-copy-troubleshooting',
    metadataTitle: 'Instagram Link Copy Troubleshooting',
    metadataDescription:
      'Fix Instagram download failures caused by bad link copy formats. Learn correct URL patterns for posts, reels, and carousel media links.',
    heroEyebrow: 'Link troubleshooting',
    heroTitle: 'Instagram link copy issues and quick fixes',
    heroDescription:
      'This page helps users correct malformed or incomplete Instagram links before retrying extraction on the downloader form.',
    description:
      'Link-format errors are one of the most common failure causes, so dedicated troubleshooting content can improve completion rates.',
    keywords: [
      'instagram link copy troubleshooting',
      'instagram link not working',
      'fix instagram reel link',
      'instagram post url format',
    ],
    highlights: [
      'Targets format-related failure intent.',
      'Explains correct link structures by media type.',
      'Routes users back to /en after fixing URLs.',
    ],
    steps: [
      {
        title: 'Copy full canonical URL',
        description: 'Avoid shortened, partial, or copied-caption fragments.',
      },
      {
        title: 'Validate media-type path',
        description: 'Ensure URL is a post or reel link, not profile root.',
      },
      {
        title: 'Retry extraction on /en',
        description: 'Paste corrected URL and check preview response.',
      },
    ],
    faqs: [
      {
        question: 'Why do shortened links fail?',
        answer: 'Some shortened or rewritten URLs lose required media context.',
      },
      {
        question: 'Should profile URLs be used for downloads?',
        answer: 'No. Use direct post or reel URLs only.',
      },
      {
        question: 'Where do I go after fixing the URL?',
        answer: 'Return to /en and paste the corrected public link.',
      },
    ],
    relatedSlugs: [
      'instagram-download-not-working',
      'download-instagram-post-by-link',
      'download-instagram-reel-by-link',
      'instagram-public-link-checker-guide',
    ],
  }),
  createSeoPage({
    slug: 'instagram-reel-download-not-working-fixes',
    type: 'guide',
    shortTitle: 'Instagram Reel Download Fixes',
    primaryKeyword: 'instagram reel download not working',
    intentCluster: 'reel-troubleshooting',
    metadataTitle: 'Instagram Reel Download Not Working Fixes',
    metadataDescription:
      'Fix reel download issues for public Instagram links. Diagnose URL problems, media availability, and preview failures with practical steps.',
    heroEyebrow: 'Reel troubleshooting',
    heroTitle: 'Instagram reel download not working? Try these fixes',
    heroDescription:
      'This page is dedicated to reel-specific failures and gives a direct diagnostic flow for public-link extraction issues.',
    description:
      'Reel troubleshooting pages capture high-intent recovery traffic and improve successful completion after initial failures.',
    keywords: [
      'instagram reel download not working',
      'reel downloader not working',
      'instagram reel link failed',
      'fix instagram reel downloader',
    ],
    highlights: [
      'Focused on reel-only failure patterns.',
      'Separates URL issues from upstream response issues.',
      'Connects to broader troubleshooting resources.',
    ],
    steps: [
      {
        title: 'Verify reel URL format',
        description: 'Use full public reel URL copied from share options.',
      },
      {
        title: 'Retry with clean link',
        description: 'Paste corrected link and wait for preview generation.',
      },
      {
        title: 'Escalate persistent failures',
        description: 'Use support with URL and error details when needed.',
      },
    ],
    faqs: [
      {
        question: 'Can private reels be fixed here?',
        answer: 'No. Private content is outside supported public-link scope.',
      },
      {
        question: 'Do intermittent failures happen?',
        answer: 'Yes, depending on upstream response behavior for a reel.',
      },
      {
        question: 'Where can I check link format rules?',
        answer: 'Use the Instagram link copy troubleshooting page.',
      },
    ],
    relatedSlugs: [
      'instagram-reel-downloader',
      'download-instagram-reel-by-link',
      'instagram-link-copy-troubleshooting',
      'instagram-download-not-working',
    ],
  }),
  createSeoPage({
    slug: 'instagram-post-download-not-working-fixes',
    type: 'guide',
    shortTitle: 'Instagram Post Download Fixes',
    primaryKeyword: 'instagram post download not working',
    intentCluster: 'post-troubleshooting',
    metadataTitle: 'Instagram Post Download Not Working Fixes',
    metadataDescription:
      'Fix post download issues for public Instagram links. Check URL integrity, post visibility, and extraction responses with clear troubleshooting steps.',
    heroEyebrow: 'Post troubleshooting',
    heroTitle: 'Instagram post download not working? Try these fixes',
    heroDescription:
      'Use this page when feed post links fail and you need a structured way to recover and complete the download flow.',
    description:
      'Post-specific troubleshooting pages improve relevance for recovery queries and reduce drop-off after failed attempts.',
    keywords: [
      'instagram post download not working',
      'instagram post downloader failed',
      'fix instagram post link download',
      'post download error instagram',
    ],
    highlights: [
      'Built for feed-post failure intent.',
      'Helps users validate URL and availability quickly.',
      'Connects to general and link-format troubleshooting.',
    ],
    steps: [
      {
        title: 'Confirm post link is complete',
        description: 'Copy full public post URL and avoid fragments.',
      },
      {
        title: 'Check public accessibility',
        description: 'If restricted, extraction should not be expected to pass.',
      },
      {
        title: 'Retry and compare output',
        description: 'Use /en form and inspect updated preview response.',
      },
    ],
    faqs: [
      {
        question: 'Are carousel posts included in this fix flow?',
        answer: 'Yes, but multi-item behavior may vary by resolved assets.',
      },
      {
        question: 'Can profile links cause failures?',
        answer: 'Yes. Use direct post URLs instead of profile pages.',
      },
      {
        question: 'Where should broad failures be diagnosed?',
        answer: 'Use the general not-working guide and link-copy page.',
      },
    ],
    relatedSlugs: [
      'instagram-post-downloader',
      'download-instagram-post-by-link',
      'instagram-link-copy-troubleshooting',
      'instagram-download-not-working',
    ],
  }),
  createSeoPage({
    slug: 'instagram-public-link-checker-guide',
    type: 'guide',
    shortTitle: 'Instagram Public Link Checker Guide',
    primaryKeyword: 'instagram public link checker',
    intentCluster: 'public-vs-private',
    metadataTitle: 'Instagram Public Link Checker Guide',
    metadataDescription:
      'Check whether an Instagram URL is public before download. Learn quick validation steps to avoid private-link errors and failed extraction attempts.',
    heroEyebrow: 'Link validation guide',
    heroTitle: 'How to check if an Instagram link is public',
    heroDescription:
      'Use this guide to verify link visibility and avoid retries on unsupported private or restricted media URLs.',
    description:
      'Public-link validation content reduces failed attempts and strengthens trust with clear, accurate capability guidance.',
    keywords: [
      'instagram public link checker',
      'check instagram link public',
      'instagram link visibility check',
      'public instagram url test',
    ],
    highlights: [
      'Pre-checks link visibility before extraction.',
      'Helps avoid private-content mismatch.',
      'Routes users to intent-specific tool pages.',
    ],
    steps: [
      {
        title: 'Open the link in browser',
        description: 'Check if media loads publicly without account access.',
      },
      {
        title: 'Confirm it is a media URL',
        description: 'Use post or reel links, not profile or search paths.',
      },
      {
        title: 'Paste on /en and continue',
        description: 'Run extraction once public visibility is confirmed.',
      },
    ],
    faqs: [
      {
        question: 'Can this checker bypass private settings?',
        answer: 'No. It only helps validate public URL readiness.',
      },
      {
        question: 'Why is this useful before download?',
        answer: 'It prevents avoidable failures and improves success rate.',
      },
      {
        question: 'Should this page link to troubleshooting?',
        answer: 'Yes, especially for malformed or inaccessible URLs.',
      },
    ],
    relatedSlugs: [
      'public-vs-private-instagram-links',
      'instagram-link-copy-troubleshooting',
      'instagram-download-not-working',
      'instagram-downloader-no-login',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-best-practices',
    type: 'guide',
    shortTitle: 'Instagram Downloader Best Practices',
    primaryKeyword: 'instagram downloader best practices',
    intentCluster: 'best-practices',
    metadataTitle: 'Instagram Downloader Best Practices',
    metadataDescription:
      'Best practices for downloading public Instagram media by link. Improve success rate with clean URL handling, preview checks, and safe usage habits.',
    heroEyebrow: 'Best practices',
    heroTitle: 'Best practices for public-link Instagram downloads',
    heroDescription:
      'This page gives practical recommendations that improve success rates while keeping usage accurate, safe, and respectful of supported boundaries.',
    description:
      'Best-practice content supports long-term SEO quality by pairing intent targeting with genuinely helpful, non-spammy guidance.',
    keywords: [
      'instagram downloader best practices',
      'best way to download instagram links',
      'instagram link download tips',
      'safe instagram downloader workflow',
    ],
    highlights: [
      'Consolidates repeatable success habits.',
      'Reduces failures from bad inputs and assumptions.',
      'Supports trust and helpful-content quality.',
    ],
    steps: [
      {
        title: 'Use clean public links',
        description: 'Always copy full post or reel URLs from share menus.',
      },
      {
        title: 'Validate preview before saving',
        description: 'Confirm media matches intent before download.',
      },
      {
        title: 'Use troubleshooting when needed',
        description: 'Follow reel/post/link guides for failed cases.',
      },
    ],
    faqs: [
      {
        question: 'Do best practices help ranking quality?',
        answer: 'Helpful, intent-aligned content supports long-term SEO quality.',
      },
      {
        question: 'Should pages overpromise unsupported capabilities?',
        answer: 'No. Accurate claims are essential for trust and relevance.',
      },
      {
        question: 'Where should users perform actual downloads?',
        answer: 'The main downloader form is on /en.',
      },
    ],
    relatedSlugs: [
      'instagram-download-safety-guide',
      'instagram-public-link-checker-guide',
      'instagram-download-copyright-faq',
      'instagram-downloader-alternatives-comparison',
    ],
  }),
  createSeoPage({
    slug: 'instagram-download-copyright-faq',
    type: 'guide',
    shortTitle: 'Instagram Download Copyright FAQ',
    primaryKeyword: 'instagram download copyright faq',
    intentCluster: 'copyright',
    metadataTitle: 'Instagram Download Copyright FAQ',
    metadataDescription:
      'Copyright FAQ for Instagram downloads from public links. Understand ownership, permissions, and responsible usage before saving media files.',
    heroEyebrow: 'Copyright FAQ',
    heroTitle: 'Instagram download copyright and permission basics',
    heroDescription:
      'This page addresses copyright-related user questions so the downloader experience stays transparent and responsible.',
    description:
      'Policy and rights guidance supports trust, reduces risky behavior, and adds depth to helpful content for intent-adjacent queries.',
    keywords: [
      'instagram download copyright faq',
      'instagram media copyright',
      'can i download instagram videos legally',
      'instagram content permission',
    ],
    highlights: [
      'Explains ownership and permission basics.',
      'Encourages responsible download behavior.',
      'Pairs legal clarity with practical workflow links.',
    ],
    steps: [
      {
        title: 'Identify ownership',
        description: 'Assume content belongs to the original creator.',
      },
      {
        title: 'Check allowed usage',
        description: 'Confirm you have rights or permission for reuse.',
      },
      {
        title: 'Use downloader responsibly',
        description: 'Download only when use aligns with local rules and rights.',
      },
    ],
    faqs: [
      {
        question: 'Does this tool grant rights to reuse content?',
        answer: 'No. Download capability does not change ownership rights.',
      },
      {
        question: 'Should users get creator permission?',
        answer: 'Yes, especially for redistribution or commercial use.',
      },
      {
        question: 'Is this page legal advice?',
        answer: 'No. It is general informational guidance only.',
      },
    ],
    relatedSlugs: [
      'instagram-download-safety-guide',
      'instagram-downloader-best-practices',
      'public-vs-private-instagram-links',
      'instagram-downloader-no-login',
    ],
  }),
  createSeoPage({
    slug: 'instagram-downloader-alternatives-comparison',
    type: 'guide',
    shortTitle: 'Instagram Downloader Alternatives Comparison',
    primaryKeyword: 'instagram downloader alternatives',
    intentCluster: 'comparison',
    metadataTitle: 'Instagram Downloader Alternatives Comparison',
    metadataDescription:
      'Compare Instagram downloader alternatives for public links. Understand trade-offs in speed, clarity, trust signals, and supported workflow quality.',
    heroEyebrow: 'Comparison guide',
    heroTitle: 'Instagram downloader alternatives and trade-offs',
    heroDescription:
      'This page targets comparison intent with transparent criteria and links users back to the primary /en downloader experience.',
    description:
      'Comparison pages attract late-stage evaluators and can improve conversions when they remain balanced, specific, and evidence-based.',
    keywords: [
      'instagram downloader alternatives',
      'best instagram downloader comparison',
      'insta downloader alternatives',
      'ig downloader comparison',
    ],
    highlights: [
      'Targets evaluation and comparison intent.',
      'Uses transparent criteria instead of hype claims.',
      'Routes qualified users to /en conversion flow.',
    ],
    steps: [
      {
        title: 'Define your use case',
        description: 'Choose based on public-link media types and frequency.',
      },
      {
        title: 'Compare workflow quality',
        description: 'Assess preview clarity, error handling, and speed.',
      },
      {
        title: 'Choose and test on /en',
        description: 'Run a real link through the primary downloader flow.',
      },
    ],
    faqs: [
      {
        question: 'Can any tool guarantee top ranking or perfect success?',
        answer: 'No. Rankings and extraction outcomes vary by many factors.',
      },
      {
        question: 'What should users prioritize in comparisons?',
        answer: 'Accuracy, trust, stability, and clear support boundaries.',
      },
      {
        question: 'Where is the main downloader page?',
        answer: 'The primary broad-intent page is /en.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader-best-practices',
      'instagram-download-safety-guide',
      'instagram-downloader-no-login',
      'instagram-downloader-without-app',
    ],
  }),
];

export const seoPageMap = Object.fromEntries(
  seoPages.map((page) => [page.slug, page])
) as Record<string, SeoPageConfig>;

export const activeSeoPages = seoPages.filter((page) => page.status === 'active');

export function getSeoPage(slug: string): SeoPageConfig | null {
  return seoPageMap[slug] ?? null;
}

export function buildSeoPageMetadata(page: SeoPageConfig): Metadata {
  const indexable = page.status === 'active';

  return {
    title: {
      absolute: page.metadataTitle,
    },
    description: page.metadataDescription,
    keywords: page.keywords,
    alternates: {
      canonical: page.canonicalTarget,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: page.type === 'guide' ? 'article' : 'website',
      siteName,
      title: page.metadataTitle,
      description: page.metadataDescription,
      url: absoluteUrl(page.canonicalTarget),
      images: getOpenGraphImages(),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metadataTitle,
      description: page.metadataDescription,
      images: getTwitterImages(),
    },
  };
}
