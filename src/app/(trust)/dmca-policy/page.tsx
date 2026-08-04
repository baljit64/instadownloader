import TrustContentPage from '../../components/TrustContentPage';
import { buildTrustMetadata, trustPages } from '../../lib/trust-pages';

const page = trustPages['dmca-policy'];
export const metadata = buildTrustMetadata(page);
export default function DmcaPolicyPage() { return <TrustContentPage page={page} />; }
