'use client';

import { lazy, Suspense, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import {
  isSupportedMediaUrl,
  normalizeSupportedMediaUrl,
  type MediaItem,
} from '../../lib/media';
import { trackAnalyticsEvent } from '../../lib/analytics';
import IconGlyph from '../IconGlyph';

const InstagramMediaPreviewGrid = lazy(() => import('../InstagramMediaPreviewGrid'));

type DownloaderStatus = 'idle' | 'loading' | 'success' | 'error';

export interface HeroDownloadFormCopy {
  buttonDownload: string;
  buttonLoading: string;
  errors: {
    fetchFailure: string;
    noMediaFound: string;
  };
  inputPlaceholder: string;
  note: string;
  validations: {
    required: string;
    unsupported: string;
  };
}

interface HeroDownloadFormProps {
  copy: HeroDownloadFormCopy;
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

function MediaPreviewGridFallback() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white p-3"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
          </div>
          <div className="mb-4 h-56 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-11 animate-pulse rounded-lg bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default function HeroDownloadForm({ copy, formats }: HeroDownloadFormProps) {
  const [form] = Form.useForm<FormValues>();
  const [status, setStatus] = useState<DownloaderStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const isLoading = status === 'loading';

  async function handleFinish(values: FormValues) {
    let normalizedUrl = '';
    try {
      normalizedUrl = normalizeSupportedMediaUrl(values.url);
    } catch {
      setStatus('error');
      setErrorMessage(copy.validations.unsupported);
      trackAnalyticsEvent('downloader_form_submit_invalid_url', {
        source: 'hero_download_form',
      });
      return;
    }

    form.setFieldsValue({ url: normalizedUrl });
    setStatus('loading');
    setErrorMessage('');
    setMedia([]);
    trackAnalyticsEvent('downloader_form_submit', {
      source: 'hero_download_form',
    });

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
        throw new Error((data as ApiErrorResponse).error || copy.errors.fetchFailure);
      }

      const mediaItems = Array.isArray((data as ApiSuccessResponse).media)
        ? ((data as ApiSuccessResponse).media as MediaItem[])
        : [];

      if (!mediaItems.length) {
        throw new Error(copy.errors.noMediaFound);
      }

      setMedia(mediaItems);
      setStatus('success');
      trackAnalyticsEvent('media_extraction_success', {
        media_count: mediaItems.length,
        source: 'hero_download_form',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : copy.errors.fetchFailure
      );
      trackAnalyticsEvent('media_extraction_failed', {
        source: 'hero_download_form',
      });
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
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <div className="hero-download-shell">
        <Form<FormValues>
          form={form}
          className="hero-download-form w-full"
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
          requiredMark={false}
          validateTrigger={['onChange', 'onBlur', 'onSubmit']}
        >
          <div className="hero-search-surface">
            <div className="hero-search-frame flex flex-col gap-3 md:flex-row md:items-center">
              <Form.Item<FormValues>
                className="hero-download-field !mb-0 flex-1"
                help={null}
                name="url"
                rules={[
                  {
                    required: true,
                    message: copy.validations.required,
                  },
                  {
                    validator: async (_, value: string | undefined) => {
                      if (!value || isSupportedMediaUrl(value)) {
                        return;
                      }

                      throw new Error(copy.validations.unsupported);
                    },
                  },
                ]}
              >
                <Input
                  allowClear
                  autoComplete="off"
                  className="hero-download-input !w-full"
                  placeholder={copy.inputPlaceholder}
                  prefix={<IconGlyph name="link" className="h-4 w-4" />}
                  size="large"
                />
              </Form.Item>

              <Button
                className="hero-download-button w-full md:w-auto"
                htmlType="submit"
                loading={isLoading}
                type="primary"
              >
                {isLoading ? copy.buttonLoading : copy.buttonDownload}
              </Button>
            </div>
          </div>
        </Form>

        <p className="hero-download-note">
          {copy.note}
        </p>

        <div className="hero-format-rail">
          {formats.map((item) => (
            <span
              key={item}
              className="hero-format-pill"
            >
              {item}
            </span>
          ))}
        </div>

        {status === 'success' ? (
          <Suspense fallback={<MediaPreviewGridFallback />}>
            <InstagramMediaPreviewGrid media={media} />
          </Suspense>
        ) : null}

        {status === 'error' && errorMessage ? (
          <Alert
            className="hero-download-alert mt-4"
            message={errorMessage}
            showIcon
            type="error"
          />
        ) : null}
      </div>
    </div>
  );
}
