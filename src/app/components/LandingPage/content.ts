import type { IconGlyphName } from '../IconGlyph';
import { getLocalePath, type Locale, type TranslationDictionary } from '../../lib/i18n';
import { activeSeoPages, seoPageMap, type SeoFaq, type SeoPageConfig } from '../../lib/seo-pages';
import {
  absoluteUrl,
  siteAlternateNames,
  siteDescription,
  siteFeatureList,
  siteName,
} from '../../lib/site';
import {
  aboutFeatureIcons,
  aiExperienceIcons,
  benefitVisuals,
  spotlightVisuals,
  websiteTileVisuals,
} from './constants';

export interface LandingPageLink {
  href: string;
  label: string;
}

export interface BenefitItem {
  description: string;
  icon: IconGlyphName;
  iconClassName: string;
  title: string;
}

export interface AiExperienceCard {
  description: string;
  icon: IconGlyphName;
  title: string;
}

export interface AboutCard {
  description: string;
  icon: IconGlyphName;
  title: string;
}

export interface SpotlightItem {
  copy: TranslationDictionary['spotlight'][number];
  href: string;
  id: string;
  mockCardCopy: TranslationDictionary['mockCard'];
  variant: 'night' | 'ocean';
}

export interface WebsiteTile {
  description: string;
  icon: string;
  label: string;
  status: string;
  statusTone: string;
}

export interface LandingPageContent {
  aboutCards: AboutCard[];
  aiExperienceCards: AiExperienceCard[];
  benefits: BenefitItem[];
  featuredSeoPages: SeoPageConfig[];
  footerCompanyLinks: LandingPageLink[];
  footerProductLinks: LandingPageLink[];
  footerSupportLinks: LandingPageLink[];
  homeStructuredData: Record<string, unknown> | null;
  homepageFaqs: SeoFaq[];
  navigation: LandingPageLink[];
  allSeoPageLinks: LandingPageLink[];
  popularSearchLinks: LandingPageLink[];
  spotlightSections: SpotlightItem[];
  websiteTiles: WebsiteTile[];
}

