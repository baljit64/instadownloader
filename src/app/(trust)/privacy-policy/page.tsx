import TrustContentPage from '../../components/TrustContentPage';
import { buildTrustMetadata, trustPages } from '../../lib/trust-pages';

const page = trustPages['privacy-policy'];
export const metadata = buildTrustMetadata(page);
export default function PrivacyPolicyPage() { return <TrustContentPage page={page} />; }
