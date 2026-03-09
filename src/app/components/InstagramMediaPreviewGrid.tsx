'use client';

import { useState } from 'react';
import { Button, Card, Tag } from 'antd';
import type { InstagramMediaItem } from '../lib/instagram';

interface InstagramMediaPreviewGridProps {
  media: InstagramMediaItem[];
}

export default function InstagramMediaPreviewGrid({ media }: InstagramMediaPreviewGridProps) {
  const [downloading, setDownloading] = useState<Record<number, boolean>>({});

  const handleDownload = async (item: InstagramMediaItem, index: number) => {
    setDownloading((prev) => ({ ...prev, [index]: true }));

    try {
      const proxyUrl = `/api/instagram-download-proxy?url=${encodeURIComponent(item.url)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const ext = item.type === 'video' ? 'mp4' : 'jpg';
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobUrl;
      anchor.download = `instagram-media-${index + 1}.${ext}`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(blobUrl);
    } catch {
      const fallbackUrl = `/api/instagram-download-proxy?url=${encodeURIComponent(item.url)}`;
      window.location.href = fallbackUrl;
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
          bodyStyle={{ padding: 12 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#241c4c]">Media {index + 1}</h3>
            <Tag color={item.type === 'video' ? 'processing' : 'success'}>
              {item.type.toUpperCase()}
            </Tag>
          </div>

          <div className="mb-4 overflow-hidden rounded-[20px] bg-[#f5f1ff]">
            {item.type === 'video' ? (
              <video controls src={item.url} className="h-56 w-full object-cover" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.url} alt={`Instagram media ${index + 1}`} className="h-56 w-full object-cover" />
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
