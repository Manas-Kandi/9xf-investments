'use client';

import { Grid, Column, Button, Tile } from '@carbon/react';
import { ArrowRight, Wallet, Security, Time } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { getLiveCampaigns, getFeaturedCampaign } from '@/lib/mock-data';

export default function Home() {
  const featuredCampaign = getFeaturedCampaign();
  const liveCampaigns = getLiveCampaigns();

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px' }}>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">
              Own a piece of the future
            </h1>
            <p className="hero-subtitle">
              Invest small amounts in startups you believe in. 
              Simple onboarding, one-tap investing, from just $50.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                as={Link}
                href="/campaigns"
                kind="primary"
                size="lg"
                renderIcon={ArrowRight}
              >
                Browse campaigns
              </Button>
              <Button
                as={Link}
                href="/how-it-works"
                kind="tertiary"
                size="lg"
              >
                How it works
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" style={{ background: '#f4f4f4' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 300 }}>
              Investing made simple
            </h2>
            <Grid>
              <Column lg={5} md={4} sm={4}>
                <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: '#0f62fe', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <Security size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    1. Verify once
                  </h3>
                  <p style={{ color: '#525252' }}>
                    Complete a simple identity check. You only need to do this once.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: '#0f62fe', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <Wallet size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    2. Link your bank
                  </h3>
                  <p style={{ color: '#525252' }}>
                    Connect your bank account securely. Funds are only moved when you invest.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: '#0f62fe', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                  }}>
                    <Time size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    3. Invest in seconds
                  </h3>
                  <p style={{ color: '#525252' }}>
                    Pick an amount, tap confirm. That&apos;s it. You&apos;re now an investor.
                  </p>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <section className="section">
            <div className="container">
              <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 300 }}>
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

        {/* All Live Campaigns */}
        {liveCampaigns.length > 1 && (
          <section className="section" style={{ background: '#f4f4f4' }}>
            <div className="container">
              <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 300 }}>
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
        <section className="section">
          <div className="container">
            <Tile style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', fontWeight: 600 }}>Important information</h3>
              <p style={{ color: '#525252', lineHeight: 1.6, marginBottom: '1rem' }}>
                Investing in startups involves significant risk. You could lose all of your investment. 
                These are long-term, illiquid investments—you may not be able to sell your shares for many years.
              </p>
              <p style={{ color: '#525252', lineHeight: 1.6 }}>
                9xf labs does not provide investment advice. Past performance is not indicative of future results.
                Please read our{' '}
                <Link href="/risk-disclosure" style={{ color: '#0f62fe' }}>
                  full risk disclosure
                </Link>{' '}
                before investing.
              </p>
            </Tile>
          </div>
        </section>

        {/* CTA for Founders */}
        <section style={{ background: '#161616', color: 'white', padding: '4rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
              Are you a founder?
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Turn your customers and fans into investors. Allocate a small slice of your round to the crowd.
            </p>
            <Button
              as={Link}
              href="/founders"
              kind="tertiary"
              size="lg"
              renderIcon={ArrowRight}
            >
              Raise with 9xf labs
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
