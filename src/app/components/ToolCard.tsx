import Link from 'next/link';

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  ctaText?: string;
}

export default function ToolCard({ icon, title, description, href, ctaText }: ToolCardProps) {
  const target = href || '/tools';
  const unavailable = !href;

  return (
    <Link
      href={target}
      className="group relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {unavailable ? (
        <span className="absolute right-3 top-3 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
          Soon
        </span>
      ) : null}
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff1f0] text-[11px] font-bold tracking-wide text-[#e5322d]">
        {icon}
      </div>
      <h3 className="mt-3 text-sm font-bold text-slate-900 transition-colors group-hover:text-[#e5322d]">{title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      {ctaText && href ? (
        <span className="mt-4 inline-flex rounded-lg border border-[#e5322d] px-2.5 py-1 text-[11px] font-semibold text-[#e5322d] transition-colors group-hover:bg-[#e5322d] group-hover:text-white">
          {ctaText}
        </span>
      ) : null}
    </Link>
  );
}
