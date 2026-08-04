import Link from 'next/link';

const columns = [
  {
    title: 'Downloaders',
    links: [
      ['/instagram-post-downloader', 'Post downloader'],
      ['/instagram-video-downloader', 'Video downloader'],
      ['/instagram-reel-downloader', 'Reel downloader'],
      ['/instagram-photo-downloader', 'Photo downloader'],
      ['/instagram-carousel-downloader', 'Carousel downloader'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/about', 'About'],
      ['/contact', 'Contact'],
      ['/instagram-download-safety-guide', 'Safety guide'],
      ['/instagram-download-copyright-faq', 'Copyright FAQ'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['/privacy-policy', 'Privacy policy'],
      ['/terms-of-service', 'Terms of service'],
      ['/dmca-policy', 'DMCA policy'],
      ['/cookie-policy', 'Cookie policy'],
    ],
  },
] as const;

export default function PublicSiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <p className="font-display text-xl font-semibold">igdown.pro</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
            A browser-based downloader for supported public Instagram post, reel, video, photo, and carousel links.
          </p>
          <p className="mt-3 text-xs leading-5 text-slate-400">
            IGDown is independent and is not affiliated with or endorsed by Instagram or Meta.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{column.title}</h2>
            <ul className="mt-4 space-y-2">
              {column.links.map(([href, label]) => (
                <li key={href}>
                  <Link className="text-sm text-slate-200 transition hover:text-white" href={href} prefetch={false}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} IGDown. All rights reserved.
      </div>
    </footer>
  );
}
