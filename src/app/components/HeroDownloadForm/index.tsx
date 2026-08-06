'use client';

import { lazy, Suspense, useState, type FormEvent } from 'react';
import {
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
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloaderStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const isLoading = status === 'loading';

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!url.trim()) {
      setStatus('error');
      setErrorMessage(copy.validations.required);
      setMedia([]);
      return;
    }

    let normalizedUrl = '';
    try {
      normalizedUrl = normalizeSupportedMediaUrl(url);
    } catch {
      setStatus('error');
      setErrorMessage(copy.validations.unsupported);
      setMedia([]);
      trackAnalyticsEvent('downloader_form_submit_invalid_url', {
        source: 'hero_download_form',
      });
      return;
    }

    setUrl(normalizedUrl);
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

  function handleUrlChange(nextUrl: string) {
    setUrl(nextUrl);

    if (status !== 'idle') {
      setStatus('idle');
      setErrorMessage('');
      setMedia([]);
    }
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-3xl">
      <div className="hero-download-shell">
        <form
          className="hero-download-form w-full"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="hero-search-surface">
            <div className="hero-search-frame flex flex-col gap-3 md:flex-row md:items-center">
              <div className="hero-download-field relative flex-1">
                <IconGlyph
                  className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400"
                  name="link"
                />
                <input
                  aria-describedby={status === 'error' ? 'hero-download-error' : undefined}
                  aria-invalid={status === 'error'}
                  aria-label="Public media URL"
                  autoComplete="off"
                  className="hero-download-input w-full pl-11 pr-4"
                  inputMode="url"
                  onChange={(event) => handleUrlChange(event.target.value)}
                  placeholder={copy.inputPlaceholder}
                  type="url"
                  value={url}
                />
              </div>

              <button
                className="hero-download-button w-full md:w-auto"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                ) : null}
                {isLoading ? copy.buttonLoading : copy.buttonDownload}
              </button>
            </div>
          </div>
        </form>

        <p className="hero-download-note">{copy.note}</p>

        <div className="hero-format-rail">
          {formats.map((item) => (
            <span key={item} className="hero-format-pill">
              {item}
            </span>
          ))}
        </div>

        <div aria-live="polite" className="w-full">
          {status === 'success' ? (
            <Suspense fallback={<MediaPreviewGridFallback />}>
              <InstagramMediaPreviewGrid media={media} />
            </Suspense>
          ) : null}

          {status === 'error' && errorMessage ? (
            <div
              className="hero-download-alert mt-4 text-left text-sm font-medium text-red-800"
              id="hero-download-error"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
