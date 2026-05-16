import { type Locale, type TranslationDictionary } from '../../lib/i18n';
import AboutSection from './sections/AboutSection';
import AiExperienceSection from './sections/AiExperienceSection';
import BenefitsSection from './sections/BenefitsSection';
import ContactSection from './sections/ContactSection';
import FaqSection from './sections/FaqSection';
import HeroSection from './sections/HeroSection';
import LandingPageFooter from './sections/LandingPageFooter';
import LandingPageHeader from './sections/LandingPageHeader';
import PopularSearchesSection from './sections/PopularSearchesSection';
import SeoResourcesSection from './sections/SeoResourcesSection';
import SpotlightSections from './sections/SpotlightSections';
import StructuredDataScript from './sections/StructuredDataScript';
import SupportedPlatformsSection from './sections/SupportedPlatformsSection';

interface LandingPageProps {
  dictionary: TranslationDictionary;
  locale: Locale;
}

export default async function LandingPage({ dictionary, locale }: LandingPageProps) {
  const { getLandingPageContent } = await import('./content');
  const content = getLandingPageContent(dictionary, locale);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="reference-top-band" />

      <LandingPageHeader
        languageMenuLabel={dictionary.header.languageMenu}
        locale={locale}
        navigation={content.navigation}
      />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <StructuredDataScript data={content.homeStructuredData} />
        <HeroSection hero={dictionary.hero} />
        <BenefitsSection benefits={content.benefits} />
        <PopularSearchesSection links={content.popularSearchLinks} />
        <AiExperienceSection
          cards={content.aiExperienceCards}
          copy={dictionary.aiExperience}
        />
        <SpotlightSections sections={content.spotlightSections} />
        <SupportedPlatformsSection
          copy={dictionary.supportedPlatforms}
          websiteTiles={content.websiteTiles}
        />
        <AboutSection
          aboutCards={content.aboutCards}
          copy={dictionary.aboutSection}
        />
        <SeoResourcesSection featuredSeoPages={content.featuredSeoPages} />
        <FaqSection homepageFaqs={content.homepageFaqs} />
        <ContactSection copy={dictionary.contactSection} />
        <LandingPageFooter
          companyLinks={content.footerCompanyLinks}
          copy={dictionary.footer}
          productLinks={content.footerProductLinks}
          supportLinks={content.footerSupportLinks}
        />
      </main>
    </div>
  );
}
