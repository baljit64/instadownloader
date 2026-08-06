import { describe, expect, it } from 'vitest';
import sitemap from '../../sitemap';
import {
  buildLocaleAlternates,
  detectPreferredLocale,
  getDictionary,
  localeInfo,
  locales,
} from '../i18n';

describe('international locale coverage', () => {
  it('publishes the complete 30-language set', () => {
    expect(locales).toHaveLength(30);
    expect(new Set(locales).size).toBe(30);

    for (const locale of locales) {
      expect(localeInfo[locale].nativeName).toBeTruthy();
      expect(getDictionary(locale).metadata.homeTitle).toBeTruthy();
      expect(getDictionary(locale).hero.buttonDownload).toBeTruthy();
    }
  });

  it('uses correct language tags and text directions', () => {
    const alternates = buildLocaleAlternates();

    expect(alternates['zh-CN']).toMatch(/\/zh-cn$/);
    expect(alternates['zh-TW']).toMatch(/\/zh-tw$/);
    expect(alternates.nb).toMatch(/\/nb$/);
    expect(alternates.cs).toMatch(/\/cs$/);
    expect(localeInfo.ar.dir).toBe('rtl');
    expect(localeInfo.he.dir).toBe('rtl');
    expect(localeInfo.fa.dir).toBe('rtl');
  });

  it('detects full tags and common language aliases', () => {
    expect(detectPreferredLocale('de-DE,de;q=0.9')).toBe('de');
    expect(detectPreferredLocale('zh-Hans-CN,zh;q=0.9')).toBe('zh-cn');
    expect(detectPreferredLocale('zh-Hant-TW,zh;q=0.9')).toBe('zh-tw');
    expect(detectPreferredLocale('no-NO,no;q=0.9')).toBe('nb');
    expect(detectPreferredLocale('ar-SA,ar;q=0.9')).toBe('ar');
  });

  it('includes every localized homepage and alternate in the sitemap', () => {
    const entries = sitemap();
    const localizedEntries = entries.filter((entry) =>
      locales.some((locale) => new URL(entry.url).pathname === `/${locale}`)
    );

    expect(localizedEntries).toHaveLength(locales.length);

    for (const entry of localizedEntries) {
      expect(Object.keys(entry.alternates?.languages ?? {})).toHaveLength(
        locales.length + 1
      );
    }
  });
});
