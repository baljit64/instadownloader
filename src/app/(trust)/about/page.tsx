import TrustContentPage from '../../components/TrustContentPage';
import { buildTrustMetadata, trustPages } from '../../lib/trust-pages';

const page = trustPages.about;
export const metadata = buildTrustMetadata(page);
export default function AboutPage() { return <TrustContentPage page={page} />; }
