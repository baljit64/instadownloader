import type { Metadata } from 'next';
import { absoluteUrl, siteName } from './site';

export interface SeoFaq {
  answer: string;
  question: string;
}

export interface SeoStep {
  description: string;
  title: string;
}

export interface SeoPageConfig {
  description: string;
  faqs: SeoFaq[];
  heroDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  highlights: string[];
  keywords: string[];
  metadataDescription: string;
  metadataTitle: string;
  relatedSlugs: string[];
  shortTitle: string;
  slug: string;
  steps: SeoStep[];
  type: 'guide' | 'tool';
}

export const seoPages: SeoPageConfig[] = [
  {
    slug: 'instagram-downloader',
    type: 'tool',
    shortTitle: 'Instagram Downloader',
    metadataTitle: 'Instagram Downloader for Public Posts, Reels, Photos and Carousel Links',
    metadataDescription:
      'Download public Instagram posts, reels, photos, and carousel media with a fast online Instagram downloader. Paste a public link and save the file.',
    heroEyebrow: 'Instagram tool',
    heroTitle: 'Instagram Downloader for public posts, reels, photos, and carousel links',
    heroDescription:
      'Use the downloader for public Instagram URLs when you need a simple paste-to-preview flow. This page explains what the tool supports, how the process works, and what users should expect when a link fails.',
    description:
      'This page targets the broad Instagram downloader intent. It focuses on public links only, which keeps the promise aligned with the actual product and reduces mismatch for users coming from search.',
    keywords: [
      'instagram downloader',
      'online instagram downloader',
      'download instagram post',
      'download instagram reel',
      'download instagram photo',
      'instagram carousel downloader',
    ],
    highlights: [
      'Built for public Instagram URLs rather than account logins or private media access.',
      'Supports the main public content types already exposed in the app: posts, reels, photos, and carousel media.',
      'Keeps the flow simple: paste a URL, preview the result, then download through the app.',
    ],
    steps: [
      {
        title: 'Copy a public Instagram link',
        description:
          'Open the public Instagram post or reel you want to save and copy the full URL.',
      },
      {
        title: 'Paste the URL into the downloader',
        description:
          'Use the main downloader input on the homepage and submit the public link.',
      },
      {
        title: 'Preview the media and save it',
        description:
          'Review the media card first, then use the download button to save the file.',
      },
    ],
    faqs: [
      {
        question: 'Does this Instagram downloader work for private posts?',
        answer:
          'No. The downloader is built for public Instagram URLs. Private content should not be claimed as supported.',
      },
      {
        question: 'Can it download reels and photo posts?',
        answer:
          'Yes, the current product flow is built around public reels, photo posts, and carousel media that the extractor can resolve.',
      },
      {
        question: 'Do users need to log in?',
        answer:
          'No. The tool is designed around public links and does not require a login flow for standard usage.',
      },
    ],
    relatedSlugs: [
      'instagram-post-downloader',
      'instagram-reel-downloader',
      'instagram-photo-downloader',
      'instagram-carousel-downloader',
    ],
  },
  {
    slug: 'instagram-post-downloader',
    type: 'tool',
    shortTitle: 'Instagram Post Downloader',
    metadataTitle: 'Instagram Post Downloader for Public Feed Posts',
    metadataDescription:
      'Download public Instagram posts from feed URLs. Learn how an Instagram post downloader should handle public links, previews, and download quality.',
    heroEyebrow: 'Instagram post tool',
    heroTitle: 'Instagram Post Downloader for public feed links',
    heroDescription:
      'This page is focused on users searching specifically for an Instagram post downloader. It targets public feed posts and explains the expected flow clearly, without overclaiming unsupported content.',
    description:
      'A post-focused landing page helps search engines understand that the site covers the “Instagram post downloader” intent separately from reels, photo-only pages, and carousel-specific searches.',
    keywords: [
      'instagram post downloader',
      'download instagram post',
      'insta post download',
      'public instagram post downloader',
    ],
    highlights: [
      'Matches search intent for public Instagram feed posts.',
      'Keeps the explanation separate from reel-specific or carousel-specific use cases.',
      'Helps users understand that the product expects a public post URL, not a username or profile link.',
    ],
    steps: [
      {
        title: 'Open the public Instagram post',
        description:
          'Use the share menu on the post and copy the public link.',
      },
      {
        title: 'Paste the post URL into the downloader',
        description:
          'Paste the full post link instead of a profile URL or shortened text fragment.',
      },
      {
        title: 'Wait for the media preview',
        description:
          'If the link is valid and public, the preview should appear before download.',
      },
    ],
    faqs: [
      {
        question: 'What is the difference between an Instagram post and an Instagram reel downloader page?',
        answer:
          'A post downloader page targets standard feed-post search intent, while a reel downloader page focuses specifically on reel URLs and video behavior.',
      },
      {
        question: 'Can a public post contain multiple files?',
        answer:
          'Yes. Some public posts are carousel posts, which means the extractor may return multiple media items.',
      },
      {
        question: 'Why should the page mention public links so clearly?',
        answer:
          'Because that matches the actual supported flow and reduces mismatched search traffic from users expecting private-content access.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader',
      'instagram-carousel-downloader',
      'how-to-download-instagram-post',
      'public-vs-private-instagram-links',
    ],
  },
  {
    slug: 'instagram-reel-downloader',
    type: 'tool',
    shortTitle: 'Instagram Reel Downloader',
    metadataTitle: 'Instagram Reel Downloader for Public Reel Links',
    metadataDescription:
      'Download public Instagram reels with a reel-focused downloader page. Understand public URL support, preview handling, and common reel download issues.',
    heroEyebrow: 'Instagram reel tool',
    heroTitle: 'Instagram Reel Downloader for public reel URLs',
    heroDescription:
      'This page targets users specifically searching for reel downloads. Reels often have different expectations around video playback, previews, and fallback handling, so they deserve their own SEO page.',
    description:
      'A separate reel page makes the site more precise for users and search engines, instead of pushing every query to a generic homepage.',
    keywords: [
      'instagram reel downloader',
      'download instagram reel',
      'public reel downloader',
      'instagram reels download',
    ],
    highlights: [
      'Targets reel-specific search intent with reel-specific wording.',
      'Explains why a reel preview may appear before the download action.',
      'Sets expectations for public-only support and common failure cases.',
    ],
    steps: [
      {
        title: 'Copy the public reel link',
        description:
          'Use the share option on the reel and copy the full public URL.',
      },
      {
        title: 'Submit the reel URL',
        description:
          'Paste it into the downloader and allow the extractor to fetch the media.',
      },
      {
        title: 'Review the result and download',
        description:
          'If the reel resolves successfully, the player or preview card should appear first.',
      },
    ],
    faqs: [
      {
        question: 'Why do some reels fail even when they look public?',
        answer:
          'Instagram can return inconsistent upstream responses. A reel may appear public to the user while one extraction path still fails.',
      },
      {
        question: 'Is this different from a standard Instagram video downloader page?',
        answer:
          'Yes. Reel pages map to a more specific user intent and give search engines clearer context around reel URLs.',
      },
      {
        question: 'Does the app preview the reel first?',
        answer:
          'Yes, the current UX is preview-first when the extractor resolves the media successfully.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader',
      'instagram-post-downloader',
      'instagram-download-not-working',
      'public-vs-private-instagram-links',
    ],
  },
  {
    slug: 'instagram-photo-downloader',
    type: 'tool',
    shortTitle: 'Instagram Photo Downloader',
    metadataTitle: 'Instagram Photo Downloader for Public Image Posts',
    metadataDescription:
      'Download public Instagram photos in a simple online flow. This page targets image-post search intent and explains quality, public-link support, and previews.',
    heroEyebrow: 'Instagram photo tool',
    heroTitle: 'Instagram Photo Downloader for public image posts',
    heroDescription:
      'This page is focused on photo-specific Instagram search intent. It helps separate image-download queries from reels and carousel pages, which can improve relevance and click-through rate.',
    description:
      'Users looking for an Instagram photo downloader expect image-specific language, quality guidance, and a clear answer about public post requirements.',
    keywords: [
      'instagram photo downloader',
      'download instagram photo',
      'instagram image downloader',
      'public instagram photo download',
    ],
    highlights: [
      'Targets image-post users instead of generic media traffic.',
      'Keeps quality expectations tied to the original public post.',
      'Reinforces that previews and downloads should happen in-app, not in raw asset tabs.',
    ],
    steps: [
      {
        title: 'Copy the public photo URL',
        description:
          'Open the public Instagram photo post and copy the full post URL.',
      },
      {
        title: 'Paste the link into the downloader',
        description:
          'Use the downloader form so the app can validate the link and extract the media.',
      },
      {
        title: 'Check the preview and save the image',
        description:
          'If the image resolves correctly, use the download action from the preview grid.',
      },
    ],
    faqs: [
      {
        question: 'Will the photo download in its original quality?',
        answer:
          'The app aims to preserve the best available quality returned by the public media source, but the final output still depends on what Instagram exposes publicly.',
      },
      {
        question: 'Can a photo post still return multiple files?',
        answer:
          'Yes. Some posts that look like standard photo posts are actually carousel posts with more than one media item.',
      },
      {
        question: 'Why should image pages have their own SEO page?',
        answer:
          'Because “Instagram photo downloader” is a distinct search intent and performs better when it has its own targeted content.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader',
      'instagram-post-downloader',
      'instagram-carousel-downloader',
      'how-to-download-instagram-post',
    ],
  },
  {
    slug: 'instagram-carousel-downloader',
    type: 'tool',
    shortTitle: 'Instagram Carousel Downloader',
    metadataTitle: 'Instagram Carousel Downloader for Multi-Slide Public Posts',
    metadataDescription:
      'Download public Instagram carousel posts and understand how multi-item posts should be handled. Learn how previews and multi-media results work.',
    heroEyebrow: 'Instagram carousel tool',
    heroTitle: 'Instagram Carousel Downloader for multi-slide public posts',
    heroDescription:
      'Carousel posts are different from single-image posts because they can resolve to several media items. This page explains that behavior directly and targets carousel-specific search intent.',
    description:
      'A dedicated carousel page helps align the content with searches about multi-slide posts instead of treating every Instagram URL the same.',
    keywords: [
      'instagram carousel downloader',
      'download instagram carousel',
      'instagram multi image downloader',
      'instagram slider downloader',
    ],
    highlights: [
      'Explains why one public post can return multiple downloadable files.',
      'Targets a keyword set that is different from single-photo or reel queries.',
      'Helps users understand preview grids and separate download actions.',
    ],
    steps: [
      {
        title: 'Copy the public carousel post URL',
        description:
          'Open the public Instagram carousel post and copy its full URL.',
      },
      {
        title: 'Paste the link into the tool',
        description:
          'The extractor will attempt to resolve each public media item in the carousel.',
      },
      {
        title: 'Download the individual items you need',
        description:
          'Use the resulting media cards to download each file separately.',
      },
    ],
    faqs: [
      {
        question: 'What is an Instagram carousel post?',
        answer:
          'A carousel is a post that contains multiple images or videos in a single public Instagram URL.',
      },
      {
        question: 'Will the app return every file in the carousel?',
        answer:
          'It will try to return all resolvable public media items that the extractor can fetch from the post.',
      },
      {
        question: 'Why is carousel SEO worth a dedicated page?',
        answer:
          'Because users searching for carousel downloads have a more specific need than users searching for a generic Instagram downloader.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader',
      'instagram-post-downloader',
      'instagram-photo-downloader',
      'public-vs-private-instagram-links',
    ],
  },
  {
    slug: 'how-to-download-instagram-post',
    type: 'guide',
    shortTitle: 'How to Download an Instagram Post',
    metadataTitle: 'How to Download an Instagram Post from a Public URL',
    metadataDescription:
      'Learn how to download an Instagram post from a public URL. Step-by-step guidance for copy, paste, preview, and download.',
    heroEyebrow: 'Instagram guide',
    heroTitle: 'How to download an Instagram post from a public URL',
    heroDescription:
      'This guide page targets instructional search intent rather than pure tool intent. It complements the downloader pages by teaching the steps users expect to see in search.',
    description:
      'Instructional pages can rank for how-to queries, improve internal linking, and support the core tool pages with more helpful search content.',
    keywords: [
      'how to download instagram post',
      'download instagram post guide',
      'save instagram post online',
      'copy instagram post url',
    ],
    highlights: [
      'Targets how-to intent instead of only transactional downloader queries.',
      'Gives a clear step-by-step flow that matches the real app behavior.',
      'Supports the main tool pages with instructional content and internal links.',
    ],
    steps: [
      {
        title: 'Find the public post',
        description:
          'Open the post you want to save and make sure it is publicly accessible.',
      },
      {
        title: 'Copy the full URL',
        description:
          'Use the Instagram share menu or browser address bar to copy the exact post URL.',
      },
      {
        title: 'Paste, preview, and save',
        description:
          'Submit the URL through the downloader, confirm the preview, and use the download action.',
      },
    ],
    faqs: [
      {
        question: 'Should users paste a username or a post URL?',
        answer:
          'They should paste the full post URL. Usernames and profile links do not provide enough context for extraction.',
      },
      {
        question: 'Does the guide work for reels too?',
        answer:
          'The general copy-paste flow is similar, but reels have their own dedicated page and keyword target.',
      },
      {
        question: 'What is the most common mistake?',
        answer:
          'Pasting an unsupported or private link instead of a public post URL is the most common reason for failure.',
      },
    ],
    relatedSlugs: [
      'instagram-post-downloader',
      'instagram-downloader',
      'instagram-download-not-working',
      'public-vs-private-instagram-links',
    ],
  },
  {
    slug: 'instagram-download-not-working',
    type: 'guide',
    shortTitle: 'Instagram Download Not Working',
    metadataTitle: 'Instagram Download Not Working? Common Public-Link Fixes',
    metadataDescription:
      'Troubleshoot Instagram download issues for public links. Learn why a public-looking URL may fail and what users should check first.',
    heroEyebrow: 'Instagram troubleshooting',
    heroTitle: 'Instagram download not working? Start with these public-link checks',
    heroDescription:
      'Troubleshooting pages can win search traffic from users whose first attempt failed. This page explains common reasons why a public Instagram download may not work.',
    description:
      'Searchers often add “not working” after a failed attempt. A dedicated troubleshooting page helps capture that query class and improve the site’s overall topical coverage.',
    keywords: [
      'instagram download not working',
      'instagram downloader not working',
      'public instagram link failed',
      'instagram reel downloader not working',
    ],
    highlights: [
      'Targets troubleshooting intent instead of trying to force all users into the homepage.',
      'Explains the difference between a broken tool flow and a bad or unsupported URL.',
      'Supports user trust by naming real failure cases rather than hiding them.',
    ],
    steps: [
      {
        title: 'Check that the URL is public',
        description:
          'If the post is private or access-restricted, the downloader should not claim that it can fetch it.',
      },
      {
        title: 'Use the exact post or reel URL',
        description:
          'Profile URLs, copied captions, and malformed share links commonly break extraction.',
      },
      {
        title: 'Retry and watch the preview response',
        description:
          'If the preview still fails, the issue may be upstream on Instagram or in the extractor path for that specific link.',
      },
    ],
    faqs: [
      {
        question: 'Why can a reel look public but still fail?',
        answer:
          'Instagram sometimes returns inconsistent responses across endpoints, so one extraction path can fail even when the reel appears public to a user.',
      },
      {
        question: 'Can a bad share URL cause the problem?',
        answer:
          'Yes. Shortened, malformed, or incomplete URLs are a common reason the extractor cannot resolve the media.',
      },
      {
        question: 'Should the page mention private-post limits directly?',
        answer:
          'Yes. Clear public-vs-private guidance improves trust and reduces misleading expectations.',
      },
    ],
    relatedSlugs: [
      'public-vs-private-instagram-links',
      'how-to-download-instagram-post',
      'instagram-reel-downloader',
      'instagram-downloader',
    ],
  },
  {
    slug: 'public-vs-private-instagram-links',
    type: 'guide',
    shortTitle: 'Public vs Private Instagram Links',
    metadataTitle: 'Public vs Private Instagram Links: What a Downloader Can Actually Use',
    metadataDescription:
      'Understand the difference between public and private Instagram links for download tools. Learn what a downloader can realistically support.',
    heroEyebrow: 'Instagram support guide',
    heroTitle: 'Public vs private Instagram links: what a downloader can actually support',
    heroDescription:
      'This page is useful for both users and SEO because it sets realistic expectations. It explains why public-link wording matters and why private content should not be marketed as supported.',
    description:
      'A trust-focused explainer page can reduce bounce rate, improve user understanding, and support the main downloader pages with accurate topical coverage.',
    keywords: [
      'public vs private instagram links',
      'instagram private post downloader',
      'public instagram downloader',
      'instagram public post link',
    ],
    highlights: [
      'Explains the core limitation clearly: public links are not the same as private content.',
      'Supports more honest product messaging around what the downloader can and cannot do.',
      'Gives Google clearer topical signals around public-media extraction.',
    ],
    steps: [
      {
        title: 'Identify whether the post is public',
        description:
          'If the post requires login access or belongs to a private account, it is outside the supported public-link flow.',
      },
      {
        title: 'Copy the exact media URL',
        description:
          'A full public media link is the best input for the downloader and for troubleshooting.',
      },
      {
        title: 'Use pages that match the media type',
        description:
          'If you know the link is a reel, photo, or carousel post, use the matching tool page for clearer guidance.',
      },
    ],
    faqs: [
      {
        question: 'Why is “public” so important in Instagram downloader SEO?',
        answer:
          'Because that is the actual supported product boundary. Overstating private-content support creates poor user experience and weakens trust.',
      },
      {
        question: 'Can private links ever work reliably?',
        answer:
          'A public-link downloader should not market private-content access as a standard supported path.',
      },
      {
        question: 'Which page should users visit after reading this guide?',
        answer:
          'They should move to the tool page that matches the content they want to save, such as post, reel, photo, or carousel.',
      },
    ],
    relatedSlugs: [
      'instagram-downloader',
      'instagram-post-downloader',
      'instagram-reel-downloader',
      'instagram-download-not-working',
    ],
  },
];

export const seoPageMap = Object.fromEntries(
  seoPages.map((page) => [page.slug, page])
) as Record<string, SeoPageConfig>;

export function getSeoPage(slug: string): SeoPageConfig | null {
  return seoPageMap[slug] ?? null;
}

export function buildSeoPageMetadata(page: SeoPageConfig): Metadata {
  return {
    title: page.metadataTitle,
    description: page.metadataDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      type: page.type === 'guide' ? 'article' : 'website',
      siteName,
      title: page.metadataTitle,
      description: page.metadataDescription,
      url: absoluteUrl(`/${page.slug}`),
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metadataTitle,
      description: page.metadataDescription,
    },
  };
}
