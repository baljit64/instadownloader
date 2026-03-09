'use client';

import { useState, type FormEvent } from 'react';
import { InstagramMediaItem, isValidInstagramPostUrl } from '../lib/instagram';
import { Spin, Button,Typography, Card, Input, Alert } from 'antd';
import InstagramMediaPreviewGrid from './InstagramMediaPreviewGrid';


type DownloaderStatus = 'idle' | 'loading' | 'success' | 'error';

interface ApiSuccessResponse {
  media: InstagramMediaItem[];
}

interface ApiErrorResponse {
  error?: string;
}

const { Paragraph } = Typography;

export default function InstagramDownloaderTool() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloaderStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [media, setMedia] = useState<InstagramMediaItem[]>([]);

  const isLoading = status === 'loading';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = url.trim();
    if (!isValidInstagramPostUrl(trimmed)) {
      setStatus('error');
      setErrorMessage('Invalid URL. Please enter a valid Instagram post link.');
      setMedia([]);
      return;
    }

    setStatus('loading');
    setErrorMessage('');
    setMedia([]);

    try {
      const response = await fetch('/api/instagram-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: trimmed }),
      });

      const data = (await response.json()) as ApiSuccessResponse | ApiErrorResponse;

      if (!response.ok) {
        throw new Error((data as ApiErrorResponse).error || 'API request failed.');
      }

      const mediaItems = Array.isArray((data as ApiSuccessResponse).media)
        ? (data as ApiSuccessResponse).media
        : [];

      if (!mediaItems.length) {
        throw new Error('Media not available.');
      }

      setMedia(mediaItems);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'API request failed.');
    }
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <Card className="rounded-2xl border border-slate-200 shadow-sm" bodyStyle={{ padding: 20 }}>
        <Paragraph className="mb-3 font-semibold text-slate-700">Paste Instagram Post URL</Paragraph>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            size="large"
            placeholder="https://www.instagram.com/reel/xxxxx/"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="h-11"
          />
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="h-11 bg-[#e5322d] px-6 hover:!bg-[#cc2723]"
          >
            Download
          </Button>
        </form>

        {status === 'loading' ? (
          <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50 py-6">
            <Spin />
            <span className="text-sm text-slate-600">Fetching Instagram media...</span>
          </div>
        ) : null}

        {status === 'error' ? <Alert className="mt-6" type="error" message={errorMessage} showIcon /> : null}
      </Card>

      {status === 'success' ? <InstagramMediaPreviewGrid media={media} /> : null}
    </div>
  );
}
