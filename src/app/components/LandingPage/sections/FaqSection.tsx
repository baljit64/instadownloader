import type { SeoFaq } from '../../../lib/seo-pages';

interface FaqSectionProps {
  homepageFaqs: SeoFaq[];
}

export default function FaqSection({ homepageFaqs }: FaqSectionProps) {
  if (!homepageFaqs.length) {
    return null;
  }

  return (
    <section className="surface-card mt-12 rounded-2xl p-6 sm:p-8">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Frequently asked
        </span>
        <h2 className="font-display mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
          Common Instagram downloader questions
        </h2>
      </div>

      <div className="mt-6 space-y-3">
        {homepageFaqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-xl border border-slate-200 bg-white px-4 py-4"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              {faq.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
