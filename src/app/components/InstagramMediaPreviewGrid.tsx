'use client';

import { useEffect, useState } from 'react';
import { Button, Card, Tag } from 'antd';
import type { MediaItem } from '../lib/media';

interface InstagramMediaPreviewGridProps {
  media: MediaItem[];
}

export default function InstagramMediaPreviewGrid({ media }: InstagramMediaPreviewGridProps) {
  const [downloading, setDownloading] = useState<Record<number, boolean>>({});
  const [imagePreviewMode, setImagePreviewMode] = useState<Record<number, 'proxy' | 'direct' | 'unavailable'>>({});

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

  const handleDownload = async (item: MediaItem, index: number) => {
    setDownloading((prev) => ({ ...prev, [index]: true }));
    const provider = item.provider ?? 'instagram';
    const ext = item.type === 'video' ? 'mp4' : 'jpg';
    const filename = `${provider}-media-${index + 1}.${ext}`;
    const downloadUrl = getDownloadUrl(item);

    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      triggerBrowserDownload(blobUrl, filename);
      URL.revokeObjectURL(blobUrl);
    } catch {
      triggerBrowserDownload(downloadUrl, filename);
    } finally {
      setDownloading((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((item, index) => (
        <Card
          key={`${item.type}-${index}`}
          className="hero-media-card overflow-hidden rounded-[28px] border border-white/70 bg-white/80 shadow-[0_20px_48px_rgba(110,91,243,0.12)]"
          styles={{body:{padding: 12}}}
     
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#241c4c]">Media {index + 1}</h3>
            <div className="flex items-center gap-2">
              {item.provider ? <Tag>{item.provider.toUpperCase()}</Tag> : null}
              <Tag color={item.type === 'video' ? 'processing' : 'success'}>
                {item.type.toUpperCase()}
              </Tag>
            </div>
          </div>

          <div className="mb-4 overflow-hidden rounded-[20px] bg-[#f5f1ff]">
            {item.type === 'video' ? (
              <video
                controls
                poster={item.thumbnailUrl}
                src={item.url}
                className="h-56 w-full object-cover"
              />
            ) : imagePreviewMode[index] === 'unavailable' ? (
              <div className="flex h-56 w-full items-center justify-center bg-[linear-gradient(135deg,#f7f2ff,#ece8ff)] px-6 text-center text-sm font-medium text-[#6f6893]">
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
            className="hero-media-download-button"
            onClick={() => handleDownload(item, index)}
          >
            {downloading[index] ? 'Downloading...' : 'Download'}
          </Button>
        </Card>
      ))}
    </div>
  );
}
