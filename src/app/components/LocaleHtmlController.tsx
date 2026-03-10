'use client';

import { useEffect } from 'react';

interface LocaleHtmlControllerProps {
  dir: 'ltr' | 'rtl';
  lang: string;
}

export default function LocaleHtmlController({
  dir,
  lang,
}: LocaleHtmlControllerProps) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [dir, lang]);

  return null;
}
