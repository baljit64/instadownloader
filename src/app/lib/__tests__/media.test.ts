import { describe, expect, it } from 'vitest';
import { detectSupportedPlatform, normalizeSupportedMediaUrl } from '../media';

describe('media url helpers', () => {
  it('rejects non-http protocols', () => {
    expect(detectSupportedPlatform('javascript:alert(1)')).toBeNull();
    expect(detectSupportedPlatform('https://user:pass@instagram.com/p/abc/')).toBeNull();
    expect(() => normalizeSupportedMediaUrl('ftp://example.com/video')).toThrow();
    expect(() =>
      normalizeSupportedMediaUrl('https://user:pass@instagram.com/p/abc/')
    ).toThrow();
  });

  it('detects supported platforms', () => {
    expect(detectSupportedPlatform('https://www.instagram.com/p/abc123/')).toBe('instagram');
    expect(detectSupportedPlatform('https://youtu.be/xyz987')).toBe('youtube');
  });

  it('normalizes Instagram and YouTube URLs', () => {
    expect(
      normalizeSupportedMediaUrl('https://www.instagram.com/reels/abc123/?utm_source=test')
    ).toBe('https://www.instagram.com/reel/abc123/');

    expect(normalizeSupportedMediaUrl('https://youtu.be/xyz987')).toBe(
      'https://www.youtube.com/watch?v=xyz987'
    );
  });
});
