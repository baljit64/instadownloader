'use client';

import { useState, type ChangeEvent, type DragEvent } from 'react';

interface UploadDropzoneProps {
  accept: string;
  multiple: boolean;
  onFilesChange: (files: File[]) => void;
}

export default function UploadDropzone({ accept, multiple, onFilesChange }: UploadDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);

  function process(event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLDivElement>) {
    const selected = (event as ChangeEvent<HTMLInputElement>).target?.files
      ? Array.from((event as ChangeEvent<HTMLInputElement>).target.files || [])
      : Array.from((event as DragEvent<HTMLDivElement>).dataTransfer.files || []);

    onFilesChange(selected);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        process(e);
      }}
      className={`rounded-xl border-2 border-dashed p-4 text-center transition ${
        dragOver ? 'border-accent bg-paper/80' : 'border-slate-300'
      }`}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => process(e)}
        className="hidden"
        id="upload-input"
      />
      <label
        htmlFor="upload-input"
        className="block cursor-pointer rounded-lg bg-ink text-paper py-3 px-4"
      >
        Drag & drop or click to upload
      </label>
      <p className="mt-2 text-sm text-slate-500">Supported: {accept}</p>
    </div>
  );
}
