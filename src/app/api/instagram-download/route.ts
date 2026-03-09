import { InstagramMediaItem, isValidInstagramPostUrl, normalizeInstagramPostUrl } from '@/app/lib/instagram';
import axios, { type AxiosResponse } from 'axios';
import { load } from 'cheerio';
import { NextRequest, NextResponse } from 'next/server';


export const runtime = 'nodejs';

interface InstagramDownloadRequest {
  url?: string;
}

interface InstagramParseResult {
  media: InstagramMediaItem[];
  statusHint: 'ok' | 'private' | 'not_found';
}

const REQUEST_TIMEOUT_MS = 18000;

const REQUEST_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

const EMBED_REQUEST_HEADERS = {
  ...REQUEST_HEADERS,
  // Instagram often serves crawler-friendly embed payloads with direct media fields.
  'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
};

const INSTAGRAM_MEDIA_HOST = /(?:cdninstagram\.com|scontent[-._a-z0-9]*\.fbcdn\.net|fbcdn\.net|instagram\.com)/i;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function decodeEscapedUrl(value: string): string {
  return value
    .replace(/\\u0026/g, '&')
    .replace(/\\\//g, '/')
    .replace(/\\\"/g, '"')
    .replace(/&amp;/g, '&')
    .trim();
}

function hasPostPrivateMarker(html: string): boolean {
  return /This Account is Private|"is_private"\s*:\s*true|\"user\"\s*:\s*\{[\s\S]*?\"is_private\"\s*:\s*true/i.test(
    html
  );
}

function isExplicitPrivateResponse(status: number, body: string): boolean {
  return (status === 401 || status === 403) && hasPostPrivateMarker(body);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function isLikelyImage(url: string): boolean {
  return /\.(?:jpe?g|png|webp|gif|heic)(\?|$)|\/v\//i.test(url) || /\bthumb\b/.test(url);
}

function isLikelyVideo(url: string): boolean {
  return /\.(?:mp4|m4v|webm|m3u8)(\?|$)|\/video\//i.test(url) || /\bvideo\b/.test(url);
}

function isStaticAsset(url: string): boolean {
  return /\/static\/|\/assets\//i.test(url) ||
    /apple-touch|favicon|manifest(?:\.json)?|sprite|sentry|webpack|browserconfig/i.test(url) ||
    /\/(?:css|js|fonts?)\//i.test(url) ||
    /\.(?:svg|map|json|txt|xml|woff2?|ttf|eot)(\?|$)/i.test(url);
}

function shouldAcceptMediaUrl(url: string): boolean {
  if (!INSTAGRAM_MEDIA_HOST.test(url) || isStaticAsset(url)) {
    return false;
  }

  return isLikelyImage(url) || isLikelyVideo(url);
}

function normalizeMediaUrl(value: string): string {
  const decoded = decodeEscapedUrl(value);
  if (!/^https?:\/\//i.test(decoded)) {
    return '';
  }

  try {
    const parsed = new URL(decoded);
    parsed.hash = '';

    return parsed.toString();
  } catch {
    return decoded;
  }
}

function pushMedia(
  media: InstagramMediaItem[],
  seen: Set<string>,
  rawUrl: string | undefined,
  fallbackType: 'image' | 'video'
) {
  if (!rawUrl) {
    return;
  }

  const normalized = normalizeMediaUrl(rawUrl);
  if (!normalized) {
    return;
  }

  if (!shouldAcceptMediaUrl(normalized)) {
    return;
  }

  const dedupeKey = (() => {
    try {
      const parsed = new URL(normalized);
      return `${parsed.origin}${parsed.pathname}`;
    } catch {
      return normalized;
    }
  })();

  if (seen.has(dedupeKey)) {
    return;
  }

  const type = isLikelyVideo(normalized) ? 'video' : fallbackType === 'video' || !isLikelyImage(normalized) ? 'video' : 'image';

  seen.add(dedupeKey);
  media.push({
    url: normalized,
    type,
  });
}

function parseJsonSafely(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function extractBalancedJsonSegment(source: string, startIndex: number): string | null {
  const opening = source[startIndex];
  if (opening !== '{' && opening !== '[') {
    return null;
  }

  const closing = opening === '{' ? '}' : ']';
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = startIndex; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === opening) {
      depth += 1;
      continue;
    }

    if (char === closing) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(startIndex, index + 1);
      }
    }
  }

  return null;
}

