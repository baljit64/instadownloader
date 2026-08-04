import { describe, expect, it } from 'vitest';
import sitemap from '../../sitemap';
import { locales } from '../i18n';
import { absoluteUrl } from '../site';
import {
  DEFAULT_REVIEW_DATE,
  activeSeoPages,
  buildSeoPageMetadata,
  seoPageMap,
  seoPages,
} from '../seo-pages';

function uniqueCount(values: string[]): number {
  return new Set(values).size;
}

function toIsoDate(value: string): string {
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

describe('seo page governance', () => {
  it('uses title and description guardrails for every seo page', () => {
    for (const page of seoPages) {
      expect(page.metadataTitle.length).toBeGreaterThanOrEqual(20);
      expect(page.metadataTitle.length).toBeLessThanOrEqual(60);
      expect(page.metadataDescription.length).toBeGreaterThanOrEqual(100);
      expect(page.metadataDescription.length).toBeLessThanOrEqual(160);
    }
  });

  it('keeps metadata unique for active pages', () => {
    const activeTitles = activeSeoPages.map((page) => page.metadataTitle);
    const activeDescriptions = activeSeoPages.map((page) => page.metadataDescription);

    expect(uniqueCount(activeTitles)).toBe(activeTitles.length);
    expect(uniqueCount(activeDescriptions)).toBe(activeDescriptions.length);
  });

  it('enforces canonical governance for active and pruned pages', () => {
    for (const page of seoPages) {
      expect(page.canonicalTarget.startsWith('/')).toBe(true);
      expect(page.lastReviewedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);

      if (page.status === 'active') {
        expect(page.canonicalTarget).toBe(`/${page.slug}`);
      } else {
        expect(page.canonicalTarget).toBe('/en');
      }
    }
  });

  it('builds canonical and robots metadata from governance status', () => {
    for (const page of seoPages) {
      const metadata = buildSeoPageMetadata(page);
      const expectedIndexable = page.status === 'active';
      const robots = metadata.robots;
      const openGraph = metadata.openGraph as {
        modifiedTime?: string;
        publishedTime?: string;
        type?: string;
        url?: string | URL;
      };

      if (!robots || typeof robots === 'string') {
        throw new Error(`Expected object robots metadata for ${page.slug}`);
      }
      const googleBot = robots.googleBot;

      if (!googleBot || typeof googleBot === 'string') {
        throw new Error(`Expected object Googlebot metadata for ${page.slug}`);
      }

      expect(metadata.alternates?.canonical).toBe(page.canonicalTarget);
      expect(robots.index).toBe(expectedIndexable);
      expect(robots.follow).toBe(expectedIndexable);
      expect(googleBot.index).toBe(expectedIndexable);
      expect(googleBot.follow).toBe(expectedIndexable);
      expect(openGraph.url).toBe(absoluteUrl(page.canonicalTarget));

      if (page.type === 'guide') {
        expect(openGraph.type).toBe('article');
        expect(openGraph.publishedTime).toBe(toIsoDate(page.lastReviewedAt));
        expect(openGraph.modifiedTime).toBe(toIsoDate(page.lastReviewedAt));
      } else {
        expect(openGraph.type).toBe('website');
      }
    }
  });

  it('ensures related slugs are valid and active', () => {
    for (const page of seoPages) {
      for (const relatedSlug of page.relatedSlugs) {
        const relatedPage = seoPageMap[relatedSlug];
        expect(relatedPage, `${page.slug} -> ${relatedSlug}`).toBeDefined();
        expect(relatedPage?.status, `${page.slug} -> ${relatedSlug}`).toBe('active');
      }
    }
  });

  it('includes only active seo pages in sitemap', () => {
    const entries = sitemap();
    const sitemapPaths = new Set(entries.map((entry) => new URL(entry.url).pathname));

    for (const page of activeSeoPages) {
      expect(sitemapPaths.has(`/${page.slug}`), page.slug).toBe(true);
    }

    for (const page of seoPages.filter((item) => item.status === 'pruned')) {
      expect(sitemapPaths.has(`/${page.slug}`), page.slug).toBe(false);
    }
  });

  it('publishes consistent lastModified values in sitemap', () => {
    const entries = sitemap();
    const entriesByPath = new Map(
      entries.map((entry) => [new URL(entry.url).pathname, entry])
    );
    const defaultLastModified = new Date(
      `${DEFAULT_REVIEW_DATE}T00:00:00.000Z`
    ).toISOString();

    for (const locale of locales) {
      const localeEntry = entriesByPath.get(`/${locale}`);
      expect(localeEntry).toBeDefined();
      expect(localeEntry?.lastModified).toBeInstanceOf(Date);
      expect((localeEntry?.lastModified as Date).toISOString()).toBe(defaultLastModified);
    }

    for (const page of activeSeoPages) {
      const seoEntry = entriesByPath.get(`/${page.slug}`);
      expect(seoEntry).toBeDefined();
      expect(seoEntry?.lastModified).toBeInstanceOf(Date);
      expect((seoEntry?.lastModified as Date).toISOString()).toBe(
        toIsoDate(page.lastReviewedAt)
      );
    }
  });
});
