import type { IconGlyphName } from '../IconGlyph';
import { getLocalePath, type Locale, type TranslationDictionary } from '../../lib/i18n';
import { absoluteUrl } from '../../lib/site';
import { seoPageMap, type SeoFaq, type SeoPageConfig } from '../../lib/seo-pages';
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
          'instagram-downloader',
          'instagram-post-downloader',
          'instagram-reel-downloader',
          'instagram-photo-downloader',
          'instagram-carousel-downloader',
          'instagram-download-not-working',
        ]
          .map((slug) => seoPageMap[slug])
          .filter((page): page is SeoPageConfig => Boolean(page))
      : [];

  const homepageFaqs: SeoFaq[] =
    locale === 'en'
      ? [
          seoPageMap['instagram-downloader']?.faqs[0],
          seoPageMap['instagram-carousel-downloader']?.faqs[0],
          seoPageMap['instagram-reel-downloader']?.faqs[0],
          seoPageMap['public-vs-private-instagram-links']?.faqs[0],
        ].filter((faq): faq is SeoFaq => Boolean(faq))
      : [];

  const homeStructuredData =
    locale === 'en'
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              name: 'Instagram Downloader',
                description: dictionary.metadata.homeDescription,
                url: absoluteUrl('/en'),
              },
            {
              '@type': 'FAQPage',
              mainEntity: homepageFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
            {
              '@type': 'ItemList',
              name: 'Instagram download resources',
              itemListElement: featuredSeoPages.map((page, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: page.shortTitle,
                url: absoluteUrl(`/${page.slug}`),
              })),
            },
          ],
        }
      : null;

  const footerProductLinks =
    locale === 'en'
      ? [
          { href: '/instagram-downloader', label: 'Instagram Downloader' },
          { href: '/instagram-photo-downloader', label: 'Instagram Photo Downloader' },
          { href: '/instagram-reel-downloader', label: 'Instagram Reel Downloader' },
        ]
      : [
          { href: getLocalePath(locale), label: dictionary.footer.links.downloader },
          { href: '#photo-download', label: dictionary.footer.links.photoDownload },
          { href: '#reel-download', label: dictionary.footer.links.reelDownload },
        ];

  const footerCompanyLinks = [
    { href: '#about', label: dictionary.footer.links.about },
    { href: '#contact', label: dictionary.footer.links.contact },
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

  return {
    aboutCards,
    aiExperienceCards,
    benefits,
    featuredSeoPages,
    footerCompanyLinks,
    footerProductLinks,
    footerSupportLinks,
    homeStructuredData,
    homepageFaqs,
    navigation,
    spotlightSections,
    websiteTiles,
  };
}
