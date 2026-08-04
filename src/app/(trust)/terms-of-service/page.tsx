import TrustContentPage from '../../components/TrustContentPage';
import { buildTrustMetadata, trustPages } from '../../lib/trust-pages';

const page = trustPages['terms-of-service'];
export const metadata = buildTrustMetadata(page);
export default function TermsOfServicePage() { return <TrustContentPage page={page} />; }
