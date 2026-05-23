import type { Locale } from '../lib/i18n';
import LanguageSwitcher from './LanguageSwitcher';

interface LazyLanguageSwitcherProps {
  buttonLabel: string;
  currentLocale: Locale;
}

export default function LazyLanguageSwitcher({
  buttonLabel,
  currentLocale,
}: LazyLanguageSwitcherProps) {
  return (
    <LanguageSwitcher
      buttonLabel={buttonLabel}
      currentLocale={currentLocale}
    />
  );
}
