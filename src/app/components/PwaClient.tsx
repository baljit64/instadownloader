'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isSupportedLocale, locales } from '../lib/i18n';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

const installLabels = {
  en: 'Install app',
  hi: 'ऐप इंस्टॉल करें',
  es: 'Instalar app',
  fr: 'Installer l’app',
};

export default function PwaClient() {
  const pathname = usePathname();
  const localeFromPath = useMemo(() => {
    const segment = pathname.split('/').filter(Boolean)[0];
    return segment && isSupportedLocale(segment) ? segment : locales[0];
  }, [pathname]);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      return;
    }

    navigator.serviceWorker.register('/sw.js').catch(() => {
      return;
    });
  }, []);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!installPrompt) {
      return;
    }

    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  }

  if (!installPrompt) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleInstall}
      className="fixed bottom-5 right-5 z-[80] inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7a66f2,#8c71ff)] px-6 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(122,102,242,0.24)] transition hover:brightness-105"
    >
      {installLabels[localeFromPath]}
    </button>
  );
}
