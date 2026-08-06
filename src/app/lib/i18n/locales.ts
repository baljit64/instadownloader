export const locales = [
  'en',
  'vi',
  'ar',
  'cs',
  'de',
  'es',
  'fr',
  'hi',
  'id',
  'it',
  'ja',
  'ko',
  'pl',
  'pt',
  'ro',
  'ru',
  'th',
  'tr',
  'uk',
  'zh-cn',
  'zh-tw',
  'ms',
  'hu',
  'nl',
  'el',
  'he',
  'fa',
  'nb',
  'sv',
  'fi',
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeInfo = {
  en: { dir: 'ltr', hreflang: 'en', intl: 'en-US', nativeName: 'English', ogLocale: 'en_US', shortLabel: 'EN' },
  vi: { dir: 'ltr', hreflang: 'vi', intl: 'vi-VN', nativeName: 'Tiếng Việt', ogLocale: 'vi_VN', shortLabel: 'VI' },
  ar: { dir: 'rtl', hreflang: 'ar', intl: 'ar', nativeName: 'العربية', ogLocale: 'ar_AR', shortLabel: 'AR' },
  cs: { dir: 'ltr', hreflang: 'cs', intl: 'cs-CZ', nativeName: 'Čeština', ogLocale: 'cs_CZ', shortLabel: 'CS' },
  de: { dir: 'ltr', hreflang: 'de', intl: 'de-DE', nativeName: 'Deutsch', ogLocale: 'de_DE', shortLabel: 'DE' },
  es: { dir: 'ltr', hreflang: 'es', intl: 'es-ES', nativeName: 'Español', ogLocale: 'es_ES', shortLabel: 'ES' },
  fr: { dir: 'ltr', hreflang: 'fr', intl: 'fr-FR', nativeName: 'Français', ogLocale: 'fr_FR', shortLabel: 'FR' },
  hi: { dir: 'ltr', hreflang: 'hi', intl: 'hi-IN', nativeName: 'हिन्दी', ogLocale: 'hi_IN', shortLabel: 'HI' },
  id: { dir: 'ltr', hreflang: 'id', intl: 'id-ID', nativeName: 'Bahasa Indonesia', ogLocale: 'id_ID', shortLabel: 'ID' },
  it: { dir: 'ltr', hreflang: 'it', intl: 'it-IT', nativeName: 'Italiano', ogLocale: 'it_IT', shortLabel: 'IT' },
  ja: { dir: 'ltr', hreflang: 'ja', intl: 'ja-JP', nativeName: '日本語', ogLocale: 'ja_JP', shortLabel: 'JA' },
  ko: { dir: 'ltr', hreflang: 'ko', intl: 'ko-KR', nativeName: '한국어', ogLocale: 'ko_KR', shortLabel: 'KO' },
  pl: { dir: 'ltr', hreflang: 'pl', intl: 'pl-PL', nativeName: 'Polski', ogLocale: 'pl_PL', shortLabel: 'PL' },
  pt: { dir: 'ltr', hreflang: 'pt', intl: 'pt-PT', nativeName: 'Português', ogLocale: 'pt_PT', shortLabel: 'PT' },
  ro: { dir: 'ltr', hreflang: 'ro', intl: 'ro-RO', nativeName: 'Română', ogLocale: 'ro_RO', shortLabel: 'RO' },
  ru: { dir: 'ltr', hreflang: 'ru', intl: 'ru-RU', nativeName: 'Русский', ogLocale: 'ru_RU', shortLabel: 'RU' },
  th: { dir: 'ltr', hreflang: 'th', intl: 'th-TH', nativeName: 'ภาษาไทย', ogLocale: 'th_TH', shortLabel: 'TH' },
  tr: { dir: 'ltr', hreflang: 'tr', intl: 'tr-TR', nativeName: 'Türkçe', ogLocale: 'tr_TR', shortLabel: 'TR' },
  uk: { dir: 'ltr', hreflang: 'uk', intl: 'uk-UA', nativeName: 'Українська', ogLocale: 'uk_UA', shortLabel: 'UK' },
  'zh-cn': { dir: 'ltr', hreflang: 'zh-CN', intl: 'zh-CN', nativeName: '简体中文', ogLocale: 'zh_CN', shortLabel: '简' },
  'zh-tw': { dir: 'ltr', hreflang: 'zh-TW', intl: 'zh-TW', nativeName: '繁體中文', ogLocale: 'zh_TW', shortLabel: '繁' },
  ms: { dir: 'ltr', hreflang: 'ms', intl: 'ms-MY', nativeName: 'Bahasa Melayu', ogLocale: 'ms_MY', shortLabel: 'MS' },
  hu: { dir: 'ltr', hreflang: 'hu', intl: 'hu-HU', nativeName: 'Magyar', ogLocale: 'hu_HU', shortLabel: 'HU' },
  nl: { dir: 'ltr', hreflang: 'nl', intl: 'nl-NL', nativeName: 'Nederlands', ogLocale: 'nl_NL', shortLabel: 'NL' },
  el: { dir: 'ltr', hreflang: 'el', intl: 'el-GR', nativeName: 'Ελληνικά', ogLocale: 'el_GR', shortLabel: 'EL' },
  he: { dir: 'rtl', hreflang: 'he', intl: 'he-IL', nativeName: 'עברית', ogLocale: 'he_IL', shortLabel: 'HE' },
  fa: { dir: 'rtl', hreflang: 'fa', intl: 'fa-IR', nativeName: 'فارسی', ogLocale: 'fa_IR', shortLabel: 'FA' },
  nb: { dir: 'ltr', hreflang: 'nb', intl: 'nb-NO', nativeName: 'Norsk bokmål', ogLocale: 'nb_NO', shortLabel: 'NB' },
  sv: { dir: 'ltr', hreflang: 'sv', intl: 'sv-SE', nativeName: 'Svenska', ogLocale: 'sv_SE', shortLabel: 'SV' },
  fi: { dir: 'ltr', hreflang: 'fi', intl: 'fi-FI', nativeName: 'Suomi', ogLocale: 'fi_FI', shortLabel: 'FI' },
} as const satisfies Record<
  Locale,
  {
    dir: 'ltr' | 'rtl';
    hreflang: string;
    intl: string;
    nativeName: string;
    ogLocale: string;
    shortLabel: string;
  }
>;

const acceptedLanguageAliases: Record<string, Locale> = {
  no: 'nb',
  'zh-hans': 'zh-cn',
  'zh-sg': 'zh-cn',
  'zh-hant': 'zh-tw',
  'zh-hk': 'zh-tw',
  'zh-mo': 'zh-tw',
};

export function isSupportedLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function detectPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const candidates = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0]?.trim().toLowerCase())
    .filter((candidate): candidate is string => Boolean(candidate));

  for (const candidate of candidates) {
    if (isSupportedLocale(candidate)) {
      return candidate;
    }

    if (candidate.startsWith('zh-hans')) {
      return 'zh-cn';
    }

    if (candidate.startsWith('zh-hant')) {
      return 'zh-tw';
    }

    const alias = acceptedLanguageAliases[candidate];
    if (alias) {
      return alias;
    }

    const baseLocale = candidate.split('-')[0];
    if (baseLocale && isSupportedLocale(baseLocale)) {
      return baseLocale;
    }

    const baseAlias = baseLocale ? acceptedLanguageAliases[baseLocale] : undefined;
    if (baseAlias) {
      return baseAlias;
    }
  }

  return defaultLocale;
}
