import { lazy, Suspense } from 'react';
import { type Locale, type TranslationDictionary } from '../../lib/i18n';

const AboutSection = lazy(() => import('./sections/AboutSection'));
const AiExperienceSection = lazy(() => import('./sections/AiExperienceSection'));
const BenefitsSection = lazy(() => import('./sections/BenefitsSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
const FaqSection = lazy(() => import('./sections/FaqSection'));
const HeroSection = lazy(() => import('./sections/HeroSection'));
const LandingPageFooter = lazy(() => import('./sections/LandingPageFooter'));
const LandingPageHeader = lazy(() => import('./sections/LandingPageHeader'));
const SeoResourcesSection = lazy(() => import('./sections/SeoResourcesSection'));
const SpotlightSections = lazy(() => import('./sections/SpotlightSections'));
const StructuredDataScript = lazy(() => import('./sections/StructuredDataScript'));
const SupportedPlatformsSection = lazy(() => import('./sections/SupportedPlatformsSection'));

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

      <Suspense fallback={null}>
        <LandingPageHeader
          languageMenuLabel={dictionary.header.languageMenu}
          locale={locale}
          navigation={content.navigation}
        />
      </Suspense>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <StructuredDataScript data={content.homeStructuredData} />
        </Suspense>
        <Suspense fallback={null}>
          <HeroSection hero={dictionary.hero} />
        </Suspense>
        <Suspense fallback={null}>
          <BenefitsSection benefits={content.benefits} />
        </Suspense>
        <Suspense fallback={null}>
          <AiExperienceSection
            cards={content.aiExperienceCards}
            copy={dictionary.aiExperience}
          />
        </Suspense>
        <Suspense fallback={null}>
          <SpotlightSections sections={content.spotlightSections} />
        </Suspense>
        <Suspense fallback={null}>
          <SupportedPlatformsSection
            copy={dictionary.supportedPlatforms}
            websiteTiles={content.websiteTiles}
          />
        </Suspense>
        <Suspense fallback={null}>
          <AboutSection
            aboutCards={content.aboutCards}
            copy={dictionary.aboutSection}
          />
        </Suspense>
        <Suspense fallback={null}>
          <SeoResourcesSection featuredSeoPages={content.featuredSeoPages} />
        </Suspense>
        <Suspense fallback={null}>
          <FaqSection homepageFaqs={content.homepageFaqs} />
        </Suspense>
        <Suspense fallback={null}>
          <ContactSection copy={dictionary.contactSection} />
        </Suspense>
        <Suspense fallback={null}>
          <LandingPageFooter
            companyLinks={content.footerCompanyLinks}
            copy={dictionary.footer}
            productLinks={content.footerProductLinks}
            supportLinks={content.footerSupportLinks}
          />
        </Suspense>
      </main>
    </div>
  );
}
