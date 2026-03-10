import Image from 'next/image';
import Link from 'next/link';
import { getLocalePath, type Locale, type TranslationDictionary } from '../lib/i18n';
import HeroDownloadForm from './HeroDownloadForm';
import IconGlyph, { type IconGlyphName } from './IconGlyph';
import LanguageSwitcher from './LanguageSwitcher';

const heroDecorations: Array<{
  className: string;
  icon: IconGlyphName;
  toneClassName: string;
}> = [
  {
    icon: 'sparkles',
    className: 'left-0 top-24 rotate-[-18deg]',
    toneClassName: 'bg-white/90 text-[#ff6d6a] shadow-[0_18px_30px_rgba(255,109,106,0.16)]',
  },
  {
    icon: 'post',
    className: 'right-40 top-0 rotate-[14deg] hidden md:flex',
    toneClassName: 'bg-[#23273b] text-white shadow-[0_18px_32px_rgba(35,39,59,0.2)]',
  },
  {
    icon: 'link',
    className: 'right-0 top-48 rotate-[34deg]',
    toneClassName: 'bg-white/92 text-[#ef5f73] shadow-[0_18px_30px_rgba(239,95,115,0.16)]',
  },
  {
    icon: 'download',
    className: 'left-2 top-[26rem] rotate-[-14deg]',
    toneClassName: 'bg-white/92 text-[#ff8e5f] shadow-[0_18px_30px_rgba(255,142,95,0.16)]',
  },
  {
    icon: 'preview',
    className: 'right-4 top-[29rem] rotate-[12deg]',
    toneClassName: 'bg-[#4b67df] text-white shadow-[0_18px_30px_rgba(75,103,223,0.2)]',
  },
];

const heroDots = [
  'left-8 top-44 bg-[#7d67ff]',
  'left-[20%] top-[21rem] hidden sm:block bg-[#8d77ff]',
  'right-12 top-40 bg-[#b6a7ff]',
  'right-[10%] top-[23rem] bg-[#ffd969]',
  'left-24 top-[32rem] bg-[#ffa2c0]',
];

const benefitVisuals: Array<{
  icon: IconGlyphName;
  iconClassName: string;
}> = [
  {
    icon: 'sparkles',
    iconClassName:
      'bg-[radial-gradient(circle_at_30%_30%,#f8dc72,#16161f)] text-[#f7d156] shadow-[0_20px_36px_rgba(22,22,31,0.18)]',
  },
  {
    icon: 'fast',
    iconClassName:
      'bg-[linear-gradient(180deg,#f4f4ff,#ffffff)] text-[#2d3468] shadow-[0_18px_32px_rgba(91,94,155,0.12)]',
  },
  {
    icon: 'shield',
    iconClassName:
      'bg-[linear-gradient(180deg,#1c2030,#0f1320)] text-[#f8c75f] shadow-[0_20px_36px_rgba(15,19,32,0.2)]',
  },
];

const spotlightVisuals = [
  { id: 'photo-download', variant: 'ocean' as const },
  { id: 'reel-download', variant: 'night' as const },
];

const aiExperienceIcons: IconGlyphName[] = ['sparkles', 'proxy', 'preview'];
const aboutFeatureIcons: IconGlyphName[] = ['download', 'desktop', 'preview', 'shield'];

const websiteTileVisuals = [
  { icon: '/social/instagram.svg', label: 'Instagram', live: true },
  { icon: '/social/tiktok.svg', label: 'TikTok', live: false },
  { icon: '/social/youtube.svg', label: 'YouTube', live: false },
  { icon: '/social/facebook.svg', label: 'Facebook', live: false },
  { icon: '/social/x.svg', label: 'X / Twitter', live: false },
  { icon: '/social/pinterest.svg', label: 'Pinterest', live: false },
];

