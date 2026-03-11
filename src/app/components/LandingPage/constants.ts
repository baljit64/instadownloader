import type { IconGlyphName } from '../IconGlyph';

export const heroDecorations: Array<{
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

export const heroDots = [
  'left-8 top-44 bg-[#7d67ff]',
  'left-[20%] top-[21rem] hidden sm:block bg-[#8d77ff]',
  'right-12 top-40 bg-[#b6a7ff]',
  'right-[10%] top-[23rem] bg-[#ffd969]',
  'left-24 top-[32rem] bg-[#ffa2c0]',
];

export const benefitVisuals: Array<{
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

export const spotlightVisuals = [
  {
    href: '/instagram-photo-downloader',
    id: 'photo-download',
    variant: 'ocean' as const,
  },
  {
    href: '/instagram-reel-downloader',
    id: 'reel-download',
    variant: 'night' as const,
  },
];

export const aiExperienceIcons: IconGlyphName[] = ['sparkles', 'proxy', 'preview'];
export const aboutFeatureIcons: IconGlyphName[] = ['download', 'desktop', 'preview', 'shield'];

export const websiteTileVisuals = [
  { icon: '/social/instagram.svg', label: 'Instagram', live: true },
  { icon: '/social/tiktok.svg', label: 'TikTok', live: false },
  { icon: '/social/youtube.svg', label: 'YouTube', live: false },
  { icon: '/social/facebook.svg', label: 'Facebook', live: false },
  { icon: '/social/x.svg', label: 'X / Twitter', live: false },
  { icon: '/social/pinterest.svg', label: 'Pinterest', live: false },
];
