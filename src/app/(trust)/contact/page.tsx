import TrustContentPage from '../../components/TrustContentPage';
import { buildTrustMetadata, trustPages } from '../../lib/trust-pages';

const page = trustPages.contact;
export const metadata = buildTrustMetadata(page);
export default function ContactPage() { return <TrustContentPage page={page} />; }