function collectMediaFromPayload(payload: unknown, media: InstagramMediaItem[], seen: Set<string>) {
  const roots: unknown[] = [];

  const push = (value: unknown) => {
    if (value && typeof value === 'object') {
      roots.push(value);
    }
  };

  const payloadObj = asRecord(payload);
  if (!payloadObj) {
    return;
  }

  const entryData = asRecord(payloadObj.entry_data);
  const postPageArray = Array.isArray(entryData?.PostPage) ? entryData.PostPage : undefined;
  const postPage = postPageArray?.[0];
  const postPageRoot = asRecord(postPage);
  push(postPageRoot?.graphql && asRecord(postPageRoot?.graphql)?.shortcode_media);

  const graphqlRoot = asRecord(payloadObj.graphql);
  push(graphqlRoot?.shortcode_media);

  push(payloadObj.shortcode_media);
  push(payloadObj.item);
  push(payloadObj.items);
  const props = asRecord(payloadObj.props);
  if (props?.pageProps) {
    push(props.pageProps);
  }

  const dataObj = asRecord(payloadObj.data);
  if (dataObj) {
    push(dataObj.shortcode_media);
    push(dataObj.items);
    push(dataObj.media);
    push(dataObj.xdt_shortcode_media);
    const xdtWebInfo = asRecord(dataObj['xdt_api__v1__media__shortcode__web_info']);
    if (xdtWebInfo) {
      push(xdtWebInfo);
      if (Array.isArray(xdtWebInfo.items)) {
        (xdtWebInfo.items as unknown[]).forEach((item) => push(item));
      }
    }
  }

  const xdtMedia = asRecord(payloadObj.xdt_shortcode_media);
  if (xdtMedia) {
    push(xdtMedia);
  }

  if (!roots.length) {
    walkInstagramPayload(payload, media, seen);
    return;
  }

  for (const root of roots) {
    walkInstagramPayload(root, media, seen);
  }
}

function walkInstagramPayload(node: unknown, media: InstagramMediaItem[], seen: Set<string>, visited = new WeakSet<object>()) {
  if (!node) {
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((item) => walkInstagramPayload(item, media, seen, visited));
    return;
  }

  if (typeof node !== 'object') {
    return;
  }

  if (visited.has(node as object)) {
    return;
  }
  visited.add(node as object);

  const obj = node as Record<string, unknown>;

  const simpleUrlFields: Array<{ key: string; fallbackType: 'image' | 'video' }> = [
    { key: 'video_url', fallbackType: 'video' },
    { key: 'videoUrl', fallbackType: 'video' },
    { key: 'display_url', fallbackType: 'image' },
    { key: 'display_src', fallbackType: 'image' },
    { key: 'thumbnail_src', fallbackType: 'image' },
    { key: 'thumbnail_url', fallbackType: 'image' },
    { key: 'src', fallbackType: 'image' },
  ];

  for (const { key, fallbackType } of simpleUrlFields) {
    const value = obj[key];
    if (typeof value === 'string') {
      pushMedia(media, seen, value, fallbackType);
    }
  }

  const imageVersionCandidates =
    (obj.image_versions2 as { candidates?: unknown })?.candidates &&
    Array.isArray((obj.image_versions2 as { candidates?: unknown }).candidates)
      ? (obj.image_versions2 as { candidates: unknown[] }).candidates
      : undefined;

  if (Array.isArray(imageVersionCandidates)) {
    imageVersionCandidates.forEach((item) => {
      if (item && typeof item === 'object' && typeof (item as { url?: unknown }).url === 'string') {
        pushMedia(media, seen, (item as { url: string }).url, 'image');
      }
    });
  }

  if (Array.isArray(obj.video_versions as unknown)) {
    (obj.video_versions as unknown[]).forEach((item) => {
      if (item && typeof item === 'object' && typeof (item as { url?: unknown }).url === 'string') {
        pushMedia(media, seen, (item as { url: string }).url, 'video');
      }
    });
  }

  if (Array.isArray(obj.display_resources as unknown)) {
    (obj.display_resources as unknown[]).forEach((item) => {
      if (item && typeof item === 'object') {
        const candidate = item as { src?: unknown; srcset?: unknown; url?: unknown };
        if (typeof candidate.src === 'string') {
          pushMedia(media, seen, candidate.src, 'image');
        }
        if (typeof candidate.url === 'string') {
          pushMedia(media, seen, candidate.url, 'image');
        }
      }
    });
  }

  if (Array.isArray(obj.carousel_media as unknown)) {
    (obj.carousel_media as unknown[]).forEach((item) => walkInstagramPayload(item, media, seen, visited));
  }

  if (
    obj.edge_sidecar_to_children &&
    typeof obj.edge_sidecar_to_children === 'object' &&
    obj.edge_sidecar_to_children !== null
  ) {
    const sidecar = obj.edge_sidecar_to_children as { edges?: unknown };
    if (Array.isArray(sidecar.edges)) {
      sidecar.edges.forEach((edge) => {
        if (edge && typeof edge === 'object' && (edge as { node?: unknown }).node) {
          walkInstagramPayload((edge as { node?: unknown }).node, media, seen, visited);
        }
      });
    }
  }

  if (obj.shortcode_media && typeof obj.shortcode_media === 'object' && obj.shortcode_media !== null) {
    walkInstagramPayload(obj.shortcode_media, media, seen, visited);
  }

  if (obj.graphql && typeof obj.graphql === 'object' && obj.graphql !== null) {
    walkInstagramPayload((obj.graphql as { shortcode_media?: unknown }).shortcode_media, media, seen, visited);
  }

  const recursiveKeys = new Set([
    'items',
    'media',
    'resources',
    'data',
    'entry_data',
    'graphql',
    'edges',
    'edge_sidecar_to_children',
    'node',
    'nodes',
    'item',
    'PostPage',
    'content',
    'xdt_shortcode_media',
    'xdt_api__v1__media__shortcode__web_info',
  ]);

  Object.entries(obj).forEach(([key, value]) => {
    if (!recursiveKeys.has(key)) {
      return;
    }

    if (value && typeof value === 'object') {
      walkInstagramPayload(value, media, seen, visited);
    }
  });
}

