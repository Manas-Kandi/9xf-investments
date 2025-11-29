'use client';

import { Grid, Column, Button, Tile } from '@carbon/react';
import { ArrowRight, Wallet, Security, Rocket, ChartLineData, Checkmark } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { getLiveCampaigns, getFeaturedCampaign } from '@/lib/mock-data';

export default function Home() {
  const featuredCampaign = getFeaturedCampaign();
  const liveCampaigns = getLiveCampaigns();

  const steps = [
    {
      icon: <Checkmark size={32} />,
      title: '1. Verify once',
      description: 'Complete a simple identity check. You only need to do this once.',
    },
    {
      icon: <Wallet size={32} />,
      title: '2. Link your bank',
      description: 'Connect your bank account securely. Funds are only moved when you invest.',
    },
    {
      icon: <Rocket size={32} />,
      title: '3. Invest in seconds',
      description: "Pick an amount, tap confirm. That's it. You're now an investor.",
    },
  ];

  const stats = [
    { value: '$2.4M+', label: 'Invested' },
    { value: '12K+', label: 'Investors' },
    { value: '24', label: 'Startups Funded' },
  ];

  return (
    <>
      <Header />
      <main className="main-content">
        {/* Hero Section - Animated Gradient */}
        <section className="hero-gradient" style={{ 
          padding: '8rem 0 6rem', 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Animated Glow Orbs */}
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-2" />
          <div className="glow-orb glow-orb-3" />
          
          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            <div className="fade-in-up" style={{ marginBottom: '1.5rem' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '999px',
                fontSize: '0.875rem',
                color: 'var(--9xf-primary-light)',
                fontWeight: 500,
              }}>
                <Rocket size={16} />
                Now open to everyone
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="fade-in-up stagger-1" style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              fontWeight: 700, 
              marginBottom: '1.5rem', 
              color: 'var(--9xf-text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              maxWidth: '900px',
              margin: '0 auto 1.5rem',
            }}>
              Own a piece of the{' '}
              <span className="gradient-text">future</span>
            </h1>

            {/* Subtitle */}
            <p className="fade-in-up stagger-2" style={{ 
              fontSize: '1.25rem', 
              color: 'var(--9xf-text-secondary)', 
              marginBottom: '2.5rem', 
              maxWidth: '600px', 
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}>
              Invest in startups you believe in. Simple onboarding, one-tap investing, from just <strong style={{ color: 'var(--9xf-accent)' }}>$50</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="fade-in-up stagger-3" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
              <Button as={Link} href="/campaigns" kind="primary" size="lg" renderIcon={ArrowRight}>
                Browse campaigns
              </Button>
              <Button as={Link} href="/how-it-works" kind="secondary" size="lg">
                How it works
              </Button>
            </div>

            {/* Stats Row */}
            <div className="fade-in-up stagger-4" style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '4rem',
              flexWrap: 'wrap',
            }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700, 
                    color: 'var(--9xf-text-primary)',
                    letterSpacing: '-0.02em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--9xf-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" style={{ background: 'var(--9xf-bg-secondary)' }}>
          <div className="page-container">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ 
                fontSize: '2.25rem', 
                fontWeight: 700, 
                color: 'var(--9xf-text-primary)',
                letterSpacing: '-0.02em',
                marginBottom: '1rem',
              }}>
                Investing made <span className="gradient-text">simple</span>
              </h2>
              <p style={{ color: 'var(--9xf-text-secondary)', fontSize: '1.125rem', maxWidth: '500px', margin: '0 auto' }}>
                Get started in minutes, not days. No complex paperwork.
              </p>
            </div>
            <Grid>
              {steps.map((step, index) => (
                <Column key={step.title} lg={5} md={4} sm={4}>
                  <div className="border-gradient" style={{ 
                    height: '100%', 
                    textAlign: 'center', 
                    padding: '2.5rem 2rem',
                  }}>
                    <div style={{
                      width: '72px', 
                      height: '72px', 
                      background: 'var(--9xf-gradient-primary)', 
                      borderRadius: '20px',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      margin: '0 auto 1.5rem',
                      boxShadow: 'var(--9xf-glow-primary)',
                    }}>
                      <div style={{ color: 'white' }}>{step.icon}</div>
                    </div>
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 600, 
                      marginBottom: '0.75rem', 
                      color: 'var(--9xf-text-primary)',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ color: 'var(--9xf-text-secondary)', lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </div>
                </Column>
              ))}
            </Grid>
          </div>
        </section>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <section className="section" style={{ 
            background: 'var(--9xf-bg-primary)',
            position: 'relative',
          }}>
            <div className="page-container">
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  color: '#34d399',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem',
                }}>
                  🔥 Hot right now
                </span>
                <h2 style={{ 
                  fontSize: '2.25rem', 
                  fontWeight: 700, 
                  color: 'var(--9xf-text-primary)',
                  letterSpacing: '-0.02em',
                }}>
                  Featured campaign
                </h2>
              </div>
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
          <section className="section" style={{ background: 'var(--9xf-bg-secondary)' }}>
            <div className="page-container">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '3rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}>
                <h2 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 700, 
                  color: 'var(--9xf-text-primary)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}>
                  More opportunities
                </h2>
                <Button as={Link} href="/campaigns" kind="tertiary" renderIcon={ArrowRight}>
                  View all campaigns
                </Button>
              </div>
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
        <section className="section" style={{ background: 'var(--9xf-bg-primary)' }}>
          <div className="page-container">
            <div className="border-gradient" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Security size={24} style={{ color: 'var(--9xf-accent-amber)' }} />
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.75rem', fontWeight: 600, color: 'var(--9xf-text-primary)', fontSize: '1.25rem' }}>
                    Important information
                  </h3>
                  <p style={{ color: 'var(--9xf-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                    Investing in startups involves significant risk. You could lose all of your investment. 
                    These are long-term, illiquid investments—you may not be able to sell your shares for many years.
                  </p>
                  <p style={{ color: 'var(--9xf-text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
                    9xf labs does not provide investment advice. Past performance is not indicative of future results.
                  </p>
                  <Link href="/risk-disclosure" style={{ 
                    color: 'var(--9xf-primary-light)', 
                    fontWeight: 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}>
                    Read full risk disclosure <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA for Founders */}
        <section className="hero-gradient" style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
          <div className="glow-orb glow-orb-2" style={{ top: '-50px', bottom: 'auto' }} />
          <div className="page-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(34, 211, 238, 0.15)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '999px',
              fontSize: '0.875rem',
              color: 'var(--9xf-accent)',
              fontWeight: 500,
              marginBottom: '1.5rem',
            }}>
              <ChartLineData size={16} />
              For founders
            </div>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
              fontWeight: 700, 
              marginBottom: '1rem', 
              color: 'var(--9xf-text-primary)',
              letterSpacing: '-0.02em',
            }}>
              Turn your customers into <span className="gradient-text">investors</span>
            </h2>
            <p style={{ 
              color: 'var(--9xf-text-secondary)', 
              marginBottom: '2rem', 
              maxWidth: '500px', 
              margin: '0 auto 2rem',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}>
              Allocate a small slice of your round to the crowd. Keep your cap table clean with a single pooled vehicle.
            </p>
            <Button as={Link} href="/founders" kind="primary" size="lg" renderIcon={ArrowRight}>
              Raise with 9xf labs
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
