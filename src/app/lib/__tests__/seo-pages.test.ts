import { describe, expect, it } from 'vitest';
import sitemap from '../../sitemap';
import { locales } from '../i18n';
import { absoluteUrl, siteKeywords } from '../site';
import { seoPageDetails } from '../seo-page-details';
import { buildTrustMetadata, trustPages } from '../trust-pages';
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

  it('publishes trust pages and excludes unsupported capability notices', () => {
    const sitemapPaths = new Set(
      sitemap().map((entry) => new URL(entry.url).pathname)
    );

    for (const page of Object.values(trustPages)) {
      expect(sitemapPaths.has(`/${page.slug}`), page.slug).toBe(true);
    }

    expect(sitemapPaths.has('/story-downloader')).toBe(false);
    expect(sitemapPaths.has('/profile-picture-downloader')).toBe(false);
  });

  it('keeps trust metadata unique and canonical', () => {
    const pages = Object.values(trustPages);
    const descriptions = pages.map((page) => page.description);
    const titles = pages.map((page) => page.title);

    expect(uniqueCount(descriptions)).toBe(pages.length);
    expect(uniqueCount(titles)).toBe(pages.length);

    for (const page of pages) {
      const metadata = buildTrustMetadata(page);
      expect(metadata.alternates?.canonical).toBe(`/${page.slug}`);
    }
  });

  it('adds substantive details to core tools without advertising unsupported features', () => {
    const coreToolSlugs = [
      'instagram-post-downloader',
      'instagram-video-downloader',
      'instagram-reel-downloader',
      'instagram-photo-downloader',
      'instagram-carousel-downloader',
    ];

    for (const slug of coreToolSlugs) {
      expect(seoPageDetails[slug]?.length, slug).toBeGreaterThanOrEqual(3);
    }

    expect(siteKeywords).not.toContain('instagram story downloader');
    expect(siteKeywords).not.toContain('download instagram story');
  });
});
