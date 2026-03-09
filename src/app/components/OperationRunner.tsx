'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import UploadDropzone from './UploadDropzone';
import ProgressBar from './ProgressBar';
import ErrorAlert from './ErrorAlert';
import { uploadFile, getJobStatus } from '@/app/lib/api';
import { useAuth } from '@/app/lib/auth-context';
import type { JobResponse, JobStatusResponse, OperationField } from '@/app/lib/types';

type StartFunction = (
  fileIds: string[],
  values: Record<string, string>
) => Promise<JobResponse>;

interface OperationRunnerProps {
  title: string;
  description: string;
  accept: string;
  multiple: boolean;
  fields?: OperationField[];
  startJob: StartFunction;
}

export default function OperationRunner({
  title,
  description,
  accept,
  multiple,
  fields = [],
  startJob,
}: OperationRunnerProps) {
  const { user, loading: authLoading } = useAuth();

  const defaultFieldValues = fields.reduce<Record<string, string>>(
    (acc, field) => ({ ...acc, [field.name]: field.defaultValue || '' }),
    {}
  );

  const [files, setFiles] = useState<File[]>([]);
  const [fieldValues, setFieldValues] = useState(defaultFieldValues);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processProgress, setProcessProgress] = useState('');
  const [error, setError] = useState('');
  const [job, setJob] = useState<JobStatusResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [jobUrl, setJobUrl] = useState('');

  function updateField(fieldName: string, value: string) {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
  }

  async function pollStatus(jobId: string) {
    for (let i = 0; i < 120; i += 1) {
      const status = await getJobStatus(jobId);
      setJob(status);

      if (status.status === 'completed') {
        setProcessProgress('Completed');
        setJobUrl(status.downloadUrl || '');
        return;
      }

      if (status.status === 'failed') {
        throw new Error('Processing failed');
      }

      setProcessProgress(`Processing... ${status.status}`);
      await new Promise((resolve) => setTimeout(resolve, 1200));
    }

    throw new Error('Job timed out');
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      setError('Please sign in to process files.');
      return;
    }

    if (!files.length) {
      setError('Please upload at least one file.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setUploadProgress(0);
    setProcessProgress('Uploading files');

    try {
      const fileIds: string[] = [];

      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];
        const uploadedFile = await uploadFile(file, (percent) =>
          setUploadProgress((i / files.length) * 100 + percent / files.length)
        );
        fileIds.push(uploadedFile.fileId);
      }

      setProcessProgress('Starting processing job');
      const jobResponse = await startJob(fileIds, fieldValues);
      setUploadProgress(100);

      setProcessProgress('Queued. Polling status.');
      await pollStatus(jobResponse.jobId);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-3xl mx-auto rounded-2xl bg-white p-6 shadow-lg border">
      <h1 className="text-2xl font-bold text-ink">{title}</h1>
      <p className="text-slate-500 mt-1">{description}</p>
      {!authLoading && !user ? (
        <p className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          You need to{' '}
          <Link href="/login" className="font-semibold underline">
            login
          </Link>{' '}
          before running this tool.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <UploadDropzone accept={accept} multiple={multiple} onFilesChange={setFiles} />

        {fields.map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="text-sm text-ink">{field.label}</label>
            {field.type === 'select' ? (
              <select
                className="w-full rounded-lg border border-slate-300 p-2"
                value={fieldValues[field.name]}
                onChange={(event) => updateField(field.name, event.target.value)}
                required={field.required}
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="w-full rounded-lg border border-slate-300 p-2"
                type={field.type}
                value={fieldValues[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(event) => updateField(field.name, event.target.value)}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting || authLoading || !user}
          className="w-full rounded-xl bg-accent text-paper py-3 font-semibold disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Run'}
        </button>
      </form>

      <div className="mt-4 space-y-2">
        <ProgressBar value={uploadProgress} />
        <div className="text-sm text-slate-600">{processProgress}</div>
        {job && <div className="text-sm">Status: {job.status}</div>}
        {jobUrl ? (
          <a href={jobUrl} className="block text-accent underline" target="_blank" rel="noreferrer">
            Download result
          </a>
        ) : null}
      </div>

      {error ? <ErrorAlert message={error} /> : null}
    </section>
  );
}
