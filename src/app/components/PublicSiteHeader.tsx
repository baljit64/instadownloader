import Link from 'next/link';
import IconGlyph from './IconGlyph';

const links = [
  { href: '/instagram-video-downloader', label: 'Videos' },
  { href: '/instagram-reel-downloader', label: 'Reels' },
  { href: '/instagram-photo-downloader', label: 'Photos' },
  { href: '/instagram-carousel-downloader', label: 'Carousels' },
  { href: '/about', label: 'About' },
];

export default function PublicSiteHeader() {
  return (
    <header className="border-b border-slate-200/90 bg-white/95">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2.5" href="/en" prefetch={false}>
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
            <IconGlyph name="instagram" className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-slate-900">igdown.pro</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link className="rounded-sm transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" href={link.href} key={link.href} prefetch={false}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
