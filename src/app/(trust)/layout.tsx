import type { ReactNode } from 'react';
import PublicSiteFooter from '../components/PublicSiteFooter';
import PublicSiteHeader from '../components/PublicSiteHeader';

export default function TrustPagesLayout({ children }: { children: ReactNode }) {
  return <><PublicSiteHeader />{children}<PublicSiteFooter /></>;
}
