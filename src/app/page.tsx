import { Grid, Column, Button, Tile, Tag } from '@carbon/react';
import { ArrowRight, Wallet, Security, Time } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { fetchCampaigns } from '@/lib/supabase/queries';

export default async function Home() {
  const liveCampaigns = await fetchCampaigns();
  const featuredCampaign = liveCampaigns.find((campaign) => campaign.status === 'live');

  return (
    <>
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section style={{ background: '#262626', padding: '4rem 0', textAlign: 'center' }}>
          <div className="page-container">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem', color: '#f4f4f4' }}>
              Own a piece of the future
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#c6c6c6', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Invest small amounts in startups you believe in. Simple onboarding, one-tap investing, from just $50.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button as={Link} href="/campaigns" kind="primary" size="lg" renderIcon={ArrowRight}>
                Browse campaigns
              </Button>
              <Button as={Link} href="/how-it-works" kind="secondary" size="lg">
                How it works
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" style={{ background: '#161616' }}>
          <div className="page-container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.75rem', fontWeight: 400, color: '#f4f4f4' }}>
              Investing made simple
            </h2>
            <Grid>
              <Column lg={5} md={4} sm={4}>
                <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '64px', height: '64px', background: '#0f62fe', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                  }}>
                    <Security size={32} style={{ fill: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#f4f4f4' }}>
                    1. Verify once
                  </h3>
                  <p style={{ color: '#c6c6c6' }}>
                    Complete a simple identity check. You only need to do this once.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '64px', height: '64px', background: '#0f62fe', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                  }}>
                    <Wallet size={32} style={{ fill: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#f4f4f4' }}>
                    2. Link your bank
                  </h3>
                  <p style={{ color: '#c6c6c6' }}>
                    Connect your bank account securely. Funds are only moved when you invest.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '64px', height: '64px', background: '#0f62fe', borderRadius: '50%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                  }}>
                    <Time size={32} style={{ fill: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#f4f4f4' }}>
                    3. Invest in seconds
                  </h3>
                  <p style={{ color: '#c6c6c6' }}>
                    Pick an amount, tap confirm. That&apos;s it. You&apos;re now an investor.
                  </p>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <section className="section" style={{ background: '#1a1a1a' }}>
            <div className="page-container">
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem', fontWeight: 400, color: '#f4f4f4' }}>
                Featured campaign
              </h2>
              <Grid>
                <Column lg={{ span: 10, offset: 3 }} md={8} sm={4}>
                  <CampaignCard campaign={featuredCampaign} featured />
                </Column>
              </Grid>
            </div>
          </section>
        )}

        {/* Live Campaigns */}
        {liveCampaigns.length > 1 && (
          <section className="section" style={{ background: '#161616' }}>
            <div className="page-container">
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem', fontWeight: 400, color: '#f4f4f4' }}>
                More opportunities
              </h2>
              <Grid>
                {liveCampaigns.slice(1).map((campaign) => (
                  <Column key={campaign.id} lg={8} md={4} sm={4}>
                    <CampaignCard campaign={campaign} />
                  </Column>
                ))}
              </Grid>
            </div>
          </section>
        )}

        {/* Risk Disclaimer */}
        <section className="section" style={{ background: '#1a1a1a' }}>
          <div className="page-container">
            <Tile style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', fontWeight: 600, color: '#f4f4f4' }}>Important information</h3>
              <p style={{ color: '#c6c6c6', lineHeight: 1.6, marginBottom: '1rem' }}>
                Investing in startups involves significant risk. You could lose all of your investment. 
                These are long-term, illiquid investments—you may not be able to sell your shares for many years.
              </p>
              <p style={{ color: '#c6c6c6', lineHeight: 1.6 }}>
                9xf labs does not provide investment advice. Past performance is not indicative of future results.
                Please read our{' '}
                <Link href="/risk-disclosure" style={{ color: '#78a9ff' }}>full risk disclosure</Link>{' '}
                before investing.
              </p>
            </Tile>
          </div>
        </section>

        {/* CTA for Founders */}
        <section style={{ background: '#262626', padding: '4rem 0' }}>
          <div className="page-container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 400, marginBottom: '1rem', color: '#f4f4f4' }}>
              Are you a founder?
            </h2>
            <p style={{ color: '#c6c6c6', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Turn your customers and fans into investors. Allocate a small slice of your round to the crowd.
            </p>
            <Button as={Link} href="/founders" kind="tertiary" size="lg" renderIcon={ArrowRight}>
              Raise with 9xf labs
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
