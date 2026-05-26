'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Tag } from 'antd';
import { trackAnalyticsEvent } from '../lib/analytics';
import type { MediaItem } from '../lib/media';

interface InstagramMediaPreviewGridProps {
  media: MediaItem[];
}

export default function InstagramMediaPreviewGrid({ media }: InstagramMediaPreviewGridProps) {
  const [downloading, setDownloading] = useState<Record<number, boolean>>({});
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [imagePreviewMode, setImagePreviewMode] = useState<
    Record<number, 'proxy' | 'direct' | 'unavailable'>
  >({});
  const hasActiveSingleDownload = Object.values(downloading).some(Boolean);

  useEffect(() => {
    setImagePreviewMode({});
  }, [media]);

  const getProxyUrl = (url: string) =>
    `/api/instagram-download-proxy?url=${encodeURIComponent(url)}`;

  const getDownloadUrl = (item: MediaItem) => {
    const provider = item.provider ?? 'instagram';

    return `/api/media-download-proxy?url=${encodeURIComponent(item.url)}&provider=${encodeURIComponent(provider)}&type=${encodeURIComponent(item.type)}`;
  };

  const triggerBrowserDownload = (url: string, filename: string) => {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  const getImagePreviewUrl = (item: MediaItem, index: number) => {
    if (item.provider !== 'instagram') {
      return item.url;
    }

    return imagePreviewMode[index] === 'direct' ? item.url : getProxyUrl(item.url);
  };

  const handleImagePreviewError = (index: number) => {
    setImagePreviewMode((prev) => {
      const current = prev[index] ?? 'proxy';

      if (current === 'proxy') {
        return { ...prev, [index]: 'direct' };
      }

      if (current === 'direct') {
        return { ...prev, [index]: 'unavailable' };
      }

      return prev;
    });
  };

  const downloadMediaItem = async (
    item: MediaItem,
    index: number,
    source: 'preview_grid' | 'preview_grid_bulk'
  ) => {
    const provider = item.provider ?? 'instagram';
    const ext = item.type === 'video' ? 'mp4' : 'jpg';
    const filename = `${provider}-media-${index + 1}.${ext}`;
    const downloadUrl = getDownloadUrl(item);
    trackAnalyticsEvent('media_download_click', {
      media_type: item.type,
      provider,
      source,
    });

    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      triggerBrowserDownload(blobUrl, filename);
      URL.revokeObjectURL(blobUrl);
      trackAnalyticsEvent('media_download_success', {
        media_type: item.type,
        provider,
        source,
      });
    } catch {
      const fallbackUrl = item.url;
      triggerBrowserDownload(fallbackUrl, filename);
      trackAnalyticsEvent('media_download_fallback', {
        media_type: item.type,
        provider,
        source,
      });
    }
  };

  const handleDownload = async (item: MediaItem, index: number) => {
    if (downloadingAll) {
      return;
    }

    setDownloading((prev) => ({ ...prev, [index]: true }));
    try {
      await downloadMediaItem(item, index, 'preview_grid');
    } finally {
      setDownloading((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleDownloadAll = async () => {
    if (media.length < 2 || downloadingAll || hasActiveSingleDownload) {
      return;
    }

    setDownloadingAll(true);
    trackAnalyticsEvent('media_download_all_click', {
      media_count: media.length,
      source: 'preview_grid',
    });

    try {
      for (const [index, item] of media.entries()) {
        setDownloading((prev) => ({ ...prev, [index]: true }));
        await downloadMediaItem(item, index, 'preview_grid_bulk');
        setDownloading((prev) => ({ ...prev, [index]: false }));
      }

      trackAnalyticsEvent('media_download_all_success', {
        media_count: media.length,
        source: 'preview_grid',
      });
    } finally {
      setDownloadingAll(false);
    }
  };

  return (
    <div className="mt-8">
      {media.length > 1 ? (
        <div className="mb-4 flex justify-end">
          <Button
            type="primary"
            loading={downloadingAll}
            disabled={!downloadingAll && hasActiveSingleDownload}
            className="hero-media-download-button px-5"
            onClick={handleDownloadAll}
          >
            {downloadingAll ? 'Downloading all...' : `Download All (${media.length})`}
          </Button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {media.map((item, index) => (
          <Card
            key={`${item.type}-${index}`}
            className="hero-media-card overflow-hidden rounded-xl border bg-white"
            styles={{ body: { padding: 12 } }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Media {index + 1}</h3>
              <div className="flex items-center gap-2">
                {item.provider ? <Tag>{item.provider.toUpperCase()}</Tag> : null}
                <Tag color={item.type === 'video' ? 'processing' : 'success'}>
                  {item.type.toUpperCase()}
                </Tag>
              </div>
            </div>

            <div className="mb-4 overflow-hidden rounded-lg bg-slate-100">
              {item.type === 'video' ? (
                <video
                  controls
                  poster={item.thumbnailUrl}
                  src={item.url}
                  className="h-56 w-full object-cover"
                />
              ) : imagePreviewMode[index] === 'unavailable' ? (
                <div className="flex h-56 w-full items-center justify-center bg-slate-100 px-6 text-center text-sm font-medium text-slate-600">
                  Image preview unavailable. Use download to fetch the original file.
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImagePreviewUrl(item, index)}
                  alt={`Instagram media ${index + 1}`}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                  onError={() => handleImagePreviewError(index)}
                />
              )}
            </div>

            <Button
              type="primary"
              block
              loading={downloading[index]}
              disabled={downloadingAll}
              className="hero-media-download-button"
              onClick={() => handleDownload(item, index)}
            >
              {downloading[index] ? 'Downloading...' : 'Download'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
