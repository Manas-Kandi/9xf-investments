import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { RiskDisclosureContent } from '@/components/legal/RiskDisclosureContent';
import { riskDisclosureIntro } from '@/lib/legal';

export default function RiskDisclosurePage() {
  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
        <section style={{ background: '#161616', color: 'white', padding: '3rem 0' }}>
          <div className="container">
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7, marginBottom: '0.75rem' }}>
              Legal disclosure
            </p>
            <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.75rem' }}>Risk Disclosure</h1>
            <p style={{ maxWidth: '720px', opacity: 0.8 }}>{riskDisclosureIntro}</p>
          </div>
        </section>

        <section className="section" style={{ background: '#f4f4f4', padding: '3rem 0' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <RiskDisclosureContent />
            <p style={{ marginTop: '1.5rem', color: '#525252' }}>
              By continuing to use the platform or investing in any offering, you acknowledge that you have read and understood
              these disclosures. Always consult your legal, tax, and financial advisors before investing.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