export function getLandingPageContent(
  dictionary: TranslationDictionary,
  locale: Locale
): LandingPageContent {
  const navigation = [
    { href: getLocalePath(locale), label: dictionary.header.home },
    { href: '#about', label: dictionary.header.about },
    { href: '#contact', label: dictionary.header.contact },
  ];

  const benefits = benefitVisuals.map((visual, index) => ({
    ...visual,
    ...dictionary.benefits[index],
  }));

  const aiExperienceCards = aiExperienceIcons.map((icon, index) => ({
    icon,
    ...dictionary.aiExperience.cards[index],
  }));

  const aboutCards = aboutFeatureIcons.map((icon, index) => ({
    icon,
    ...dictionary.aboutSection.cards[index],
  }));

  const spotlightSections = spotlightVisuals.map((visual, index) => ({
    ...visual,
    copy: dictionary.spotlight[index],
    mockCardCopy: dictionary.mockCard,
  }));

  const websiteTiles = websiteTileVisuals.map((visual, index) => ({
    ...visual,
    description: dictionary.supportedPlatforms.items[index].description,
    status: visual.live
      ? dictionary.supportedPlatforms.liveNow
      : dictionary.supportedPlatforms.beta,
    statusTone: visual.live
      ? 'bg-emerald-100 text-emerald-700'
      : 'bg-amber-100 text-amber-700',
  }));

  const featuredSeoPages: SeoPageConfig[] =
    locale === 'en'
      ? [
          'download-instagram-post-by-link',
          'download-instagram-reel-by-link',
          'instagram-downloader-no-login',
          'instagram-downloader-without-app',
          'instagram-post-downloader',
          'instagram-reel-downloader',
          'instagram-download-not-working',
        ]
          .map((slug) => seoPageMap[slug])
          .filter(
            (page): page is SeoPageConfig => Boolean(page && page.status === 'active')
          )
      : [];

  const homepageFaqs: SeoFaq[] =
    locale === 'en'
      ? [
          {
            question: 'How do I download an Instagram video?',
            answer: 'Copy the complete URL for a public Instagram video, paste it into the downloader, submit it, and save the video from the preview result.',
          },
          {
            question: 'Can I download Instagram reels?',
            answer: 'Yes. Public /reel/ and /reels/ links are supported. Private, deleted, restricted, or sign-in-only reels are not.',
          },
          {
            question: 'Can I download Instagram stories?',
            answer: 'No. Stories are not supported in the current product because they are short-lived and commonly require authenticated Instagram access.',
          },
          {
            question: 'Can I download Instagram photos and carousels?',
            answer: 'Yes. Public photo and carousel post links are supported. A carousel can return multiple image or video result cards.',
          },
          {
            question: 'Does IGDown work on iPhone and Android?',
            answer: 'Yes. It runs in a modern mobile browser. Android usually saves to Downloads; iPhone and iPad usually save browser downloads in the Files app.',
          },
          {
            question: 'Is an Instagram login required?',
            answer: 'No. IGDown does not request Instagram credentials. That means it can process supported public links only.',
          },
          {
            question: 'Can IGDown download private content?',
            answer: 'No. The downloader does not bypass private accounts, Close Friends controls, sign-in requirements, or other access restrictions.',
          },
          {
            question: 'Is the Instagram downloader free?',
            answer: 'Yes. The current web downloader is free to use and does not require a separate application or browser extension.',
          },
          {
            question: 'Is it safe to use?',
            answer: 'IGDown does not ask for your Instagram password or session cookie. Use only public URLs, review the preview, and never share account credentials with a downloader.',
          },
          {
            question: 'Why is my Instagram link not working?',
            answer: 'The post may be private, deleted, restricted, malformed, or temporarily unavailable. Confirm it opens without sign-in and contains a supported /p/, /reel/, /reels/, or /tv/ path.',
          },
        ]
      : [];

  const localizedHomePath = getLocalePath(locale);
  const localizedHomeUrl = absoluteUrl(localizedHomePath);
  const applicationId = `${localizedHomeUrl}#app`;
  const toolCollectionId = `${localizedHomeUrl}#download-resources`;
  const faqMainEntity = homepageFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  }));

  const homeStructuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': locale === 'en' ? 'CollectionPage' : 'WebPage',
        '@id': `${localizedHomeUrl}#webpage`,
        name: dictionary.metadata.homeTitle,
        description: dictionary.metadata.homeDescription,
        url: localizedHomeUrl,
        inLanguage: locale,
        mainEntity: [
          { '@id': applicationId },
          ...(featuredSeoPages.length ? [{ '@id': toolCollectionId }] : []),
        ],
        isPartOf: {
          '@id': `${absoluteUrl('/')}#website`,
        },
      },
      {
        '@type': ['WebApplication', 'SoftwareApplication'],
        '@id': applicationId,
        name: siteName,
        alternateName: siteAlternateNames,
        url: localizedHomeUrl,
        description: siteDescription,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Windows, macOS, Linux, Android, iOS',
        browserRequirements: 'Requires JavaScript and a modern browser',
        featureList: siteFeatureList,
        isAccessibleForFree: true,
        publisher: {
          '@id': `${absoluteUrl('/')}#organization`,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      ...(featuredSeoPages.length
        ? [
            {
              '@type': 'ItemList',
              '@id': toolCollectionId,
              name: 'Instagram download tools and guides',
              numberOfItems: featuredSeoPages.length,
              itemListElement: featuredSeoPages.map((page, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: page.shortTitle,
                url: absoluteUrl(`/${page.slug}`),
              })),
            },
            {
              '@type': 'SiteNavigationElement',
              '@id': `${localizedHomeUrl}#primary-navigation`,
              name: navigation.map((item) => item.label),
              url: navigation.map((item) =>
                item.href.startsWith('#')
                  ? `${localizedHomeUrl}${item.href}`
                  : absoluteUrl(item.href)
              ),
            },
          ]
        : []),
      ...(faqMainEntity.length
        ? [
            {
              '@type': 'FAQPage',
              inLanguage: locale,
              mainEntity: faqMainEntity,
            },
          ]
        : []),
    ],
  };

  const footerProductLinks =
    locale === 'en'
      ? [
          { href: '/en', label: 'Instagram Downloader' },
          { href: '/instagram-post-downloader', label: 'Instagram Post Downloader' },
          { href: '/instagram-reel-downloader', label: 'Instagram Reel Downloader' },
        ]
      : [
          { href: getLocalePath(locale), label: dictionary.footer.links.downloader },
          { href: '#photo-download', label: dictionary.footer.links.photoDownload },
          { href: '#reel-download', label: dictionary.footer.links.reelDownload },
        ];

  const footerCompanyLinks = [
    { href: '/about', label: dictionary.footer.links.about },
    { href: '/contact', label: dictionary.footer.links.contact },
    { href: '#supported-platforms', label: dictionary.footer.links.supportedPlatforms },
  ];

  const footerSupportLinks =
    locale === 'en'
      ? [
          {
            href: '/how-to-download-instagram-post',
            label: 'How to Download an Instagram Post',
          },
          {
            href: '/instagram-download-not-working',
            label: 'Instagram Download Not Working',
          },
          {
            href: '/public-vs-private-instagram-links',
            label: 'Public vs Private Instagram Links',
          },
        ]
      : [
          { href: '#supported-platforms', label: dictionary.footer.links.betaPlatforms },
          { href: '#details', label: dictionary.footer.links.supportedPlatforms },
          { href: '#contact', label: dictionary.footer.links.contact },
        ];

  const popularSearchLinks: LandingPageLink[] =
    locale === 'en'
      ? [
          { href: '/en', label: 'instagram downloader' },
          { href: '/en', label: 'insta downloader' },
          { href: '/en', label: 'ig downloader' },
          { href: '/download-instagram-post-by-link', label: 'download instagram post link' },
          { href: '/download-instagram-reel-by-link', label: 'download instagram reel link' },
          { href: '/instagram-video-downloader', label: 'instagram video downloader' },
        ]
      : [];

  const allSeoPageLinks: LandingPageLink[] =
    locale === 'en'
      ? activeSeoPages
          .slice()
          .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle))
          .map((page) => ({
            href: `/${page.slug}`,
            label: page.shortTitle,
          }))
      : [];

  return {
    aboutCards,
    allSeoPageLinks,
    aiExperienceCards,
    benefits,
    featuredSeoPages,
    footerCompanyLinks,
    footerProductLinks,
    footerSupportLinks,
    homeStructuredData,
    homepageFaqs,
    navigation,
    popularSearchLinks,
    spotlightSections,
    websiteTiles,
  };
}
