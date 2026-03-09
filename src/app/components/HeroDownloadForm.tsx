'use client';

import { useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import {
  isSupportedMediaUrl,
  normalizeSupportedMediaUrl,
  type MediaItem,
} from '../lib/media';
import IconGlyph from './IconGlyph';
import InstagramMediaPreviewGrid from './InstagramMediaPreviewGrid';

type DownloaderStatus = 'idle' | 'loading' | 'success' | 'error';

interface HeroDownloadFormProps {
  formats: string[];
}

interface FormValues {
  url: string;
}

interface ApiSuccessResponse {
  media?: MediaItem[];
}

interface ApiErrorResponse {
  error?: string;
}

export default function HeroDownloadForm({ formats }: HeroDownloadFormProps) {
  const [form] = Form.useForm<FormValues>();
  const [status, setStatus] = useState<DownloaderStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);

  const isLoading = status === 'loading';

  async function handleFinish(values: FormValues) {
    const normalizedUrl = normalizeSupportedMediaUrl(values.url);

    form.setFieldsValue({ url: normalizedUrl });
    setStatus('loading');
    setErrorMessage('');
      setMedia([]);

    try {
      const response = await fetch('/api/media-extract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: normalizedUrl }),
      });

      const data = (await response.json()) as ApiSuccessResponse | ApiErrorResponse;

      if (!response.ok) {
        throw new Error((data as ApiErrorResponse).error || 'Unable to fetch Instagram media.');
      }

      const mediaItems = Array.isArray((data as ApiSuccessResponse).media)
        ? ((data as ApiSuccessResponse).media as MediaItem[])
        : [];

      if (!mediaItems.length) {
        throw new Error('No downloadable media was found for this URL.');
      }

      setMedia(mediaItems);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to fetch media.'
      );
    }
  }

  function handleValuesChange() {
    if (status !== 'idle') {
      setStatus('idle');
      setErrorMessage('');
      setMedia([]);
    }
  }

  return (
    <div className="mt-10 w-full max-w-3xl">
      <div className="hero-download-shell">
        <Form<FormValues>
          form={form}
          className="hero-download-form"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
          requiredMark={false}
          validateTrigger={['onChange', 'onBlur', 'onSubmit']}
        >
          <div className="hero-search-frame flex flex-col gap-3 md:flex-row md:items-start">
            <Form.Item<FormValues>
              className="hero-download-field !mb-0 flex-1"
              name="url"
              rules={[
                {
                  required: true,
                  message: 'Paste a supported public media URL first.',
                },
                {
                  validator: async (_, value: string | undefined) => {
                    if (!value || isSupportedMediaUrl(value)) {
                      return;
                    }

                    throw new Error(
                      'Use a public Instagram, YouTube, TikTok, Facebook, X, or Pinterest link.'
                    );
                  },
                },
              ]}
            >
              <Input
                allowClear
                autoComplete="off"
                className="hero-download-input !w-full"
                placeholder="Paste the media link here"
                prefix={<span>URL</span>}
                size="large"
              />
            </Form.Item>

            <span
              aria-hidden="true"
              className="hero-download-helper-icon"
            >
              <IconGlyph name="link" className="h-5 w-5" />
            </span>

            <Button
              className="hero-download-button w-full md:w-auto"
              htmlType="submit"
              loading={isLoading}
              type="primary"
            >
              {isLoading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
        </Form>

        <p className="mt-4 text-center text-sm leading-6 text-[#736b94]">
          By using this service you accept our <span className="font-semibold text-[#2d7cff]">Terms of Service</span> and{" "}
          <span className="font-semibold text-[#2d7cff]">Privacy Policy</span>.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm text-[#7d759d]">
          {formats.map((item) => (
            <span
              key={item}
              className="hero-format-pill"
            >
              {item}
            </span>
          ))}
        </div>

        {/* <div className="hero-promo-banner mt-6">
          <div className="hero-promo-mark" aria-hidden="true">
            <IconGlyph name="download" className="h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-semibold text-white">Instagram Downloader</p>
            <p className="text-sm text-white/70">
              Paste a public post or reel URL and fetch the media instantly.
            </p>
          </div>
          <div className="hero-promo-chip">Preview Ready</div>
        </div> */}

        <div className="mt-4 flex flex-col gap-3 px-1 text-sm text-[#7d759d] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/80 bg-white/75 px-3 py-1.5 font-medium shadow-[0_8px_18px_rgba(104,84,255,0.06)]">
              No login required
            </span>
            <span className="rounded-full border border-white/80 bg-white/75 px-3 py-1.5 font-medium shadow-[0_8px_18px_rgba(104,84,255,0.06)]">
              Instagram, YouTube, TikTok, Facebook, X, Pinterest
            </span>
          </div>

          <button className="font-semibold text-[#6557d8]" type="button">
            Results appear below
          </button>
        </div>

        {status === 'error' && errorMessage ? (
          <Alert
            className="hero-download-alert mt-4"
            message={errorMessage}
            showIcon
            type="error"
          />
        ) : null}
      </div>

      {status === 'success' ? <InstagramMediaPreviewGrid media={media} /> : null}
    </div>
  );
}
