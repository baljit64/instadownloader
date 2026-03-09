export interface UploadedFile {
  fileId: string;
  filename: string;
  status: string;
}

export interface JobResponse {
  jobId: string;
  status: string;
  jobType: string;
}

export interface JobStatusResponse {
  id: string;
  fileId: string | null;
  status: string;
  jobType: string;
  resultPath: string | null;
  createdAt: string;
  downloadUrl?: string;
}

export interface OperationField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}
