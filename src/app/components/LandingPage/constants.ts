import type { IconGlyphName } from '../IconGlyph';

export const benefitVisuals: Array<{
  icon: IconGlyphName;
  iconClassName: string;
}> = [
  {
    icon: 'sparkles',
    iconClassName: 'bg-blue-50 text-blue-600 border border-blue-100',
  },
  {
    icon: 'fast',
    iconClassName: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
  },
  {
    icon: 'shield',
    iconClassName: 'bg-amber-50 text-amber-600 border border-amber-100',
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
