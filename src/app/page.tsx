import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { detectPreferredLocale } from './lib/i18n';

export default async function Home() {
  const requestHeaders = await headers();
  const locale = detectPreferredLocale(requestHeaders.get('accept-language'));

  redirect(`/${locale}`);
}
