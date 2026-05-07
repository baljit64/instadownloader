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
    <footer className="mt-12 rounded-2xl bg-slate-900 px-6 py-9 text-white sm:px-8">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
              <IconGlyph name="instagram" className="h-5 w-5" strokeWidth={2} />
            </div>
            <p className="font-display text-lg font-semibold text-white">igdown.pro</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{copy.brandDescription}</p>
        </div>

        <FooterColumn title={copy.productTitle} links={productLinks} />
        <FooterColumn title={copy.companyTitle} links={companyLinks} />
        <FooterColumn title={copy.supportTitle} links={supportLinks} />
      </div>

      <div className="mt-8 border-t border-white/10 pt-5 text-sm text-slate-300">
        <p>
          © {new Date().getFullYear()} igdown.pro. {copy.copyright}
        </p>
      </div>
    </footer>
  );
}