function BenefitCard({
  description,
  icon,
  iconClassName,
  title,
}: {
  description: string;
  icon: IconGlyphName;
  iconClassName: string;
  title: string;
}) {
  return (
    <article className="text-center">
      <div
        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] ${iconClassName}`}
      >
        <IconGlyph name={icon} className="h-10 w-10" strokeWidth={1.8} />
      </div>
      <h2 className="font-display mt-7 text-[2rem] font-bold tracking-[-0.03em] text-[#191534]">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-[#8c88a4]">
        {description}
      </p>
    </article>
  );
}

function DetailCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: IconGlyphName;
  title: string;
}) {
  return (
    <article className="rounded-[28px] border border-white/80 bg-white/70 px-6 py-8 text-center shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center text-[#171923]">
        <IconGlyph name={icon} className="h-8 w-8" strokeWidth={2} />
      </div>
      <h3 className="font-display mt-5 text-[1.95rem] font-bold tracking-[-0.03em] text-[#cb2e79]">
        {title}
      </h3>
      <div className="mx-auto mt-6 h-px w-full max-w-[18rem] bg-[#e6dfef]" />
      <p className="mx-auto mt-6 max-w-[22rem] text-base leading-8 text-[#5b5867]">
        {description}
      </p>
    </article>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: Array<{ href: string; label: string }>;
  title: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">
        {title}
      </h3>
      <div className="mt-4 space-y-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-white/72 transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MockInstagramCard({
  copy,
  variant,
}: {
  copy: TranslationDictionary['mockCard'];
  variant: 'night' | 'ocean';
}) {
  const isNight = variant === 'night';

  return (
    <div className="mx-auto w-full max-w-[23rem] rounded-[2rem] border border-[#f0edf8] bg-white p-4 shadow-[0_30px_70px_rgba(33,28,69,0.08)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-11 w-11 rounded-full ${
              isNight
                ? 'bg-[linear-gradient(135deg,#3b1f47,#d04273)]'
                : 'bg-[linear-gradient(135deg,#d7d9df,#8891a8)]'
            }`}
          />
          <div className="text-left">
            <p className="text-sm font-semibold text-[#1d173a]">
              {isNight ? 'murphy.june' : 'codyfisher'}
            </p>
            <p className="text-xs text-[#9993b3]">{copy.location}</p>
          </div>
        </div>
        <div className="flex gap-1 text-[#b4afc8]">
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        </div>
      </div>

      <div
        className={`relative mt-4 overflow-hidden rounded-[1.6rem] ${
          isNight
            ? 'h-[20rem] bg-[radial-gradient(circle_at_top,#0d6a63_0%,#111827_36%,#0a0c14_100%)]'
            : 'h-[17rem] bg-[linear-gradient(90deg,#f7e4dc_0%,#e9ecef_34%,#c5f1f1_65%,#88d7ea_100%)]'
        }`}
      >
        {isNight ? (
          <>
            <div className="absolute inset-x-10 top-12 h-24 rounded-full bg-[radial-gradient(circle,rgba(111,255,216,0.24),rgba(111,255,216,0))]" />
            <div className="absolute left-6 top-6 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              Reel
            </div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,rgba(7,11,20,0),rgba(7,11,20,0.92))]" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <p className="text-lg font-semibold">{copy.previewReady}</p>
                <p className="text-xs text-white/70">{copy.previewDetected}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/14">
                <IconGlyph name="download" className="h-5 w-5" strokeWidth={2} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute left-[54%] top-[46%] h-2.5 w-20 -translate-x-1/2 rounded-full bg-[#c98a46] shadow-[0_10px_20px_rgba(201,138,70,0.28)]" />
            <div className="absolute left-[48%] top-[46%] h-2 w-6 -translate-x-1/2 rounded-full bg-[#a86f34]" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.2))]" />
          </>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-[#8d86a9]">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded-full bg-[#ff637f]" />
          <span className="h-4 w-4 rounded-full bg-[#ded7ef]" />
          <span className="h-4 w-4 rounded-full bg-[#ece7fb]" />
        </div>
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-[#2b2744]" />
          <span className="h-2 w-2 rounded-full bg-[#615b7e]" />
          <span className="h-2 w-2 rounded-full bg-[#b1acc4]" />
        </div>
      </div>

      <p className="mt-4 text-sm text-[#282143]">
        <span className="font-semibold">{copy.likedBy}</span>
      </p>
      <p className="mt-2 text-sm text-[#6f678f]">
        {isNight ? copy.reelCaption : copy.photoCaption}
      </p>
      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#b0abc4]">
        {isNight ? copy.reelPreviewLabel : copy.photoPreviewLabel}
      </p>
    </div>
  );
}