function collectMediaFromTextPayload(
  text: string,
  media: InstagramMediaItem[],
  seen: Set<string>
) {
  const scriptText = decodeEscapedUrl(text).trim();
  if (!scriptText) {
    return;
  }

  if (!/window\._sharedData|__additionalDataLoaded|shortcode_media|display_url|video_url|thumbnail_src|image_versions2|video_versions|graphql|xdt_shortcode_media|xdt_api__v1__media/i.test(scriptText)) {
    return;
  }

  const parsePayload = (rawJson: string) => {
    const parsed = parseJsonSafely(rawJson);
    if (parsed) {
      collectMediaFromPayload(parsed, media, seen);
    }
  };

  const addSharedDataPayload = (matchIndex: number) => {
    const start = scriptText.indexOf('{', matchIndex);
    if (start < 0) {
      return;
    }
    const candidate = extractBalancedJsonSegment(scriptText, start);
    if (candidate) {
      parsePayload(candidate);
    }
  };

  const sharedDataMarkers = [...scriptText.matchAll(/window\._sharedData\s*=/g), ...scriptText.matchAll(/window\.__additionalDataLoaded\(/g)];
  if (sharedDataMarkers.length > 0) {
    sharedDataMarkers.forEach((match) => {
      if (typeof match.index === 'number') {
        addSharedDataPayload(match.index + match[0].length - 1);
      }
    });
    return;
  }

  const shortcodeIndex = scriptText.indexOf('"shortcode_media"');
  if (shortcodeIndex >= 0) {
    const start = scriptText.indexOf('{', shortcodeIndex);
    const extracted = start >= 0 ? extractBalancedJsonSegment(scriptText, start) : null;
    if (extracted) {
      parsePayload(extracted);
      return;
    }
  }

  if ((scriptText.startsWith('{') || scriptText.startsWith('[')) && (scriptText.endsWith('}') || scriptText.endsWith(']'))) {
    parsePayload(scriptText);
  }

  const jsonFieldMatches = scriptText.matchAll(
    /"(video_url|videoUrl|display_url|display_src|thumbnail_src|thumbnail_url|src)"\s*:\s*"(.*?)"/g
  );
  for (const match of Array.from(jsonFieldMatches)) {
    const value = match[2];
    if (typeof value === 'string') {
      pushMedia(media, seen, decodeEscapedUrl(value), match[1].startsWith('video') ? 'video' : 'image');
    }
  }
}

function extractMediaFromScripts(html: string, media: InstagramMediaItem[], seen: Set<string>) {
  const $ = load(html);

  $('script').each((_index, element) => {
    const scriptText = $(element).text().trim();
    if (!scriptText) {
      return;
    }

    collectMediaFromTextPayload(scriptText, media, seen);
  });
}

function extractMediaFromApplicationJson(html: string, media: InstagramMediaItem[], seen: Set<string>) {
  const $ = load(html);
  $('script[type="application/json"]').each((_index, element) => {
    const scriptText = $(element).text().trim();
    if (!scriptText) {
      return;
    }

    const parsed = parseJsonSafely(scriptText);
    if (parsed) {
      collectMediaFromPayload(parsed, media, seen);
    }
  });
}

function extractFromMetaTags(html: string, media: InstagramMediaItem[], seen: Set<string>) {
  const $ = load(html);

  const videoCandidates = [
    $('meta[property="og:video"]').attr('content'),
    $('meta[property="og:video:secure_url"]').attr('content'),
    $('meta[name="twitter:player:stream"]').attr('content'),
  ];

  const imageCandidates = [
    $('meta[property="og:image"]').attr('content'),
    $('meta[property="og:image:secure_url"]').attr('content'),
    $('meta[name="twitter:image"]').attr('content'),
  ];

  videoCandidates.forEach((item) => pushMedia(media, seen, item, 'video'));
  imageCandidates.forEach((item) => pushMedia(media, seen, item, 'image'));
}

function extractMediaFromHtml(html: string): InstagramMediaItem[] {
  const media: InstagramMediaItem[] = [];
  const seen = new Set<string>();

  extractMediaFromApplicationJson(html, media, seen);
  extractMediaFromScripts(html, media, seen);
  if (!media.length) {
    extractFromMetaTags(html, media, seen);
  }

  return media;
}

function extractFromJsonEndpoint(targetUrl: string): Promise<InstagramParseResult> {
  return (async () => {
    const shortcode =
      targetUrl.match(/\/((?:p|reel|reels|tv))\/([A-Za-z0-9_-]+)\/?$/)?.[2] ?? '';

    const candidates = [
      `${targetUrl}?__a=1&__d=dis`,
      `${targetUrl}?__a=1&__d=1`,
      `${targetUrl.replace(/\/$/, '')}/?__a=1&__d=1`,
    ];

    if (shortcode) {
      candidates.push(
        `https://www.instagram.com/api/v1/media/shortcode/${shortcode}/info/`,
        `https://www.instagram.com/api/v1/media/shortcode/${shortcode}/info/?__a=1&__d=dis`,
        `https://i.instagram.com/api/v1/media/${shortcode}/info/`
      );
    }

    const seen = new Set<string>();
    const media: InstagramMediaItem[] = [];

    for (const candidateUrl of new Set(candidates.filter(Boolean))) {
      const response = await axios.get<string>(candidateUrl, {
        headers: {
          ...REQUEST_HEADERS,
          Accept: 'application/json,text/plain,*/*',
          'X-IG-App-ID': '936619743392459',
          'X-Requested-With': 'XMLHttpRequest',
        },
        timeout: REQUEST_TIMEOUT_MS,
        validateStatus: () => true,
        maxRedirects: 2,
      });

      const status = response.status;
      const html = String(response.data ?? '');

      if (status === 403 || status === 401) {
        if (isExplicitPrivateResponse(status, html)) {
          return { media: [], statusHint: 'private' };
        }
        continue;
      }

      if (status === 404) {
        continue;
      }

      if (status >= 400) {
        continue;
      }

      const isHtml = /text\/html/i.test(response.headers['content-type'] ?? '');
      if (isHtml) {
        const htmlMedia = extractMediaFromHtml(html);
        htmlMedia.forEach((item) => pushMedia(media, seen, item.url, item.type));
        if (media.length) {
          return { media, statusHint: 'ok' };
        }
        continue;
      }

      const parsed = parseJsonSafely(html);
      if (!parsed) {
        continue;
      }

      collectMediaFromPayload(parsed, media, seen);

      if (media.length) {
        return { media, statusHint: 'ok' };
      }

      const extraPayload =
        parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
      if (extraPayload?.items && Array.isArray(extraPayload.items)) {
        collectMediaFromPayload(extraPayload.items, media, seen);
      }

      if (media.length) {
        return { media, statusHint: 'ok' };
      }
    }

    return { media, statusHint: 'ok' };
  })();
}

function extractFromDirectEndpoint(shortcode: string, postType: 'p' | 'reel' | 'tv' | 'unknown'): Promise<InstagramMediaItem[]> {
  return (async () => {
    const seen = new Set<string>();
    const media: InstagramMediaItem[] = [];

    if (!shortcode) {
      return media;
    }

    const basePath = postType === 'reel' || postType === 'tv' ? 'reel' : 'p';
    const directUrl = `https://www.instagram.com/${basePath}/${shortcode}/media/?size=l`;

    const response = await axios.get<string>(directUrl, {
      headers: {
        ...REQUEST_HEADERS,
        Referer: 'https://www.instagram.com/',
      },
      timeout: REQUEST_TIMEOUT_MS,
      maxRedirects: 0,
      validateStatus: () => true,
    });

    if (response.status >= 300 && response.status < 400) {
      const redirectUrl =
        typeof response.headers.location === 'string'
          ? decodeEscapedUrl(response.headers.location)
          : undefined;
      if (redirectUrl) {
        pushMedia(media, seen, redirectUrl, isLikelyVideo(redirectUrl) ? 'video' : 'image');
      }
      return media;
    }

    if (response.status >= 400) {
      return media;
    }

    const html = String(response.data ?? '');
    const $ = load(html);

    pushMedia(
      media,
      seen,
      $('meta[property="og:video"]').attr('content') || $('meta[name="twitter:player:stream"]').attr('content'),
      'video'
    );
    pushMedia(media, seen, $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content'), 'image');

    return media;
  })();
}

function extractFromEmbedPage(targetUrl: string): Promise<InstagramParseResult> {
  return (async () => {
    const media: InstagramMediaItem[] = [];
    const seen = new Set<string>();

    const cleanPath = (() => {
      const parsed = new URL(targetUrl);
      return parsed.pathname.replace(/\/$/, '');
    })();

    const embedUrl = `https://www.instagram.com${cleanPath}/embed/captioned/`;

    const response = await axios.get<string>(embedUrl, {
      headers: {
        ...EMBED_REQUEST_HEADERS,
        Referer: 'https://www.instagram.com/',
      },
      timeout: REQUEST_TIMEOUT_MS,
      validateStatus: () => true,
    });

    if (response.status === 404) {
      return { media: [], statusHint: 'not_found' };
    }

    if (response.status === 403 || response.status === 401) {
      const html = String(response.data ?? '');
      if (isExplicitPrivateResponse(response.status, html)) {
        return { media: [], statusHint: 'private' };
      }
      return { media: [], statusHint: 'ok' };
    }

    if (response.status >= 400 || !response.data) {
      return { media: [], statusHint: 'ok' };
    }

    const html = String(response.data);

    extractFromMetaTags(html, media, seen);
    extractMediaFromApplicationJson(html, media, seen);

    const $ = load(html);
    $('video source, video').each((_index, element) => {
      pushMedia(media, seen, $(element).attr('src'), 'video');
      pushMedia(media, seen, $(element).attr('poster'), 'image');
    });

    $('.EmbeddedMediaImage').each((_index, element) => {
      pushMedia(media, seen, $(element).attr('src'), 'image');
    });

    $('[data-video-url]').each((_index, element) => {
      pushMedia(media, seen, $(element).attr('data-video-url'), 'video');
    });

    $('img').each((_index, element) => {
      const src = $(element).attr('src');
      if (src && INSTAGRAM_MEDIA_HOST.test(src) && !isStaticAsset(src)) {
        pushMedia(media, seen, src, 'image');
      }
    });

    $('script').each((_index, element) => {
      const scriptText = $(element).text().trim();
      if (!scriptText) {
        return;
      }
      if (!/shortcode_media|edge_sidecar_to_children|display_url|video_url|thumbnail_src|image_versions2|video_versions|graphql|items|media|xdt_shortcode_media/i.test(scriptText)) {
        return;
      }
      collectMediaFromTextPayload(scriptText, media, seen);
    });

    return { media, statusHint: media.length ? 'ok' : 'ok' };
  })();
}

async function extractFromGraphQL(shortcode: string): Promise<InstagramParseResult> {
  if (!shortcode) {
    return { media: [], statusHint: 'ok' };
  }

  const seen = new Set<string>();
  const media: InstagramMediaItem[] = [];

  const docIds = [
    '8845758582119845',
    '9510064595728286',
    '17891268684764369',
  ];

  for (const docId of docIds) {
    try {
      const response = await axios.post(
        'https://www.instagram.com/graphql/query/',
        new URLSearchParams({
          variables: JSON.stringify({
            shortcode,
            fetch_tagged_user_count: null,
            hoisted_comment_id: null,
            hoisted_reply_id: null,
          }),
          doc_id: docId,
        }).toString(),
        {
          headers: {
            'User-Agent': REQUEST_HEADERS['User-Agent'],
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-IG-App-ID': '936619743392459',
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': 'missing',
            Referer: 'https://www.instagram.com/',
            Origin: 'https://www.instagram.com',
            Accept: '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          timeout: REQUEST_TIMEOUT_MS,
          validateStatus: () => true,
        }
      );

      if (response.status === 401 || response.status === 403) {
        const body =
          typeof response.data === 'string'
            ? response.data
            : JSON.stringify(response.data ?? {});

        if (isExplicitPrivateResponse(response.status, body)) {
          return { media: [], statusHint: 'private' };
        }

        continue;
      }

      if (response.status >= 400) {
        continue;
      }

      const responseData =
        typeof response.data === 'string'
          ? parseJsonSafely(response.data)
          : response.data;

      if (!responseData) {
        continue;
      }

      collectMediaFromPayload(responseData, media, seen);

      const root = asRecord(responseData);
      const data = root ? asRecord(root.data) : null;
      if (data) {
        const xdtMedia = data.xdt_shortcode_media ?? data.shortcode_media;
        if (xdtMedia && typeof xdtMedia === 'object') {
          walkInstagramPayload(xdtMedia, media, seen);
        }
      }

      if (media.length) {
        return { media, statusHint: 'ok' };
      }
    } catch {
      continue;
    }
  }

  return { media, statusHint: 'ok' };
}

async function extractFromOEmbed(targetUrl: string): Promise<InstagramParseResult> {
  const media: InstagramMediaItem[] = [];
  const seen = new Set<string>();

  try {
    const response = await axios.get(
      `https://www.instagram.com/api/v1/oembed/?url=${encodeURIComponent(targetUrl)}`,
      {
        headers: REQUEST_HEADERS,
        timeout: REQUEST_TIMEOUT_MS,
        validateStatus: () => true,
      }
    );

    if (response.status >= 400 || !response.data) {
      return {
        media: [],
        statusHint: response.status === 404 ? 'not_found' : 'ok',
      };
    }

    const data =
      typeof response.data === 'string'
        ? parseJsonSafely(response.data)
        : response.data;

    const obj = asRecord(data);
    if (!obj) {
      return { media: [], statusHint: 'ok' };
    }

    if (typeof obj.thumbnail_url === 'string') {
      pushMedia(media, seen, obj.thumbnail_url, 'image');
    }

    if (typeof obj.html === 'string') {
      const $ = load(obj.html as string);
      $('img').each((_i, el) => pushMedia(media, seen, $(el).attr('src'), 'image'));
      $('video').each((_i, el) => pushMedia(media, seen, $(el).attr('src'), 'video'));
    }
  } catch {
    // oEmbed is a best-effort fallback
  }

  return { media, statusHint: 'ok' };
}

function prioritizeMedia(media: InstagramMediaItem[]): InstagramMediaItem[] {
  const videos = media.filter((item) => item.type === 'video');
  const images = media.filter((item) => item.type === 'image');

  return [...videos, ...images];
}

function getPostType(incomingUrl: string): 'p' | 'reel' | 'tv' | 'unknown' {
  try {
    const parsed = new URL(incomingUrl);
    const first = parsed.pathname.split('/').filter(Boolean)[0] as
      | 'p'
      | 'reel'
      | 'reels'
      | 'tv'
      | undefined;

    if (first === 'p') {
      return 'p';
    }
    if (first === 'reel' || first === 'reels') {
      return 'reel';
    }
    if (first === 'tv') {
      return 'tv';
    }
  } catch {
    // Ignore invalid urls.
  }

  return 'unknown';
}

function extractShortcode(incomingUrl: string): string | null {
  try {
    const parsed = new URL(incomingUrl);
    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const section = parts[0];
      const possible = parts[1];
      if (['p', 'reel', 'reels', 'tv'].includes(section) && /^[A-Za-z0-9_-]+$/.test(possible)) {
        return possible;
      }
    }
  } catch {
    // Ignore invalid urls.
  }

  return null;
}

async function fetchInstagramHtml(targetUrl: string): Promise<AxiosResponse<string>> {
  return axios.get<string>(targetUrl, {
    headers: {
      ...REQUEST_HEADERS,
      Referer: 'https://www.instagram.com/',
    },
    timeout: REQUEST_TIMEOUT_MS,
    validateStatus: () => true,
    maxRedirects: 3,
  });
}

export async function POST(request: NextRequest) {
  let payload: InstagramDownloadRequest;

  try {
    payload = (await request.json()) as InstagramDownloadRequest;
  } catch {
    return errorResponse('Invalid request payload.', 400);
  }

  const incomingUrl = payload.url?.trim() ?? '';
  if (!isValidInstagramPostUrl(incomingUrl)) {
    return errorResponse('Invalid URL.', 400);
  }

  const targetUrl = normalizeInstagramPostUrl(incomingUrl);
  const postType = getPostType(incomingUrl);
  const shortcode = extractShortcode(incomingUrl);

  try {
    const htmlResponse = await fetchInstagramHtml(targetUrl);
    const html = String(htmlResponse.data ?? '');
    const initialLoadReturned404 = htmlResponse.status === 404;

    if (isExplicitPrivateResponse(htmlResponse.status, html) || hasPostPrivateMarker(html)) {
      return errorResponse('Private Instagram post.', 403);
    }

    const pageMedia = extractMediaFromHtml(html);

    if (pageMedia.length) {
      return NextResponse.json({ media: prioritizeMedia(pageMedia) });
    }

    if (shortcode) {
      const graphqlResult = await extractFromGraphQL(shortcode);

      if (graphqlResult.statusHint === 'private') {
        return errorResponse('Private Instagram post.', 403);
      }

      if (graphqlResult.media.length) {
        return NextResponse.json({ media: prioritizeMedia(graphqlResult.media) });
      }
    }

    const jsonEndpointResult = await extractFromJsonEndpoint(targetUrl);

    if (jsonEndpointResult.statusHint === 'private') {
      return errorResponse('Private Instagram post.', 403);
    }

    if (jsonEndpointResult.media.length) {
      return NextResponse.json({ media: prioritizeMedia(jsonEndpointResult.media) });
    }

    const embedResult = await extractFromEmbedPage(targetUrl);

    if (embedResult.statusHint === 'private') {
      return errorResponse('Private Instagram post.', 403);
    }

    if (embedResult.media.length) {
      return NextResponse.json({ media: prioritizeMedia(embedResult.media) });
    }

    if (shortcode) {
      const directMedia = await extractFromDirectEndpoint(shortcode, postType);
      if (directMedia.length) {
        return NextResponse.json({ media: prioritizeMedia(directMedia) });
      }
    }

    const oembedResult = await extractFromOEmbed(targetUrl);
    if (oembedResult.media.length) {
      return NextResponse.json({ media: prioritizeMedia(oembedResult.media) });
    }

    if (initialLoadReturned404) {
      return errorResponse('Post not found.', 404);
    }

    return errorResponse('Media not available.', 404);
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      return errorResponse('Instagram request timed out. Please try again.', 504);
    }

    return NextResponse.json(
      {
        error: 'API request failed.',
        details:
          error instanceof Error
            ? { message: error.message }
            : { message: 'Unknown server error' },
      },
      { status: 500 }
    );
  }
}
