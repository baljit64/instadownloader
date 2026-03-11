'use client';

import { lazy, Suspense, useDeferredValue, useState } from 'react';
import { Alert, Button, Form, Input } from 'antd';
import {
  isSupportedMediaUrl,
  normalizeSupportedMediaUrl,
  type MediaItem,
} from '../../lib/media';
import type { TranslationDictionary } from '../../lib/i18n';
import IconGlyph from '../IconGlyph';
import { getAssistantState } from './assistant-state';

const InstagramMediaPreviewGrid = lazy(() => import('../InstagramMediaPreviewGrid'));

type DownloaderStatus = 'idle' | 'loading' | 'success' | 'error';

interface HeroDownloadFormProps {
  copy: TranslationDictionary['hero'];
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
          className="hero-media-card overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-3 shadow-[0_20px_48px_rgba(110,91,243,0.12)]"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="h-4 w-20 animate-pulse rounded-full bg-[#ddd5ff]" />
            <div className="h-6 w-16 animate-pulse rounded-full bg-[#ebe6ff]" />
          </div>
          <div className="mb-4 h-56 animate-pulse rounded-[20px] bg-[linear-gradient(135deg,#f4efff,#ece8ff)]" />
          <div className="h-11 animate-pulse rounded-full bg-[linear-gradient(135deg,#7f71ff,#9b8cff)] opacity-75" />
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
  const watchedUrl = Form.useWatch('url', form) ?? '';
  const deferredUrl = useDeferredValue(watchedUrl);
  const assistantState = getAssistantState(copy, deferredUrl);

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
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : copy.errors.fetchFailure
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
    <div className="mx-auto mt-10 w-full max-w-3xl">
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

            <div className="hero-search-caption">
              <span>{copy.moreOptions}</span>
              <span aria-hidden="true">v</span>
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

        {/* <div
          className={`ai-assist-panel ai-assist-panel-${assistantState.tone}`}
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="ai-assist-badge">
              <span className="ai-assist-badge-dot" />
              {copy.aiAssist.badge}
            </span>
            {assistantState.chips.map((chip) => (
              <span key={chip} className="ai-assist-chip">
                {chip}
              </span>
            ))}
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold tracking-[-0.03em] text-[#17142d]">
            {assistantState.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#6d6885]">
            {assistantState.message}
          </p>
        </div> */}



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
