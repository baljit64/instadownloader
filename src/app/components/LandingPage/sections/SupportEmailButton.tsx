'use client';

const SUPPORT_EMAIL_CODES = [
  115, 117, 112, 112, 111, 114, 116, 64, 105, 103, 100, 111, 119, 110, 46,
  112, 114, 111,
] as const;

function getSupportEmail(): string {
  return String.fromCharCode(...SUPPORT_EMAIL_CODES);
}

interface SupportEmailButtonProps {
  className: string;
  label: string;
}

export default function SupportEmailButton({
  className,
  label,
}: SupportEmailButtonProps) {
  const handleClick = () => {
    window.location.href = `mailto:${getSupportEmail()}`;
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {label}
    </button>
  );
}
