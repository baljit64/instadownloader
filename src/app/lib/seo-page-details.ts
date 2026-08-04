export interface SeoPageDetailSection {
  bullets?: string[];
  heading: string;
  paragraphs: string[];
}

export const seoPageDetails: Record<string, SeoPageDetailSection[]> = {
  'instagram-video-downloader': [
    {
      heading: 'What the video downloader supports',
      paragraphs: [
        'This page is for public Instagram links whose primary media is video. That includes standard feed videos, public reels, and older /tv/ links that still resolve on Instagram’s public web experience. Paste the complete URL rather than a username, caption, embed code, or copied text surrounding the link.',
        'IGDown validates the domain and route, resolves the public media on the server, and displays a preview before download. It cannot open private profiles, content available only after sign-in, deleted posts, direct messages, drafts, or region- and age-restricted pages.',
      ],
      bullets: [
        'Supported paths: /p/, /reel/, /reels/, and /tv/.',
        'No Instagram password, session cookie, or app installation is requested.',
        'The result quality depends on the public source Instagram exposes.',
      ],
    },
    {
      heading: 'MP4, quality, and device compatibility',
      paragraphs: [
        'Instagram video results are commonly MP4-compatible, but the exact codec, resolution, aspect ratio, and file size come from the resolved source. IGDown does not claim to recover an uncompressed camera original or create extra detail. The best available download is the strongest public source returned by the extractor at that time.',
        'Current versions of Chrome, Safari, Edge, and Firefox can handle the download flow. On Android, check the Downloads folder. On iPhone and iPad, Safari normally places browser downloads in Files; saving a file into Photos can require an additional Share action.',
      ],
    },
    {
      heading: 'If an Instagram video link fails',
      paragraphs: [
        'Open the URL in a private browser window. If Instagram asks you to sign in or says the page is unavailable, it is not publicly resolvable. Copy the link again from Share, remove surrounding text, and retry once. Avoid rapid repeated submissions because upstream rate limits may make a temporary problem last longer.',
        'When a preview loads but the file does not save, check browser download permissions, storage, security extensions, and network filters. Send support the public URL, browser, device, time, and exact error if the same link continues to fail; never send login credentials or cookies.',
      ],
    },
  ],
  'instagram-reel-downloader': [
    {
      heading: 'A reel-specific public-link workflow',
      paragraphs: [
        'Use the Share menu on the reel to copy its full public URL. Both /reel/ and /reels/ variants are normalized into the supported extraction flow. After submission, review the video preview and download the resolved file. This checkpoint helps avoid saving the wrong media when several Instagram links are open.',
        'The downloader runs in the browser and does not require a Chrome extension, Android package, iPhone app, or Instagram account connection. Public access is essential: private-account reels and reels limited to an authenticated audience are outside the supported scope.',
      ],
      bullets: [
        'Copy the link from the reel itself.',
        'Paste only the URL into the downloader.',
        'Confirm the preview before saving the file.',
      ],
    },
    {
      heading: 'Reel quality and audio',
      paragraphs: [
        'The video and audio tracks available in the returned file depend on Instagram’s source and the extractor result. IGDown does not add copyrighted music, repair muted audio, or manufacture a higher resolution. A result described as high quality is still limited by the version publicly delivered by Instagram.',
        'If a reel has no audio in Instagram because of licensing, geography, removal, or the creator’s edit, a downloader cannot restore it. Test the public reel in Instagram first and use a current media player when the downloaded file itself will not play.',
      ],
    },
    {
      heading: 'Responsible reel downloads',
      paragraphs: [
        'Downloading a public reel does not transfer ownership. Keep personal copies only when you are authorized to do so, and obtain creator permission before redistribution, editing, or commercial reuse unless applicable law clearly permits the use. Do not remove attribution or present another creator’s work as your own.',
        'For malformed or unavailable links, use the dedicated reel troubleshooting guide. It covers private-account checks, copied-link cleanup, browser download behavior, and the information support needs to reproduce a real extraction failure.',
      ],
    },
  ],
  'instagram-photo-downloader': [
    {
      heading: 'Download a public Instagram photo by link',
      paragraphs: [
        'Copy the URL from a public photo post and paste it into IGDown. The server resolves media associated with the post, and the page returns an image preview when a source is available. This is different from taking a screenshot: the result comes from the public media source rather than the pixels displayed at your current screen size.',
        'A standard post may contain one image, while a carousel can contain several images and videos. Multi-item results are shown separately so you can identify each asset before downloading it.',
      ],
      bullets: [
        'Works with supported public post URLs, not usernames.',
        'Does not bypass private account settings.',
        'Does not upscale or reconstruct missing image detail.',
      ],
    },
    {
      heading: 'Image dimensions and “HD” claims',
      paragraphs: [
        'Instagram may generate several derivatives of an uploaded image. The downloader can return only a version exposed through the public page or extraction result. File dimensions, JPEG/WebP format, color profile, and compression can therefore differ from the creator’s camera original.',
        'IGDown uses “high quality” to describe the best public source it can resolve, not a guaranteed uncompressed master. This distinction keeps expectations accurate and avoids artificial upscaling that makes a file larger without recovering real detail.',
      ],
    },
    {
      heading: 'Saving photos on mobile and desktop',
      paragraphs: [
        'Android browsers typically save files to Downloads. Safari on iPhone and iPad typically saves browser downloads to Files, after which you can use Share to save an authorized image to Photos. Desktop browsers usually show the file in their download shelf or configured download folder.',
        'If the preview works but saving fails, check storage, download permissions, content blockers, and corporate network policy. Always respect the creator’s copyright, privacy, and any license or permission attached to the image.',
      ],
    },
  ],
  'instagram-carousel-downloader': [
    {
      heading: 'How carousel extraction differs from a single post',
      paragraphs: [
        'An Instagram carousel can combine photos and videos in one post. IGDown attempts to resolve each publicly exposed asset and returns a separate result card for every item found. That makes the order and media type visible before download and avoids forcing unrelated files into one archive.',
        'Copy the URL for the carousel post itself. A screenshot, an individual CDN media URL, or a link copied from a private message may not provide the public post context needed to enumerate the items.',
      ],
      bullets: [
        'Mixed photo and video carousels can produce mixed result cards.',
        'You can download individual items instead of the entire set.',
        'The number of results depends on what the public source exposes.',
      ],
    },
    {
      heading: 'Missing items and ordering',
      paragraphs: [
        'If fewer items appear than expected, first open the public post without signing in and confirm every slide is still available. Instagram page changes, restricted media, deleted slides, or temporary extraction failures can produce partial results. Copy the canonical post link again and retry once before reporting the issue.',
        'Result order normally follows the extracted source, but users should verify previews rather than relying only on file names. Downloading one item does not automatically save the rest.',
      ],
    },
    {
      heading: 'Quality, storage, and permissions',
      paragraphs: [
        'Each carousel asset retains the format and quality available from its source. Large mixed posts can use significant data and device storage, especially when several videos are included. On mobile, wait for one transfer to start before selecting the next item.',
        'A public carousel is still protected by the creator’s rights. Obtain permission before republishing, remixing, training a dataset, or using the media commercially unless your use is otherwise lawfully authorized.',
      ],
    },
  ],
  'instagram-post-downloader': [
    {
      heading: 'One post URL, media-specific results',
      paragraphs: [
        'The post downloader is the general route for public Instagram feed links. It can return a photo, a video, or multiple carousel assets depending on what the post contains. The preview-first interface identifies the result before you save it, while focused reel, video, photo, and carousel pages provide deeper guidance for those formats.',
        'Use the complete /p/ URL copied from Instagram. Account pages, hashtags, captions, comments, Stories, and private links do not match the supported post workflow.',
      ],
      bullets: [
        'No login or Instagram account connection.',
        'Public post links only.',
        'Separate result cards for media the extractor resolves.',
      ],
    },
    {
      heading: 'What happens after you paste the link',
      paragraphs: [
        'The form checks that the URL belongs to a supported platform, normalizes it, and sends it to a server route. Server-side extraction keeps proxy configuration and fallback logic out of browser code. Resolved media metadata returns to the client, where image or video previews and download actions are rendered.',
        'The downloader does not post to Instagram, modify the original, notify the creator, or ask for access to your account. Standard server and hosting logs may still process technical request data for reliability and abuse prevention, as described in the Privacy Policy.',
      ],
    },
    {
      heading: 'Public does not mean free of rights',
      paragraphs: [
        'Public visibility is an access condition, not a copyright license. Download content you own, content you have permission to use, or content whose use is allowed by applicable law. Ask the creator before republishing or using their work commercially, and retain attribution when required.',
        'If the post cannot be opened without an Instagram session, IGDown will not bypass that restriction. Use Instagram’s own authorized features for account exports, saved posts, direct messages, and content shared only with you.',
      ],
    },
  ],
};
