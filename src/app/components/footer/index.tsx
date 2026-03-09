import Link from 'next/link';

const productLinks = [
  { label: 'Merge PDF', href: '/tools/merge' },
  { label: 'Split PDF', href: '/tools/split' },
  { label: 'Compress PDF', href: '/tools/compress' },
  { label: 'All PDF Tools', href: '/tools' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Press', href: '#' },
  { label: 'Contact', href: '#' },
];

const legalLinks = [
  { label: 'Terms', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Cookies', href: '#' },
  { label: 'Security', href: '#' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#e5322d] text-sm font-bold text-white">
                P
              </span>
              <span className="text-lg font-bold text-slate-900">Insta Downloader</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              Fast and secure online PDF tools for teams, creators, and businesses.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">Product</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {productLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block hover:text-[#e5322d]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">Company</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block hover:text-[#e5322d]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-slate-900">Legal</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block hover:text-[#e5322d]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-[#e5322d] hover:text-[#e5322d]">X</a>
            <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-[#e5322d] hover:text-[#e5322d]">f</a>
            <a href="#" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 hover:border-[#e5322d] hover:text-[#e5322d]">in</a>
          </div>
          <p>© {new Date().getFullYear()} Insta Downloader. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