function SpotlightSection({
  copy,
  id,
  mockCardCopy,
  variant,
}: {
  copy: TranslationDictionary['spotlight'][number];
  id: string;
  mockCardCopy: TranslationDictionary['mockCard'];
  variant: 'night' | 'ocean';
}) {
  const isNight = variant === 'night';

  return (
    <section
      id={id}
      className={`grid items-center gap-12 ${
        isNight ? 'lg:grid-cols-[minmax(0,1fr)_24rem]' : 'lg:grid-cols-[24rem_minmax(0,1fr)]'
      }`}
    >
      {isNight ? null : <MockInstagramCard copy={mockCardCopy} variant={variant} />}

      <div className={`${isNight ? 'text-left lg:pr-10' : 'text-left lg:pl-10'}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f86ff]">
          {copy.eyebrow}
        </span>
        <h2 className="font-display mt-5 text-4xl font-bold leading-tight tracking-[-0.04em] text-[#17142d] sm:text-[3.35rem]">
          {copy.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-9 text-[#6f688d]">
          {copy.description}
        </p>
        <Link
          href="#supported-platforms"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#6c5ce7]"
        >
          {copy.learnMore}
          <span className="text-lg leading-none">+</span>
        </Link>
      </div>

      {isNight ? <MockInstagramCard copy={mockCardCopy} variant={variant} /> : null}
    </section>
  );
}

interface LandingPageProps {
  dictionary: TranslationDictionary;
  locale: Locale;
}

export default function LandingPage({ dictionary, locale }: LandingPageProps) {
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

  const footerProductLinks = [
    { href: getLocalePath(locale), label: dictionary.footer.links.downloader },
    { href: '#photo-download', label: dictionary.footer.links.photoDownload },
    { href: '#reel-download', label: dictionary.footer.links.reelDownload },
  ];

  const footerCompanyLinks = [
    { href: '#about', label: dictionary.footer.links.about },
    { href: '#contact', label: dictionary.footer.links.contact },
    { href: '#supported-platforms', label: dictionary.footer.links.supportedPlatforms },
  ];

  const footerSupportLinks = [
    { href: '#supported-platforms', label: dictionary.footer.links.betaPlatforms },
    { href: '#details', label: dictionary.footer.links.supportedPlatforms },
    { href: '#contact', label: dictionary.footer.links.contact },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="reference-top-band" />

      <header className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-7 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          <Link className="flex items-center gap-3" href={getLocalePath(locale)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/85 text-[#6d5cf2] shadow-[0_14px_30px_rgba(109,92,242,0.16)] ring-1 ring-white/70">
              <IconGlyph name="instagram" className="h-6 w-6" strokeWidth={2} />
            </div>
            <div>
              <p className="font-display text-[1.85rem] font-bold tracking-[-0.04em] text-white">
                igdown.io
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-semibold text-white/85 md:flex">
            {navigation.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition hover:text-white ${
                  index === 0 ? 'border-b-2 border-white pb-1 text-white' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <LanguageSwitcher
            buttonLabel={dictionary.header.languageMenu}
            currentLocale={locale}
          />
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden px-4 pb-4 pt-10 text-center sm:px-10">
          {heroDecorations.map((item) => (
            <div
              key={`${item.icon}-${item.className}`}
              aria-hidden="true"
              className={`absolute hidden h-14 w-14 items-center justify-center rounded-2xl ${item.className} ${item.toneClassName} animate-[drift_7s_ease-in-out_infinite] lg:flex`}
            >
              <IconGlyph name={item.icon} className="h-7 w-7" strokeWidth={2} />
            </div>
          ))}

          {heroDots.map((className) => (
            <span
              key={className}
              aria-hidden="true"
              className={`absolute hidden h-2.5 w-2.5 rounded-full opacity-80 lg:block ${className}`}
            />
          ))}

          <div className="ai-hero-pill">
            {dictionary.hero.aiSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>

          <h1 className="font-display mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-[-0.05em] text-[#2a2d89] sm:text-6xl lg:text-[4.7rem]">
            {dictionary.hero.title}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-9 text-[#333047] sm:text-[1.45rem]">
            {dictionary.hero.subtitle}
          </p>

          <HeroDownloadForm copy={dictionary.hero} formats={dictionary.hero.formats} />
        </section>

        <section
          id="details"
          className="mt-[4.5rem] grid gap-10 px-2 py-10 md:grid-cols-3 md:px-6 lg:mt-24"
        >
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </section>

        <section className="ai-experience-shell">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#816eff]">
              {dictionary.aiExperience.eyebrow}
            </span>
            <h2 className="font-display mt-5 text-4xl font-bold tracking-[-0.04em] text-[#18142f] sm:text-[3.35rem]">
              {dictionary.aiExperience.title}
            </h2>
            <p className="mt-5 text-lg leading-9 text-[#6d6887]">
              {dictionary.aiExperience.description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {aiExperienceCards.map((card) => (
              <article key={card.title} className="ai-experience-card">
                <div className="ai-experience-icon">
                  <IconGlyph name={card.icon} className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="font-display mt-6 text-[1.65rem] font-bold tracking-[-0.03em] text-[#191534]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#6f6988]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 space-y-20 sm:space-y-28">
          {spotlightSections.map((section) => (
            <SpotlightSection key={section.id} {...section} />
          ))}
        </div>

        <section
          id="supported-platforms"
          className="surface-card mt-24 rounded-[38px] px-6 py-10 text-center sm:px-8"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
            {dictionary.supportedPlatforms.eyebrow}
          </span>
          <h2 className="font-display mt-4 text-4xl font-bold text-[#171923]">
            {dictionary.supportedPlatforms.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#726a92]">
            {dictionary.supportedPlatforms.sectionDescription}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {websiteTiles.map((tile) => (
              <article
                key={tile.label}
                className="rounded-[28px] border border-white/80 bg-white/76 px-5 py-6 text-left shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#f5f7ff] shadow-[inset_0_0_0_1px_rgba(214,223,255,0.9)]">
                    <Image
                      src={tile.icon}
                      alt=""
                      width={40}
                      height={40}
                      unoptimized
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${tile.statusTone}`}
                  >
                    {tile.status}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-[#171923]">{tile.label}</h3>
                <p className="mt-2 text-sm leading-6 text-[#726a92]">{tile.description}</p>
              </article>
            ))}
          </div>

        </section>

        <section
          id="about"
          className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8"
        >
          <div className="mx-auto max-w-5xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
              {dictionary.aboutSection.eyebrow}
            </span>
            <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3.1rem]">
              {dictionary.aboutSection.title}
            </h2>
            <p className="mx-auto mt-5 max-w-5xl text-lg leading-9 text-[#5b5867]">
              {dictionary.aboutSection.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {aboutCards.map((card) => (
              <DetailCard key={card.title} {...card} />
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8 lg:px-10"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
                {dictionary.contactSection.eyebrow}
              </span>
              <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3.1rem]">
                {dictionary.contactSection.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#726a92]">
                {dictionary.contactSection.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${dictionary.contactSection.emailValue}`}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7a66f2,#8c71ff)] px-6 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(122,102,242,0.22)] transition hover:brightness-105"
                >
                  {dictionary.contactSection.primaryAction}
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              <article className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
                  {dictionary.contactSection.emailLabel}
                </p>
                <p className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] text-[#171923]">
                  {dictionary.contactSection.emailValue}
                </p>
              </article>
              <article className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
                  {dictionary.contactSection.supportCasesLabel}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#171923]">
                  {dictionary.contactSection.supportCasesValue}
                </p>
              </article>
              <article className="rounded-[28px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
                  {dictionary.contactSection.supportCoverageLabel}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#171923]">
                  {dictionary.contactSection.supportCoverageValue}
                </p>
              </article>
            </div>
          </div>
        </section>

        <footer className="mt-10 rounded-[38px] bg-[#17142d] px-6 py-10 text-white sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/12">
                  <IconGlyph name="instagram" className="h-6 w-6" strokeWidth={2} />
                </div>
                <p className="font-display text-[1.7rem] font-bold tracking-[-0.04em] text-white">
                  igdown.io
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-white/68">
                {dictionary.footer.brandDescription}
              </p>
            </div>

            <FooterColumn title={dictionary.footer.productTitle} links={footerProductLinks} />
            <FooterColumn title={dictionary.footer.companyTitle} links={footerCompanyLinks} />
            <FooterColumn title={dictionary.footer.supportTitle} links={footerSupportLinks} />
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/58 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} igdown.io. {dictionary.footer.copyright}
            </p>
            <div className="flex items-center gap-3 text-white/55">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                <IconGlyph name="proxy" className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                <IconGlyph name="shield" className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
                <IconGlyph name="download" className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
