import Link from 'next/link';

const guideSections = [
  {
    id: 'video-downloads',
    title: 'Instagram video downloader for public links',
    paragraphs: [
      'An Instagram video downloader turns a public Instagram URL into a downloadable media file. IGDown accepts links to public feed videos, reels, and older IGTV-style posts. The server checks the URL, resolves the media attached to that page, and returns a preview before you save anything. That preview-first step is useful because it lets you confirm that the result matches the post you intended to download.',
      'Start with the complete link from Instagram’s Share menu. A copied caption, account name, shortened text fragment, or private profile URL does not identify a public media item. IGDown removes tracking query parameters when it normalizes supported Instagram links, but it does not bypass sign-in walls, privacy controls, age restrictions, regional restrictions, or content that Instagram has removed.',
    ],
  },
  {
    id: 'reel-downloads',
    title: 'Download Instagram reels without installing an app',
    paragraphs: [
      'Reels use a dedicated Instagram URL pattern, but the download process is the same: copy the public reel link, paste it into the form, wait for the preview, and choose Download. The browser-based flow works on phones, tablets, laptops, and desktop computers, so a separate reel downloader extension or mobile application is not required.',
      'A reel may fail when it was shared from a private account, deleted, limited to signed-in viewers, or temporarily unavailable to Instagram’s public web page. If a copied link contains extra text, paste only the URL. When Instagram changes how it exposes public media, extraction can also fail temporarily; the troubleshooting guidance below explains the safest checks to try before contacting support.',
    ],
  },
  {
    id: 'photo-carousel-downloads',
    title: 'Photo, post, and carousel downloads',
    paragraphs: [
      'Public Instagram photo posts can be resolved in the same form as videos. For a single-image post, the result normally contains one image preview. A carousel post can contain several photos, several videos, or a mixture of both. When the public page exposes each item, IGDown returns separate result cards so you can save only the files you need instead of receiving an opaque archive.',
      'Image dimensions and compression depend on the source Instagram makes available. The downloader does not invent pixels, upscale an image, or promise a quality higher than the public source. For the clearest result, use the original post URL rather than a screenshot, embedded copy, or repost from another service. Visit the dedicated photo and carousel guides for media-specific steps and limitations.',
    ],
  },
  {
    id: 'how-it-works',
    title: 'How to download an Instagram post in three steps',
    paragraphs: [
      'First, open the public post or reel in Instagram and choose Copy link from the Share menu. Second, paste that complete URL into the downloader near the top of this page and submit it. Third, review the returned media cards and use the Download button for the item you want. Keep this page open until the file transfer begins, especially on mobile browsers that may ask where to save the file.',
      'The form validates supported domains before it sends a request. Extraction happens on the server because Instagram pages and media delivery rules cannot always be read reliably from a browser. The result is then passed back to the preview grid. This design keeps proxy credentials and extraction logic out of client-side code while giving you a visible checkpoint before a download begins.',
    ],
  },
  {
    id: 'public-links',
    title: 'No login means public content only',
    paragraphs: [
      'IGDown does not ask for an Instagram username, password, session cookie, or access token. That reduces account risk and makes the workflow quicker, but it also sets a firm boundary: only media that is available through a public supported URL can be processed. Private posts, Close Friends stories, direct messages, drafts, and content restricted to an authenticated audience are not supported.',
      'Stories and profile pictures are not advertised as supported download types in the current product. Public stories are short-lived and commonly require authenticated Instagram context, while profile image extraction uses a different account-based workflow. Rather than present a form that cannot reliably deliver those results, IGDown focuses its indexable pages on public posts, reels, photos, videos, and carousels that match the actual extractor.',
    ],
  },
  {
    id: 'quality-formats',
    title: 'HD quality, original sources, and MP4 files',
    paragraphs: [
      'The downloader selects media URLs that the public page or extractor makes available. Video results are commonly delivered as MP4-compatible files, and images are commonly JPEG or WebP, but the exact container, codec, resolution, and file size are controlled by the source. “Original quality” therefore means the best resolved public source—not an uncompressed camera original and not a file enhanced after download.',
      'IGDown does not transcode every result into a new format because transcoding increases processing time, can reduce quality, and uses more server resources. If your device cannot play a returned video, update the browser or use a reputable local media player. Avoid websites that promise impossible 4K upgrades for a low-resolution source; those claims generally describe artificial upscaling rather than recovered source detail.',
    ],
  },
  {
    id: 'mobile-downloads',
    title: 'Using the downloader on Android and iPhone',
    paragraphs: [
      'On Android, copy the link in the Instagram app, switch to your browser, paste it into IGDown, and download the resolved item. Chrome usually places files in the Downloads folder or shows them in the system download manager. Browser permissions, storage space, data-saving settings, and security software can affect whether a file opens immediately.',
      'On iPhone and iPad, Safari may open the media in a new view or place it in the Files app under Downloads. Use the browser’s download indicator or Share menu if the file does not appear in Photos automatically. iOS intentionally separates browser downloads from the photo library, so saving to Photos can require one extra user action. The public-link and copyright rules are the same on every device.',
    ],
  },
  {
    id: 'desktop-downloads',
    title: 'Chrome, Safari, Edge, and desktop browsers',
    paragraphs: [
      'Desktop browsers provide the largest preview area and make multi-item carousel downloads easier to review. Copy the post URL from instagram.com or the mobile app, paste it into the form, and save each result. Chrome, Edge, Firefox, and Safari may use different download prompts, but no browser extension is required. If your organization blocks downloads, browser policy can override the website’s button.',
      'A pop-up blocker should not normally affect the primary extraction request. A strict privacy extension, DNS filter, or corporate network can still block the media host used for the final file. If the preview works but the download does not, try the same result in a standard browser profile, check the download shelf, and confirm that your security software has not quarantined the request.',
    ],
  },
  {
    id: 'security-privacy',
    title: 'Security and privacy considerations',
    paragraphs: [
      'Never give a third-party downloader your Instagram password or session cookie. IGDown is designed around public URLs and does not need account credentials. Submitted links are processed by the server and may pass through extraction and proxy infrastructure to retrieve public media. Standard hosting logs can include technical request information such as time, route, IP address, and user agent for security and reliability.',
      'Optional Google Analytics is not loaded until you choose Allow analytics in the consent prompt. Declining analytics does not disable the downloader. Review the Privacy Policy and Cookie Policy for a plain-language description of data flows and controls. For sensitive or confidential content, do not use a public-link downloader; use the platform’s own authorized access and export features instead.',
    ],
  },
  {
    id: 'copyright',
    title: 'Copyright and responsible use',
    paragraphs: [
      'Being able to access or download a public post does not transfer copyright or grant permission to republish it. Creators and other rightsholders retain their rights. Save only content you own, content you have permission to use, or content whose use is otherwise permitted by applicable law and platform terms. Give attribution when a license or permission requires it.',
      'Do not use IGDown to impersonate creators, remove ownership information, build unauthorized archives, harass people, or redistribute media commercially without permission. Legal exceptions vary by country and context, so general website guidance cannot decide whether a particular reuse is lawful. If a rightsholder believes a link or use involving IGDown infringes their rights, the DMCA Policy explains how to send a complete notice.',
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting a link that does not download',
    paragraphs: [
      'Check that the URL begins with https://www.instagram.com/ and contains a supported /p/, /reel/, /reels/, or /tv/ path. Open it in a private browser window: if Instagram requires sign-in or says the page is unavailable, the downloader cannot treat it as a public post. Copy the link again, remove surrounding text, and retry once. Repeated rapid attempts can make upstream rate limits worse.',
      'If a preview appears but saving fails, verify free storage, browser download permission, and network filters. Try a different current browser before changing the link. If the issue persists, contact support with the public URL, device, browser version, approximate time, and exact error message. Do not email passwords, cookies, private links, or personal account access details.',
    ],
  },
];

const supportRows = [
  ['Public feed video', 'Supported', 'Use the complete /p/ link.'],
  ['Public reel', 'Supported', 'Use the /reel/ or /reels/ link.'],
  ['Public photo or carousel', 'Supported', 'Multiple assets may return as separate cards.'],
  ['Private post or reel', 'Not supported', 'IGDown does not bypass privacy or sign-in.'],
  ['Story or Close Friends story', 'Not supported', 'Authenticated and short-lived story access is excluded.'],
  ['Profile picture by username', 'Not supported', 'The current extractor requires a supported media URL.'],
];

export default function HomeGuideSection() {
  return (
    <section aria-labelledby="instagram-downloader-guide" className="surface-card mt-12 rounded-2xl p-6 sm:p-8">
      <div className="max-w-4xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Complete user guide
        </span>
        <h2 id="instagram-downloader-guide" className="font-display mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Instagram downloader guide: videos, reels, photos, and posts
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-700">
          IGDown is a free browser-based Instagram downloader for supported public media links. The tool stays at the top of the page so repeat visitors can paste a URL immediately; this guide answers the quality, device, privacy, and troubleshooting questions that matter before and after a download.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <caption className="sr-only">Instagram media support and limitations</caption>
          <thead className="bg-slate-100 text-slate-900">
            <tr>
              <th className="px-4 py-3 font-semibold" scope="col">Link type</th>
              <th className="px-4 py-3 font-semibold" scope="col">Current support</th>
              <th className="px-4 py-3 font-semibold" scope="col">What to know</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
            {supportRows.map(([type, support, note]) => (
              <tr key={type}>
                <th className="px-4 py-3 font-medium text-slate-900" scope="row">{type}</th>
                <td className="px-4 py-3">{support}</td>
                <td className="px-4 py-3">{note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-2">
        {guideSections.map((section) => (
          <article id={section.id} key={section.id} className="scroll-mt-24">
            <h3 className="font-display text-2xl font-semibold tracking-tight text-slate-900">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p className="mt-4 text-[0.98rem] leading-7 text-slate-600" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-slate-100 p-5 text-sm leading-7 text-slate-700">
        Need a focused walkthrough? Read the <Link className="font-semibold text-blue-700 underline" href="/instagram-reel-downloader">reel downloader guide</Link>, <Link className="font-semibold text-blue-700 underline" href="/instagram-photo-downloader">photo downloader guide</Link>, or <Link className="font-semibold text-blue-700 underline" href="/instagram-carousel-downloader">carousel downloader guide</Link>.
      </div>
    </section>
  );
}
