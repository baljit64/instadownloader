import type { JobResponse, JobStatusResponse, UploadedFile } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `Request failed with ${res.status}`);
  }
  return res.json();
}

export async function uploadFile(
  file: File,
  onProgress?: (percent: number) => void
): Promise<UploadedFile> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const data = new FormData();
    data.append('file', file);

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (!event.total) return;
        onProgress(Math.round((event.loaded / event.total) * 100));
      };
    }

    xhr.onreadystatechange = async () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          if (xhr.status >= 200 && xhr.status < 300) {
            const payload = JSON.parse(xhr.responseText);
            resolve(payload as UploadedFile);
          } else {
            reject(new Error(xhr.responseText || `Upload failed ${xhr.status}`));
          }
        } catch {
          reject(new Error('Invalid upload response'));
        }
      }
    };

    xhr.open('POST', `${API_BASE}/upload`, true);
    xhr.send(data);
  });
}

export async function startMerge(fileIds: string[]): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/merge`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileIds }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startSplit(fileId: string, ranges: string): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/split`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, ranges }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startCompress(fileId: string): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/compress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startPdfToJpg(fileId: string): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/pdf-to-jpg`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startJpgToPdf(fileIds: string[]): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/jpg-to-pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileIds }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startRotate(fileId: string, degrees: number): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/rotate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, degrees }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startWatermark(fileId: string, text: string, opacity?: number, size?: number): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/watermark`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, text, opacity, size }),
  });
  return parseResponse<JobResponse>(res);
}

export async function startPageNumbers(fileId: string, startAt: number): Promise<JobResponse> {
  const res = await fetch(`${API_BASE}/add-page-numbers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileId, startAt }),
  });
  return parseResponse<JobResponse>(res);
}

export async function getJobStatus(jobId: string): Promise<JobStatusResponse> {
  const res = await fetch(`${API_BASE}/jobs/${jobId}`);
  return parseResponse<JobStatusResponse>(res);
}
