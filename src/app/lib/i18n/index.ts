import { absoluteUrl } from '../site';

export const locales = ['en', 'hi', 'es', 'fr'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeInfo = {
  en: {
    dir: 'ltr',
    intl: 'en-US',
    nativeName: 'English',
    ogLocale: 'en_US',
    shortLabel: 'EN',
  },
  hi: {
    dir: 'ltr',
    intl: 'hi-IN',
    nativeName: 'हिन्दी',
    ogLocale: 'hi_IN',
    shortLabel: 'HI',
  },
  es: {
    dir: 'ltr',
    intl: 'es-ES',
    nativeName: 'Español',
    ogLocale: 'es_ES',
    shortLabel: 'ES',
  },
  fr: {
    dir: 'ltr',
    intl: 'fr-FR',
    nativeName: 'Français',
    ogLocale: 'fr_FR',
    shortLabel: 'FR',
  },
} as const satisfies Record<
  Locale,
  {
    dir: 'ltr' | 'rtl';
    intl: string;
    nativeName: string;
    ogLocale: string;
    shortLabel: string;
  }
>;

export function isSupportedLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalePath(locale: Locale, pathname = ''): string {
  if (!pathname || pathname === '/') {
    return `/${locale}`;
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/${locale}${normalizedPath}`;
}

export function localizePathname(pathname: string, locale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  if (!segments.length) {
    return `/${locale}`;
  }

  if (isSupportedLocale(segments[0])) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }

  return `/${segments.join('/')}`;
}

export function buildLocaleAlternates(pathname = ''): Record<string, string> {
  const localizedEntries = locales.map((locale) => [
    locale,
    absoluteUrl(getLocalePath(locale, pathname)),
  ]);

  return Object.fromEntries([
    ...localizedEntries,
    ['x-default', absoluteUrl(getLocalePath(defaultLocale, pathname))],
  ]);
}

export function detectPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter(Boolean);

  for (const candidate of candidates) {
    const baseLocale = candidate.split('-')[0];

    if (baseLocale && isSupportedLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return defaultLocale;
}

const englishDictionary = {
  metadata: {
    homeDescription:
      'Download public Instagram reels, posts, photos, and carousel media online. Paste a public link to preview and save the file. Also supports public URLs from YouTube, TikTok, Facebook, X, and Pinterest.',
    homeTitle: 'Instagram Downloader for Public Posts, Reels and Photos',
    proxyStatsDescription: 'Daily Webshare proxy usage for the downloader backend.',
    proxyStatsTitle: 'Proxy Stats',
  },
  header: {
    about: 'About',
    chromeExtension: 'Chrome Extension',
    contact: 'Contact',
    home: 'Home',
    languageMenu: 'Language',
    learnMore: 'Learn more',
  },
  hero: {
    aiAssist: {
      badge: 'AI Assist',
      inputChips: ['Tip', 'Paste full URL'],
      inputMessage:
        'Paste the full public post URL instead of usernames, captions, or copied text fragments so the downloader can validate and route it correctly.',
      inputTitle: 'Input needs more context',
      nativeExtractor: 'Native extractor',
      nativeMessage:
        'Instagram detected. The native extractor is ready to fetch public posts, reels, IGTV, and carousel media with the strongest fallback coverage.',
      previewFlow: 'Preview-first flow',
      recognizedSuffix: 'recognized',
      standbyChips: ['Instagram', 'TikTok', 'YouTube'],
      standbyMessage:
        'Paste any supported public link and the assistant will identify the platform, choose the matching extraction path, and prepare the cleanest download flow.',
      standbyTitle: 'AI assistant standby',
      universalExtractor: 'Universal extractor',
      universalMessage:
        'A supported platform was detected. The universal extractor will resolve the best downloadable public asset and hand it back to the preview grid.',
      unsupportedChips: ['Unsupported domain', 'Public links only'],
      unsupportedMessage:
        'This looks like a link, but the domain is not in the supported list yet. Use Instagram, YouTube, TikTok, Facebook, X, or Pinterest.',
      unsupportedTitle: 'AI assistant needs a supported platform',
    },
    aiSignals: [
      'AI URL reading',
      'Adaptive extractor routing',
      'Preview-first workflow',
    ],
    buttonDownload: 'Download',
    buttonLoading: 'Downloading...',
    errors: {
      fetchFailure: 'Unable to fetch media.',
      noMediaFound: 'No downloadable media was found for this URL.',
    },
    formats: ['Post', 'Reel', 'IGTV', 'Carousel'],
    inputPlaceholder: 'Paste link here!',
    moreOptions: 'More options',
    note: 'Use it. It is easy, fast and secure.',
    subtitle:
      'Paste the URL of insta video, photo, reels or IGTV link you want to download.',
    title: 'Paste Instagram URL here!',
    validations: {
      required: 'Paste a supported public media URL first.',
      unsupported:
        'Use a public Instagram, YouTube, TikTok, Facebook, X, or Pinterest link.',
    },
  },
  benefits: [
    {
      description:
        'Paste a public Instagram link, fetch the media, and keep the whole flow straightforward from input to download.',
      title: 'Easy Peasy',
    },
    {
      description:
        'The downloader is tuned for quick extraction, proxy-backed fetches, and immediate preview cards after a valid URL.',
      title: 'Super Fast',
    },
    {
      description:
        'Requests stay on the server, keeping the Instagram scraping logic and Webshare proxy credentials off the client.',
      title: 'Well Secure',
    },
  ],
  aiExperience: {
    cards: [
      {
        description:
          'The interface reacts to the pasted link, surfaces platform-aware cues, and helps the user feel guided before the request is sent.',
        title: 'Smart URL understanding',
      },
      {
        description:
          'Instagram links lean into the native extractor path while the other supported providers flow through the universal resolver.',
        title: 'Adaptive routing hints',
      },
      {
        description:
          'Users get clearer expectations, better helper text, and a more intentional path from paste to download.',
        title: 'Guided confidence',
      },
    ],
    description:
      'The site now behaves more like a download copilot: it reads the link, signals the extraction path, and adds a smarter visual rhythm before the media cards appear.',
    eyebrow: 'AI Experience Layer',
    title: 'More assistant. Less plain downloader.',
  },
  spotlight: [
    {
      description:
        'Download clean full-size public photo posts with the same single-link flow. Preview the asset first, then save it directly from the results card.',
      eyebrow: 'Photo saver',
      learnMore: 'Learn more',
      title: 'Instagram photo download',
    },
    {
      description:
        'Reels and other video posts keep the same streamlined workflow, with a preview player, direct download button, and server-side media fetch path.',
      eyebrow: 'Reel saver',
      learnMore: 'Learn more',
      title: 'Instagram reel download',
    },
  ],
  mockCard: {
    likedBy: 'Liked by Yen and 127 others',
    location: 'New Delhi, India',
    photoCaption: 'Lazy Weekend',
    photoPreviewLabel: 'Photo preview',
    previewDetected: 'Public media detected',
    previewReady: 'Preview Ready',
    reelCaption: 'Night ride stories',
    reelPreviewLabel: 'Video preview',
  },
  supportedPlatforms: {
    beta: 'Beta',
    eyebrow: 'Popular Websites',
    items: [
      {
        description:
          'Public post, reel, IGTV, and carousel downloads use the native extractor in the current build.',
      },
      {
        description:
          'Best-effort public URL support is wired through the universal extractor, but some posts may still fail upstream.',
      },
      {
        description:
          'Public video URLs are resolved through the universal extractor with direct-source download links.',
      },
      {
        description:
          'Public videos can be resolved through the same backend path used for the other beta platforms.',
      },
      {
        description:
          'Best-effort public media support is enabled, with results depending on what the extractor can resolve.',
      },
      {
        description:
          'Public image and media pages now flow through the universal extractor with HTML meta fallbacks.',
      },
    ],
    liveNow: 'Live now',
    openProxyStats: 'Open proxy stats',
    sectionDescription:
      'Instagram is the strongest integration right now, while the other providers are available in beta through the shared extractor flow.',
    title: 'Website support snapshot',
  },
  aboutSection: {
    eyebrow: 'About the downloader',
    title: 'Download Instagram videos in just two clicks',
    description:
      'Downloading videos from Instagram in just two clicks is possible without compromising on quality. Avoid using unreliable applications and appreciate the videos, even if they are of lower quality.',
    cards: [
      {
        title: 'Fast download',
        description:
          'Our servers are optimized to provide you with the fastest download speeds.',
      },
      {
        title: 'Support for all devices',
        description:
          "Whether you're on a mobile, tablet, or desktop, the downloader has got you covered.",
      },
      {
        title: 'High quality',
        description:
          'Download Instagram content in its original quality without any loss.',
      },
      {
        title: 'Security',
        description:
          'We prioritize your privacy. No login required and all downloads are processed securely.',
      },
    ],
  },
  contactSection: {
    eyebrow: 'Contact',
    title: 'Need help with a failed media link?',
    description:
      'Send the media URL, platform name, and a screenshot of the error if one appears. That gives enough context to reproduce most extraction issues quickly.',
    emailLabel: 'Support email',
    emailValue: 'support@igdown.io',
    primaryAction: 'Email support',
    secondaryAction: 'Open proxy stats',
    supportCoverageLabel: 'Coverage',
    supportCoverageValue:
      'Instagram native flow plus beta support for YouTube, TikTok, Facebook, X, and Pinterest.',
    supportCasesLabel: 'Best for',
    supportCasesValue:
      'Bug reports, blocked URLs, failed downloads, and extractor feedback.',
  },
  footer: {
    brandDescription:
      'AI-assisted public media downloader with server-side extraction, preview cards, and attachment-based downloads.',
    productTitle: 'Product',
    companyTitle: 'Company',
    supportTitle: 'Support',
    links: {
      about: 'About',
      betaPlatforms: 'Beta platforms',
      contact: 'Contact',
      downloader: 'Downloader',
      photoDownload: 'Photo download',
      proxyStats: 'Proxy stats',
      reelDownload: 'Reel download',
      supportedPlatforms: 'Supported platforms',
    },
    copyright: 'All rights reserved.',
  },
  proxyStats: {
    addApiKey:
      'Add WEBSHARE_API_KEY to your server environment and reload this page.',
    average: 'Average',
    averageRps: 'Average RPS',
    backToDownloader: 'Back to downloader',
    countryBreakdown: 'Country Breakdown',
    description:
      'This page calls the Webshare aggregate stats API on the server and shows one selected day of proxy usage for the downloader backend.',
    emptyCountry: 'No country usage recorded for this day.',
    emptyProtocol: 'No protocol usage recorded for this day.',
    eyebrow: 'Internal Usage',
    failed: 'failed',
    lastRequest: 'Last Request',
    loadStats: 'Load Stats',
    noRequestsRecorded: 'No requests recorded',
    perRequest: 'per request',
    protocolBreakdown: 'Protocol Breakdown',
    proxiesUsed: 'Proxies Used',
    queryWindow: 'Query window',
    rawTrafficNote:
      'Webshare counts raw proxy traffic. One user download in this app can create multiple proxy requests because the Instagram extractor tries fallback endpoints.',
    setApiKey: 'Set WEBSHARE_API_KEY on the server to enable this page.',
    statsUnavailable: 'Stats unavailable',
    succeeded: 'succeeded',
    title: 'Webshare proxy stats',
    to: 'to',
    totalBandwidth: 'Total Bandwidth',
    totalRequests: 'Total Requests',
    usageDate: 'Usage Date',
    window: 'Window',
  },
};

const dictionaries = {
  en: englishDictionary,
  hi: {
    metadata: {
      homeDescription:
        'Instagram, YouTube, TikTok, Facebook, X और Pinterest के सार्वजनिक लिंक के लिए मुफ्त ऑनलाइन मीडिया डाउनलोडर। समर्थित मीडिया URL पेस्ट करें और वीडियो या इमेज तुरंत डाउनलोड करें।',
      homeTitle: 'Instagram Downloader',
      proxyStatsDescription: 'डाउनलोडर बैकएंड के लिए दैनिक Webshare प्रॉक्सी उपयोग।',
      proxyStatsTitle: 'Proxy Stats',
    },
    header: {
      about: 'About',
      chromeExtension: 'Chrome Extension',
      contact: 'संपर्क',
      home: 'होम',
      languageMenu: 'भाषा',
      learnMore: 'और जानें',
    },
    hero: {
      aiAssist: {
        badge: 'AI Assist',
        inputChips: ['टिप', 'पूरा URL पेस्ट करें'],
        inputMessage:
          'यूज़रनेम, कैप्शन या टेक्स्ट के बजाय पूरा सार्वजनिक पोस्ट URL पेस्ट करें, ताकि डाउनलोडर उसे सही तरह से वैलिडेट और रूट कर सके।',
        inputTitle: 'इनपुट को थोड़ा और संदर्भ चाहिए',
        nativeExtractor: 'Native extractor',
        nativeMessage:
          'Instagram पहचाना गया। Native extractor अब सार्वजनिक पोस्ट, reels, IGTV और carousel मीडिया को मजबूत fallback कवरेज के साथ लाने के लिए तैयार है।',
        previewFlow: 'Preview-first flow',
        recognizedSuffix: 'पहचाना गया',
        standbyChips: ['Instagram', 'TikTok', 'YouTube'],
        standbyMessage:
          'कोई भी समर्थित सार्वजनिक लिंक पेस्ट करें। सहायक प्लेटफ़ॉर्म पहचानेगा, सही extraction path चुनेगा और सबसे साफ download flow तैयार करेगा।',
        standbyTitle: 'AI सहायक तैयार है',
        universalExtractor: 'Universal extractor',
        universalMessage:
          'समर्थित प्लेटफ़ॉर्म पहचाना गया। Universal extractor सबसे उपयुक्त सार्वजनिक डाउनलोड asset निकालकर preview grid में भेजेगा।',
        unsupportedChips: ['असमर्थित डोमेन', 'केवल सार्वजनिक लिंक'],
        unsupportedMessage:
          'यह लिंक जैसा दिखता है, लेकिन यह डोमेन अभी समर्थित सूची में नहीं है। Instagram, YouTube, TikTok, Facebook, X या Pinterest का उपयोग करें।',
        unsupportedTitle: 'AI सहायक को समर्थित प्लेटफ़ॉर्म चाहिए',
      },
      aiSignals: ['AI URL पढ़ना', 'स्मार्ट extractor routing', 'Preview-first workflow'],
      buttonDownload: 'डाउनलोड',
      buttonLoading: 'डाउनलोड हो रहा है...',
      errors: {
        fetchFailure: 'मीडिया लाया नहीं जा सका।',
        noMediaFound: 'इस URL के लिए कोई डाउनलोड योग्य मीडिया नहीं मिला।',
      },
      formats: ['पोस्ट', 'रील', 'IGTV', 'कैरोसेल'],
      inputPlaceholder: 'यहां लिंक पेस्ट करें!',
      moreOptions: 'और विकल्प',
      note: 'आसान, तेज़ और सुरक्षित।',
      subtitle:
        'जिस insta video, photo, reel या IGTV link को डाउनलोड करना है, उसका URL यहां पेस्ट करें।',
      title: 'Instagram URL यहां पेस्ट करें!',
      validations: {
        required: 'पहले कोई समर्थित सार्वजनिक मीडिया URL पेस्ट करें।',
        unsupported:
          'सार्वजनिक Instagram, YouTube, TikTok, Facebook, X या Pinterest लिंक का उपयोग करें।',
      },
    },
    benefits: [
      {
        description:
          'सार्वजनिक Instagram लिंक पेस्ट करें, मीडिया निकालें, और इनपुट से डाउनलोड तक पूरा फ्लो सीधा और सरल रखें।',
        title: 'बहुत आसान',
      },
      {
        description:
          'डाउनलोडर तेज extraction, proxy-backed fetches और वैध URL के बाद तुरंत preview cards के लिए tuned है।',
        title: 'सुपर फास्ट',
      },
      {
        description:
          'सभी रिक्वेस्ट सर्वर पर रहती हैं, जिससे Instagram scraping logic और Webshare proxy credentials क्लाइंट से दूर रहते हैं।',
        title: 'काफी सुरक्षित',
      },
    ],
    aiExperience: {
      cards: [
        {
          description:
            'इंटरफेस पेस्ट किए गए लिंक पर तुरंत प्रतिक्रिया देता है, प्लेटफ़ॉर्म-विशिष्ट संकेत दिखाता है और रिक्वेस्ट भेजने से पहले यूज़र को गाइड करता है।',
          title: 'स्मार्ट URL समझ',
        },
        {
          description:
            'Instagram लिंक native extractor path लेते हैं, जबकि दूसरे समर्थित प्लेटफ़ॉर्म universal resolver से गुजरते हैं।',
          title: 'एडैप्टिव routing संकेत',
        },
        {
          description:
            'यूज़र को अधिक स्पष्ट अपेक्षाएं, बेहतर helper text और पेस्ट से डाउनलोड तक अधिक भरोसेमंद अनुभव मिलता है।',
          title: 'मार्गदर्शित भरोसा',
        },
      ],
      description:
        'साइट अब एक download copilot की तरह व्यवहार करती है: यह लिंक पढ़ती है, extraction path बताती है और मीडिया कार्ड आने से पहले एक स्मार्ट visual rhythm देती है।',
      eyebrow: 'AI अनुभव लेयर',
      title: 'ज़्यादा सहायक। कम साधारण downloader.',
    },
    spotlight: [
      {
        description:
          'उसी single-link flow के साथ साफ full-size public photo posts डाउनलोड करें। पहले asset preview करें, फिर result card से सीधे save करें।',
        eyebrow: 'Photo saver',
        learnMore: 'और जानें',
        title: 'Instagram photo download',
      },
      {
        description:
          'Reels और दूसरे video posts के लिए भी यही streamlined workflow है, जिसमें preview player, direct download button और server-side media fetch path शामिल है।',
        eyebrow: 'Reel saver',
        learnMore: 'और जानें',
        title: 'Instagram reel download',
      },
    ],
    mockCard: {
      likedBy: 'Yen और 127 अन्य लोगों ने पसंद किया',
      location: 'New Delhi, India',
      photoCaption: 'Lazy Weekend',
      photoPreviewLabel: 'Photo preview',
      previewDetected: 'पब्लिक मीडिया मिला',
      previewReady: 'Preview Ready',
      reelCaption: 'Night ride stories',
      reelPreviewLabel: 'Video preview',
    },
    supportedPlatforms: {
      beta: 'बीटा',
      eyebrow: 'लोकप्रिय वेबसाइटें',
      items: [
        {
          description:
            'सार्वजनिक post, reel, IGTV और carousel downloads मौजूदा build में native extractor का उपयोग करते हैं।',
        },
        {
          description:
            'Public URL के लिए best-effort support universal extractor से जुड़ा है, लेकिन कुछ posts अभी भी upstream पर fail हो सकते हैं।',
        },
        {
          description:
            'Public video URLs universal extractor के माध्यम से direct-source download links में resolve होते हैं।',
        },
        {
          description:
            'Public videos को वही backend path resolve करता है जो दूसरे beta platforms के लिए उपयोग होता है।',
        },
        {
          description:
            'Best-effort public media support सक्षम है, लेकिन नतीजे extractor की resolve क्षमता पर निर्भर करते हैं।',
        },
        {
          description:
            'Public image और media pages अब universal extractor और HTML meta fallbacks के साथ चलते हैं।',
        },
      ],
      liveNow: 'लाइव',
      openProxyStats: 'प्रॉक्सी स्टैट्स खोलें',
      sectionDescription:
        'अभी Instagram सबसे मजबूत integration है, जबकि दूसरे providers shared extractor flow के जरिए beta में उपलब्ध हैं।',
      title: 'वेबसाइट सपोर्ट स्नैपशॉट',
    },
    aboutSection: englishDictionary.aboutSection,
    contactSection: {
      ...englishDictionary.contactSection,
      eyebrow: 'संपर्क',
      title: 'किसी media link पर दिक्कत आ रही है?',
      primaryAction: 'ईमेल करें',
      secondaryAction: 'प्रॉक्सी स्टैट्स खोलें',
    },
    footer: {
      ...englishDictionary.footer,
      companyTitle: 'कंपनी',
      productTitle: 'प्रोडक्ट',
      supportTitle: 'सपोर्ट',
      links: {
        ...englishDictionary.footer.links,
        contact: 'संपर्क',
      },
    },
    proxyStats: {
      addApiKey:
        'अपने server environment में WEBSHARE_API_KEY जोड़ें और यह पेज फिर से लोड करें।',
      average: 'औसत',
      averageRps: 'औसत RPS',
      backToDownloader: 'डाउनलोडर पर वापस जाएं',
      countryBreakdown: 'देश ब्रेकडाउन',
      description:
        'यह पेज server पर Webshare aggregate stats API को कॉल करता है और डाउनलोडर बैकएंड के लिए चुने गए एक दिन का proxy usage दिखाता है।',
      emptyCountry: 'इस दिन के लिए कोई country usage दर्ज नहीं है।',
      emptyProtocol: 'इस दिन के लिए कोई protocol usage दर्ज नहीं है।',
      eyebrow: 'आंतरिक उपयोग',
      failed: 'विफल',
      lastRequest: 'अंतिम रिक्वेस्ट',
      loadStats: 'स्टैट्स लोड करें',
      noRequestsRecorded: 'कोई रिक्वेस्ट दर्ज नहीं है',
      perRequest: 'प्रति रिक्वेस्ट',
      protocolBreakdown: 'प्रोटोकॉल ब्रेकडाउन',
      proxiesUsed: 'उपयोग किए गए प्रॉक्सी',
      queryWindow: 'क्वेरी विंडो',
      rawTrafficNote:
        'Webshare raw proxy traffic गिनता है। इस ऐप में एक user download कई proxy requests बना सकता है क्योंकि Instagram extractor fallback endpoints आज़माता है।',
      setApiKey: 'इस पेज को सक्षम करने के लिए server पर WEBSHARE_API_KEY सेट करें।',
      statsUnavailable: 'स्टैट्स उपलब्ध नहीं हैं',
      succeeded: 'सफल',
      title: 'Webshare प्रॉक्सी स्टैट्स',
      to: 'से',
      totalBandwidth: 'कुल बैंडविड्थ',
      totalRequests: 'कुल रिक्वेस्ट',
      usageDate: 'उपयोग तिथि',
      window: 'विंडो',
    },
  },
  es: {
    metadata: {
      homeDescription:
        'Descargador de medios gratuito para enlaces publicos de Instagram, YouTube, TikTok, Facebook, X y Pinterest. Pega una URL compatible y descarga videos o imagenes al instante.',
      homeTitle: 'Instagram Downloader',
      proxyStatsDescription: 'Uso diario de proxy Webshare para el backend del descargador.',
      proxyStatsTitle: 'Estadisticas de Proxy',
    },
    header: {
      about: 'Acerca de',
      chromeExtension: 'Extension de Chrome',
      contact: 'Contacto',
      home: 'Inicio',
      languageMenu: 'Idioma',
      learnMore: 'Saber mas',
    },
    hero: {
      aiAssist: {
        badge: 'AI Assist',
        inputChips: ['Consejo', 'Pega la URL completa'],
        inputMessage:
          'Pega la URL publica completa de la publicacion en lugar de nombres de usuario, captions o fragmentos de texto para que el descargador pueda validarla y enrutarla correctamente.',
        inputTitle: 'La entrada necesita mas contexto',
        nativeExtractor: 'Extractor nativo',
        nativeMessage:
          'Instagram detectado. El extractor nativo esta listo para obtener publicaciones publicas, reels, IGTV y carruseles con la mejor cobertura de fallback.',
        previewFlow: 'Flujo con vista previa',
        recognizedSuffix: 'detectado',
        standbyChips: ['Instagram', 'TikTok', 'YouTube'],
        standbyMessage:
          'Pega cualquier enlace publico compatible y el asistente identificara la plataforma, elegira la ruta correcta de extraccion y preparara el flujo de descarga mas limpio.',
        standbyTitle: 'Asistente AI en espera',
        universalExtractor: 'Extractor universal',
        universalMessage:
          'Se detecto una plataforma compatible. El extractor universal resolvera el mejor recurso publico descargable y lo enviara a la cuadricula de vista previa.',
        unsupportedChips: ['Dominio no compatible', 'Solo enlaces publicos'],
        unsupportedMessage:
          'Esto parece un enlace, pero el dominio aun no esta en la lista compatible. Usa Instagram, YouTube, TikTok, Facebook, X o Pinterest.',
        unsupportedTitle: 'El asistente AI necesita una plataforma compatible',
      },
      aiSignals: [
        'Lectura AI de URL',
        'Ruteo extractor adaptable',
        'Flujo con vista previa',
      ],
      buttonDownload: 'Descargar',
      buttonLoading: 'Descargando...',
      errors: {
        fetchFailure: 'No se pudo obtener el medio.',
        noMediaFound: 'No se encontro contenido descargable para esta URL.',
      },
      formats: ['Post', 'Reel', 'IGTV', 'Carrusel'],
      inputPlaceholder: 'Pega aqui el enlace',
      moreOptions: 'Mas opciones',
      note: 'Es facil, rapido y seguro.',
      subtitle:
        'Pega la URL del video, foto, reel o enlace IGTV de Instagram que quieres descargar.',
      title: 'Pega aqui la URL de Instagram',
      validations: {
        required: 'Primero pega una URL publica compatible.',
        unsupported:
          'Usa un enlace publico de Instagram, YouTube, TikTok, Facebook, X o Pinterest.',
      },
    },
    benefits: [
      {
        description:
          'Pega un enlace publico de Instagram, obtén el medio y mantén todo el flujo simple desde la entrada hasta la descarga.',
        title: 'Muy facil',
      },
      {
        description:
          'El descargador esta afinado para extraccion rapida, fetches con proxy y tarjetas de vista previa inmediatas despues de una URL valida.',
        title: 'Super rapido',
      },
      {
        description:
          'Las solicitudes permanecen en el servidor, manteniendo la logica de scraping de Instagram y las credenciales de Webshare fuera del cliente.',
        title: 'Bien seguro',
      },
    ],
    aiExperience: {
      cards: [
        {
          description:
            'La interfaz reacciona al enlace pegado, muestra pistas segun la plataforma y hace que el usuario se sienta guiado antes de enviar la solicitud.',
          title: 'Comprension inteligente de URL',
        },
        {
          description:
            'Los enlaces de Instagram usan la ruta nativa, mientras que las otras plataformas compatibles pasan por el resolvedor universal.',
          title: 'Pistas de ruteo adaptativo',
        },
        {
          description:
            'Los usuarios reciben expectativas mas claras, mejor texto de ayuda y un recorrido mas intencional desde pegar hasta descargar.',
          title: 'Confianza guiada',
        },
      ],
      description:
        'El sitio ahora se comporta mas como un copiloto de descarga: lee el enlace, muestra la ruta de extraccion y agrega un ritmo visual mas inteligente antes de que aparezcan las tarjetas.',
      eyebrow: 'Capa de experiencia AI',
      title: 'Mas asistente. Menos descargador plano.',
    },
    spotlight: [
      {
        description:
          'Descarga publicaciones publicas de foto en tamano completo con el mismo flujo de un solo enlace. Primero previsualiza el recurso y luego guardalo desde la tarjeta de resultado.',
        eyebrow: 'Guardado de fotos',
        learnMore: 'Saber mas',
        title: 'Descarga de fotos de Instagram',
      },
      {
        description:
          'Los reels y otros videos mantienen el mismo flujo agil, con reproductor de vista previa, boton de descarga directa y ruta de fetch del servidor.',
        eyebrow: 'Guardado de reels',
        learnMore: 'Saber mas',
        title: 'Descarga de reels de Instagram',
      },
    ],
    mockCard: {
      likedBy: 'Le gusta a Yen y a otras 127 personas',
      location: 'New Delhi, India',
      photoCaption: 'Fin de semana tranquilo',
      photoPreviewLabel: 'Vista previa de foto',
      previewDetected: 'Medio publico detectado',
      previewReady: 'Vista previa lista',
      reelCaption: 'Historias nocturnas',
      reelPreviewLabel: 'Vista previa de video',
    },
    supportedPlatforms: {
      beta: 'Beta',
      eyebrow: 'Sitios populares',
      items: [
        {
          description:
            'Las descargas publicas de post, reel, IGTV y carrusel usan el extractor nativo en la compilacion actual.',
        },
        {
          description:
            'El soporte best-effort para URLs publicas esta conectado al extractor universal, aunque algunas publicaciones aun pueden fallar aguas arriba.',
        },
        {
          description:
            'Las URLs publicas de video se resuelven con el extractor universal y enlaces de descarga directos.',
        },
        {
          description:
            'Los videos publicos se pueden resolver con la misma ruta de backend usada para las otras plataformas beta.',
        },
        {
          description:
            'El soporte public best-effort esta activo, con resultados que dependen de lo que el extractor pueda resolver.',
        },
        {
          description:
            'Las paginas publicas de imagen y medios ahora pasan por el extractor universal con fallbacks de meta HTML.',
        },
      ],
      liveNow: 'Activo',
      openProxyStats: 'Abrir estadisticas de proxy',
      sectionDescription:
        'Instagram es hoy la integracion mas fuerte, mientras que los otros proveedores estan disponibles en beta a traves del flujo compartido del extractor.',
      title: 'Resumen de compatibilidad',
    },
    aboutSection: {
      ...englishDictionary.aboutSection,
      eyebrow: 'Acerca del descargador',
      title: 'Hecho para guardar medios publicos con rapidez',
    },
    contactSection: {
      ...englishDictionary.contactSection,
      eyebrow: 'Contacto',
      title: 'Necesitas ayuda con un enlace que fallo?',
      primaryAction: 'Enviar correo',
      secondaryAction: 'Abrir estadisticas de proxy',
      emailLabel: 'Correo de soporte',
      supportCoverageLabel: 'Cobertura',
      supportCasesLabel: 'Ideal para',
    },
    footer: {
      ...englishDictionary.footer,
      companyTitle: 'Empresa',
      productTitle: 'Producto',
      supportTitle: 'Soporte',
      links: {
        ...englishDictionary.footer.links,
        about: 'Acerca de',
        contact: 'Contacto',
        downloader: 'Descargador',
        photoDownload: 'Descarga de fotos',
        reelDownload: 'Descarga de reels',
        supportedPlatforms: 'Plataformas compatibles',
        proxyStats: 'Estadisticas de proxy',
        betaPlatforms: 'Plataformas beta',
      },
      copyright: 'Todos los derechos reservados.',
    },
    proxyStats: {
      addApiKey:
        'Agrega WEBSHARE_API_KEY al entorno del servidor y vuelve a cargar esta pagina.',
      average: 'Promedio',
      averageRps: 'RPS promedio',
      backToDownloader: 'Volver al descargador',
      countryBreakdown: 'Desglose por pais',
      description:
        'Esta pagina llama a la API aggregate stats de Webshare en el servidor y muestra un dia seleccionado de uso de proxy para el backend del descargador.',
      emptyCountry: 'No se registro uso por pais en este dia.',
      emptyProtocol: 'No se registro uso por protocolo en este dia.',
      eyebrow: 'Uso interno',
      failed: 'fallidas',
      lastRequest: 'Ultima solicitud',
      loadStats: 'Cargar estadisticas',
      noRequestsRecorded: 'No hay solicitudes registradas',
      perRequest: 'por solicitud',
      protocolBreakdown: 'Desglose por protocolo',
      proxiesUsed: 'Proxies usados',
      queryWindow: 'Ventana consultada',
      rawTrafficNote:
        'Webshare cuenta trafico proxy bruto. Una sola descarga del usuario en esta app puede crear multiples solicitudes proxy porque el extractor de Instagram prueba endpoints de fallback.',
      setApiKey: 'Configura WEBSHARE_API_KEY en el servidor para habilitar esta pagina.',
      statsUnavailable: 'Estadisticas no disponibles',
      succeeded: 'exitosas',
      title: 'Estadisticas del proxy Webshare',
      to: 'a',
      totalBandwidth: 'Ancho de banda total',
      totalRequests: 'Solicitudes totales',
      usageDate: 'Fecha de uso',
      window: 'Ventana',
    },
  },
  fr: {
    metadata: {
      homeDescription:
        'Telechargeur de medias gratuit pour les liens publics Instagram, YouTube, TikTok, Facebook, X et Pinterest. Collez une URL compatible et telechargez des videos ou images instantanement.',
      homeTitle: 'Instagram Downloader',
      proxyStatsDescription: 'Utilisation quotidienne du proxy Webshare pour le backend du telechargeur.',
      proxyStatsTitle: 'Statistiques Proxy',
    },
    header: {
      about: 'A propos',
      chromeExtension: 'Extension Chrome',
      contact: 'Contact',
      home: 'Accueil',
      languageMenu: 'Langue',
      learnMore: 'En savoir plus',
    },
    hero: {
      aiAssist: {
        badge: 'AI Assist',
        inputChips: ['Astuce', 'Collez l URL complete'],
        inputMessage:
          'Collez l URL publique complete de la publication au lieu de noms d utilisateur, de captions ou de fragments de texte pour que le telechargeur puisse la valider et l acheminer correctement.',
        inputTitle: 'L entree a besoin de plus de contexte',
        nativeExtractor: 'Extracteur natif',
        nativeMessage:
          'Instagram detecte. L extracteur natif est pret a recuperer les posts publics, reels, IGTV et carrousels avec la meilleure couverture de fallback.',
        previewFlow: 'Flux avec apercu',
        recognizedSuffix: 'detecte',
        standbyChips: ['Instagram', 'TikTok', 'YouTube'],
        standbyMessage:
          'Collez n importe quel lien public compatible et l assistant identifiera la plateforme, choisira le bon chemin d extraction et preparera le flux de telechargement le plus propre.',
        standbyTitle: 'Assistant AI en attente',
        universalExtractor: 'Extracteur universel',
        universalMessage:
          'Une plateforme compatible a ete detectee. L extracteur universel resoudra la meilleure ressource publique telechargeable et la renverra vers la grille d apercu.',
        unsupportedChips: ['Domaine non compatible', 'Liens publics uniquement'],
        unsupportedMessage:
          'Cela ressemble a un lien, mais le domaine n est pas encore dans la liste compatible. Utilisez Instagram, YouTube, TikTok, Facebook, X ou Pinterest.',
        unsupportedTitle: 'L assistant AI a besoin d une plateforme compatible',
      },
      aiSignals: [
        'Lecture AI d URL',
        'Routage d extracteur adaptatif',
        'Flux avec apercu',
      ],
      buttonDownload: 'Telecharger',
      buttonLoading: 'Telechargement...',
      errors: {
        fetchFailure: 'Impossible de recuperer le media.',
        noMediaFound: 'Aucun media telechargeable n a ete trouve pour cette URL.',
      },
      formats: ['Post', 'Reel', 'IGTV', 'Carrousel'],
      inputPlaceholder: 'Collez le lien ici',
      moreOptions: 'Plus d options',
      note: 'Simple, rapide et securise.',
      subtitle:
        'Collez l URL de la video, photo, reel ou lien IGTV Instagram que vous souhaitez telecharger.',
      title: 'Collez ici l URL Instagram',
      validations: {
        required: 'Collez d abord une URL publique compatible.',
        unsupported:
          'Utilisez un lien public Instagram, YouTube, TikTok, Facebook, X ou Pinterest.',
      },
    },
    benefits: [
      {
        description:
          'Collez un lien public Instagram, recuperez le media et gardez tout le flux simple, de l entree au telechargement.',
        title: 'Tres simple',
      },
      {
        description:
          'Le telechargeur est optimise pour une extraction rapide, des fetches via proxy et des cartes d apercu immediates apres une URL valide.',
        title: 'Super rapide',
      },
      {
        description:
          'Les requetes restent sur le serveur, ce qui garde la logique de scraping Instagram et les identifiants Webshare hors du client.',
        title: 'Bien securise',
      },
    ],
    aiExperience: {
      cards: [
        {
          description:
            'L interface reagit au lien colle, affiche des indices selon la plateforme et guide l utilisateur avant l envoi de la requete.',
          title: 'Compréhension intelligente des URL',
        },
        {
          description:
            'Les liens Instagram utilisent le chemin natif, tandis que les autres plateformes compatibles passent par le resolveur universel.',
          title: 'Indices de routage adaptatif',
        },
        {
          description:
            'Les utilisateurs obtiennent des attentes plus claires, un meilleur texte d aide et un parcours plus intentionnel du collage au telechargement.',
          title: 'Confiance guidee',
        },
      ],
      description:
        'Le site se comporte maintenant davantage comme un copilote de telechargement: il lit le lien, signale le chemin d extraction et ajoute un rythme visuel plus intelligent avant l apparition des cartes media.',
      eyebrow: 'Couche d experience AI',
      title: 'Plus assistant. Moins telechargeur banal.',
    },
    spotlight: [
      {
        description:
          'Telechargez des publications photo publiques en taille complete avec le meme flux a lien unique. Previsualisez d abord la ressource, puis enregistrez-la depuis la carte de resultat.',
        eyebrow: 'Sauvegarde photo',
        learnMore: 'En savoir plus',
        title: 'Telechargement photo Instagram',
      },
      {
        description:
          'Les reels et autres posts video gardent le meme flux fluide, avec lecteur d apercu, bouton de telechargement direct et chemin de recuperation cote serveur.',
        eyebrow: 'Sauvegarde reel',
        learnMore: 'En savoir plus',
        title: 'Telechargement reel Instagram',
      },
    ],
    mockCard: {
      likedBy: 'Aime par Yen et 127 autres personnes',
      location: 'New Delhi, India',
      photoCaption: 'Week-end paisible',
      photoPreviewLabel: 'Apercu photo',
      previewDetected: 'Media public detecte',
      previewReady: 'Apercu pret',
      reelCaption: 'Histoires de nuit',
      reelPreviewLabel: 'Apercu video',
    },
    supportedPlatforms: {
      beta: 'Beta',
      eyebrow: 'Sites populaires',
      items: [
        {
          description:
            'Les telechargements publics de post, reel, IGTV et carrousel utilisent l extracteur natif dans la version actuelle.',
        },
        {
          description:
            'Le support best-effort pour les URL publiques passe par l extracteur universel, mais certains posts peuvent encore echouer en amont.',
        },
        {
          description:
            'Les URL video publiques sont resolues via l extracteur universel avec des liens de telechargement directs.',
        },
        {
          description:
            'Les videos publiques peuvent etre resolues via le meme chemin backend que les autres plateformes beta.',
        },
        {
          description:
            'Le support public best-effort est actif, avec des resultats dependants de ce que l extracteur peut resoudre.',
        },
        {
          description:
            'Les pages publiques d image et de media passent maintenant par l extracteur universel avec des fallbacks meta HTML.',
        },
      ],
      liveNow: 'Actif',
      openProxyStats: 'Ouvrir les stats proxy',
      sectionDescription:
        'Instagram reste actuellement l integration la plus solide, tandis que les autres fournisseurs sont disponibles en beta via le flux partage de l extracteur.',
      title: 'Apercu de compatibilite',
    },
    aboutSection: {
      ...englishDictionary.aboutSection,
      eyebrow: 'A propos du telechargeur',
      title: 'Concu pour des sauvegardes rapides de medias publics',
    },
    contactSection: {
      ...englishDictionary.contactSection,
      eyebrow: 'Contact',
      title: 'Besoin d aide pour un lien media en echec ?',
      primaryAction: 'Envoyer un email',
      secondaryAction: 'Ouvrir les stats proxy',
      emailLabel: 'Email support',
      supportCoverageLabel: 'Couverture',
      supportCasesLabel: 'Ideal pour',
    },
    footer: {
      ...englishDictionary.footer,
      companyTitle: 'Entreprise',
      productTitle: 'Produit',
      supportTitle: 'Support',
      links: {
        ...englishDictionary.footer.links,
        about: 'A propos',
        downloader: 'Telechargeur',
        photoDownload: 'Telechargement photo',
        reelDownload: 'Telechargement reel',
        supportedPlatforms: 'Plateformes compatibles',
        betaPlatforms: 'Plateformes beta',
      },
      copyright: 'Tous droits reserves.',
    },
    proxyStats: {
      addApiKey:
        'Ajoutez WEBSHARE_API_KEY a l environnement serveur puis rechargez cette page.',
      average: 'Moyenne',
      averageRps: 'RPS moyen',
      backToDownloader: 'Retour au telechargeur',
      countryBreakdown: 'Repartition par pays',
      description:
        'Cette page appelle l API aggregate stats de Webshare sur le serveur et affiche une journee selectionnee d utilisation du proxy pour le backend du telechargeur.',
      emptyCountry: 'Aucune utilisation par pays enregistree pour cette journee.',
      emptyProtocol: 'Aucune utilisation par protocole enregistree pour cette journee.',
      eyebrow: 'Usage interne',
      failed: 'echouees',
      lastRequest: 'Derniere requete',
      loadStats: 'Charger les stats',
      noRequestsRecorded: 'Aucune requete enregistree',
      perRequest: 'par requete',
      protocolBreakdown: 'Repartition par protocole',
      proxiesUsed: 'Proxies utilises',
      queryWindow: 'Fenetre analysee',
      rawTrafficNote:
        'Webshare compte le trafic proxy brut. Un seul telechargement utilisateur dans cette application peut creer plusieurs requetes proxy car l extracteur Instagram essaie des endpoints de fallback.',
      setApiKey: 'Definissez WEBSHARE_API_KEY sur le serveur pour activer cette page.',
      statsUnavailable: 'Stats indisponibles',
      succeeded: 'reussies',
      title: 'Statistiques proxy Webshare',
      to: 'a',
      totalBandwidth: 'Bande passante totale',
      totalRequests: 'Requetes totales',
      usageDate: 'Date d usage',
      window: 'Fenetre',
    },
  },
} satisfies Record<Locale, typeof englishDictionary>;

export type TranslationDictionary = typeof englishDictionary;

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale];
}
