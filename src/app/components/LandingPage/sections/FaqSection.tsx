import type { SeoFaq } from '../../../lib/seo-pages';

interface FaqSectionProps {
  homepageFaqs: SeoFaq[];
}

export default function FaqSection({ homepageFaqs }: FaqSectionProps) {
  if (!homepageFaqs.length) {
    return null;
  }

  return (
    <section className="surface-card mt-10 rounded-[38px] px-6 py-10 sm:px-8">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.28em] text-[#2d7cff]">
          Frequently asked
        </span>
        <h2 className="font-display mt-4 text-4xl font-bold tracking-[-0.04em] text-[#171923] sm:text-[3.1rem]">
          Common Instagram downloader questions
        </h2>
      </div>

      <div className="mt-8 space-y-4">
        {homepageFaqs.map((faq) => (
          <details
            key={faq.question}
            className="rounded-[24px] border border-white/80 bg-white/82 px-5 py-5 shadow-[0_18px_40px_rgba(118,99,255,0.08)]"
          >
            <summary className="cursor-pointer list-none text-lg font-semibold text-[#171923]">
              {faq.question}
            </summary>
            <p className="mt-4 text-sm leading-7 text-[#6d6885]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
