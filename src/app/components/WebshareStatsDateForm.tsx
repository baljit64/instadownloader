'use client';

import { useRef } from 'react';

interface WebshareStatsDateFormProps {
  initialDate: string;
  label: string;
  submitLabel: string;
}

export default function WebshareStatsDateForm({
  initialDate,
  label,
  submitLabel,
}: WebshareStatsDateFormProps) {
  const timezoneOffsetInputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
      method="get"
      onSubmit={() => {
        if (timezoneOffsetInputRef.current) {
          timezoneOffsetInputRef.current.value = String(new Date().getTimezoneOffset());
        }
      }}
    >
      <label className="flex flex-1 flex-col gap-2 text-left">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6e6a86]">
          {label}
        </span>
        <input
          className="h-12 rounded-2xl border border-[rgba(130,113,255,0.16)] bg-white/82 px-4 text-sm text-[#171923] outline-none transition focus:border-[#2d7cff]"
          defaultValue={initialDate}
          max={initialDate}
          name="date"
          required
          type="date"
        />
      </label>
      <input defaultValue="0" name="tzOffsetMinutes" ref={timezoneOffsetInputRef} type="hidden" />
      <button
        className="inline-flex h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2d7cff,#66a6ff)] px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(45,124,255,0.22)] transition hover:brightness-105"
        type="submit"
      >
        {submitLabel}
      </button>
    </form>
  );
}
