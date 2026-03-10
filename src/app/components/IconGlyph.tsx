export type IconGlyphName =
  | 'instagram'
  | 'reel'
  | 'tv'
  | 'carousel'
  | 'link'
  | 'preview'
  | 'download'
  | 'mobile'
  | 'desktop'
  | 'fast'
  | 'shield'
  | 'sparkles'
  | 'code'
  | 'proxy'
  | 'post';

interface IconGlyphProps {
  className?: string;
  name: IconGlyphName;
  strokeWidth?: number;
}

export default function IconGlyph({
  className = 'h-6 w-6',
  name,
  strokeWidth = 1.9,
}: IconGlyphProps) {
  const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth,
  };

  switch (name) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="5" y="5" width="14" height="14" rx="4" {...strokeProps} />
          <circle cx="12" cy="12" r="3.2" {...strokeProps} />
          <circle cx="16.2" cy="7.8" r="1.1" fill="currentColor" />
        </svg>
      );
    case 'post':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="4" y="5" width="16" height="14" rx="3" {...strokeProps} />
          <circle cx="9" cy="10" r="1.4" fill="currentColor" />
          <path d="M7.5 16l3.4-3.6 2.6 2.4 2.9-3.2 2.1 4.4" {...strokeProps} />
        </svg>
      );
    case 'reel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="4" y="4.5" width="16" height="15" rx="3" {...strokeProps} />
          <path d="M4 9h16M9 4.5l3 4.5M14 4.5l3 4.5" {...strokeProps} />
          <path d="M10 11.5v4.2l4-2.1-4-2.1z" fill="currentColor" />
        </svg>
      );
    case 'tv':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M10 5.2 12 8l2-2.8" {...strokeProps} />
          <rect x="4" y="8" width="16" height="10" rx="2.5" {...strokeProps} />
          <path d="M10.5 11.2v3.6l3.6-1.8-3.6-1.8z" fill="currentColor" />
        </svg>
      );
    case 'carousel':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="7" y="6" width="11" height="13" rx="2.5" {...strokeProps} />
          <path d="M13 10.2v4l3-2-3-2z" fill="currentColor" />
          <path d="M5.5 8.2V16a2 2 0 0 0 2 2" {...strokeProps} />
          <path d="M18.5 8.2V16a2 2 0 0 1-2 2" {...strokeProps} />
        </svg>
      );
    case 'link':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M10.2 13.8 8.4 15.6a3.1 3.1 0 0 1-4.4-4.4l2.6-2.6a3.1 3.1 0 0 1 4.4 0" {...strokeProps} />
          <path d="M13.8 10.2 15.6 8.4a3.1 3.1 0 1 1 4.4 4.4l-2.6 2.6a3.1 3.1 0 0 1-4.4 0" {...strokeProps} />
          <path d="m8.8 15.2 6.4-6.4" {...strokeProps} />
        </svg>
      );
    case 'preview':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M3.8 12s3-5 8.2-5 8.2 5 8.2 5-3 5-8.2 5-8.2-5-8.2-5z" {...strokeProps} />
          <circle cx="12" cy="12" r="2.8" {...strokeProps} />
        </svg>
      );
    case 'download':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M12 5v9" {...strokeProps} />
          <path d="m8.5 10.8 3.5 3.7 3.5-3.7" {...strokeProps} />
          <path d="M5 18.5h14" {...strokeProps} />
        </svg>
      );
    case 'mobile':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="7" y="3.8" width="10" height="16.4" rx="2.4" {...strokeProps} />
          <path d="M10.5 6.8h3" {...strokeProps} />
          <circle cx="12" cy="17.2" r="0.9" fill="currentColor" />
        </svg>
      );
    case 'desktop':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <rect x="4" y="5" width="16" height="10.5" rx="2.2" {...strokeProps} />
          <path d="M9.5 19h5M12 15.5V19" {...strokeProps} />
        </svg>
      );
    case 'fast':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M13.4 3.8 6.8 12h4l-.3 8.2 6.7-8.2h-4.1l.3-8.2z" fill="currentColor" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="M12 3.8 18.4 6v5.6c0 3.9-2.3 6.8-6.4 8.6-4.1-1.8-6.4-4.7-6.4-8.6V6L12 3.8z" {...strokeProps} />
          <path d="m9.6 11.9 1.7 1.8 3.2-3.4" {...strokeProps} />
        </svg>
      );
    case 'sparkles':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="m12 4 1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7z" fill="currentColor" />
          <path d="m18.2 14.5.8 2 .8-2 2-.8-2-.8-.8-2-.8 2-2 .8zM5 15.7l.6 1.5.6-1.5 1.5-.6-1.5-.6-.6-1.5-.6 1.5-1.5.6z" fill="currentColor" />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <path d="m9.2 8.5-3.7 3.5 3.7 3.5M14.8 8.5l3.7 3.5-3.7 3.5M13.2 6.5l-2.4 11" {...strokeProps} />
        </svg>
      );
    case 'proxy':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
          <circle cx="7" cy="12" r="1.7" fill="currentColor" />
          <circle cx="17" cy="7" r="1.7" fill="currentColor" />
          <circle cx="17" cy="17" r="1.7" fill="currentColor" />
          <path d="M8.8 12h5M12.6 11.4l2.9-2.9M12.6 12.6l2.9 2.9" {...strokeProps} />
        </svg>
      );
    default:
      return null;
  }
}
