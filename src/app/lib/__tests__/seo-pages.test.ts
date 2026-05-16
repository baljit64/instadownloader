import { describe, expect, it } from 'vitest';
import sitemap from '../../sitemap';
import { activeSeoPages, buildSeoPageMetadata, seoPageMap, seoPages } from '../seo-pages';

function uniqueCount(values: string[]): number {
  return new Set(values).size;
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

      expect(metadata.alternates?.canonical).toBe(page.canonicalTarget);
      expect(metadata.robots?.index).toBe(expectedIndexable);
      expect(metadata.robots?.follow).toBe(expectedIndexable);
      expect(metadata.robots?.googleBot?.index).toBe(expectedIndexable);
      expect(metadata.robots?.googleBot?.follow).toBe(expectedIndexable);
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
});
