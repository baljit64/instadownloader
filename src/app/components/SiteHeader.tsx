'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/app/lib/auth-context';

const navLinks = [
  { label: 'Merge PDF', href: '/tools/merge' },
  { label: 'Split PDF', href: '/tools/split' },
  { label: 'Compress PDF', href: '/tools/compress' },
  { label: 'Convert PDF', href: '/tools' },
  { label: 'All PDF Tools', href: '/tools' },
];

export default function SiteHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const userLabel = user?.email || 'User';
  const avatarLetter = userLabel.charAt(0).toUpperCase();

  async function handleSignOut() {
    await signOut();
    setMenuOpen(false);
    router.push('/tools');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
          <Link href="/tools" className="inline-flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#e5322d] text-sm font-bold text-white">
              P
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">PDFNova</span>
          </Link>

          <nav className="hidden items-center justify-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-[#e5322d]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {loading ? (
              <span className="text-sm text-slate-500">Loading...</span>
            ) : user ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e5322d] text-xs font-bold text-white">
                    {avatarLetter}
                  </span>
                  <span className="max-w-[160px] truncate text-sm font-medium text-slate-700">{userLabel}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-lg bg-[#e5322d] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#cc2723]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="space-y-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2">
              {loading ? (
                <span className="text-sm text-slate-500">Loading...</span>
              ) : user ? (
                <>
                  <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e5322d] text-xs font-bold text-white">
                      {avatarLetter}
                    </span>
                    <span className="max-w-[120px] truncate text-sm font-medium text-slate-700">{userLabel}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-[#e5322d] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
