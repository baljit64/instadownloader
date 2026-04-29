import type { TranslationDictionary } from '../../../lib/i18n';
import IconGlyph from '../../IconGlyph';
import type { LandingPageLink } from '../content';
import { FooterColumn } from '../primitives';

interface LandingPageFooterProps {
  companyLinks: LandingPageLink[];
  copy: TranslationDictionary['footer'];
  productLinks: LandingPageLink[];
  supportLinks: LandingPageLink[];
}

export default function LandingPageFooter({
  companyLinks,
  copy,
  productLinks,
  supportLinks,
}: LandingPageFooterProps) {
  return (
    <footer className="mt-10 rounded-[38px] bg-[#17142d] px-6 py-10 text-white sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/12">
              <IconGlyph name="instagram" className="h-6 w-6" strokeWidth={2} />
            </div>
            <p className="font-display text-[1.7rem] font-bold tracking-[-0.04em] text-white">
              igdown.pro
            </p>
          </div>
          <p className="mt-5 text-sm leading-7 text-white/68">
            {copy.brandDescription}
          </p>
        </div>

        <FooterColumn title={copy.productTitle} links={productLinks} />
        <FooterColumn title={copy.companyTitle} links={companyLinks} />
        <FooterColumn title={copy.supportTitle} links={supportLinks} />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/58 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} igdown.pro. {copy.copyright}
        </p>
        <div className="flex items-center gap-3 text-white/55">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            <IconGlyph name="proxy" className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            <IconGlyph name="shield" className="h-4 w-4" strokeWidth={2} />
          </span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10">
            <IconGlyph name="download" className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </footer>
  );
}
