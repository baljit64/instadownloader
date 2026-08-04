import TrustContentPage from '../../components/TrustContentPage';
import { buildTrustMetadata, trustPages } from '../../lib/trust-pages';

const page = trustPages['cookie-policy'];
export const metadata = buildTrustMetadata(page);
export default function CookiePolicyPage() { return <TrustContentPage page={page} />; }
