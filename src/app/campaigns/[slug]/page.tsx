'use client';

import { Suspense, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@carbon/react/es/components/Button/Button.js';
import Column from '@carbon/react/es/components/Grid/Column.js';
import { Grid } from '@carbon/react/es/components/Grid/Grid.js';
import ProgressBar from '@carbon/react/es/components/ProgressBar/ProgressBar.js';
import Tag from '@carbon/react/es/components/Tag/Tag.js';
import { ArrowRight, Warning } from '@carbon/icons-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCampaignBySlug } from '@/lib/mock-data';
import type { Campaign } from '@/types/database';

interface CampaignPageProps {
  params: { slug: string };
}

function CampaignSkeleton() {
  return (
    <main className="main-content">
      <section className="hero-gradient" style={{ padding: '4rem 0' }}>
        <div className="page-container">
          <Grid>
            <Column lg={10} md={6} sm={4}>
              <div className="skeleton-line" style={{ width: '240px', height: '18px', marginBottom: '1rem' }} />
              <div className="skeleton-line" style={{ width: '320px', height: '32px', marginBottom: '1rem' }} />
              <div className="skeleton-line" style={{ width: '560px', height: '20px' }} />
            </Column>
            <Column lg={6} md={2} sm={4}>
              <div className="card-skeleton" style={{ minHeight: '220px' }} />
            </Column>
          </Grid>
        </div>
      </section>
    </main>
  );
}

function CampaignContent({ campaign }: { campaign: Campaign }) {
  const progress = Math.round((campaign.amount_raised / campaign.target_amount) * 100);
  const isLive = campaign.status === 'live';

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="hero-gradient" style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-3" />
        <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
          <Grid>
            <Column lg={10} md={6} sm={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: 'var(--9xf-gradient-primary)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'white',
                    boxShadow: 'var(--9xf-glow-primary)',
                  }}
                >
                  {campaign.company_name.charAt(0)}
                </div>
                <div>
                  <Tag type={isLive ? 'green' : 'warm-gray'} style={{ marginBottom: '0.5rem' }}>
                    {isLive ? 'Raising now' : 'Coming soon'}
                  </Tag>
                  <h1 style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: 700, 
                    margin: 0,
                    color: 'var(--9xf-text-primary)',
                    letterSpacing: '-0.02em',
                  }}>
                    {campaign.company_name}
                  </h1>
                </div>
              </div>
              <p style={{ 
                fontSize: '1.25rem', 
                color: 'var(--9xf-text-secondary)', 
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}>
                {campaign.tagline}
              </p>
              {campaign.cover_image_url && (
                <div style={{ 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  marginTop: '1rem', 
                  background: 'var(--9xf-bg-elevated)',
                  border: '1px solid var(--9xf-border)',
                }}>
                  <Image
                    src={campaign.cover_image_url}
                    alt={`${campaign.company_name} campaign banner`}
                    width={1200}
                    height={640}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                  />
                </div>
              )}
            </Column>
            <Column lg={6} md={2} sm={4}>
              {isLive && (
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <ProgressBar
                    value={progress}
                    max={100}
                    label={`$${campaign.amount_raised.toLocaleString()} raised`}
                    helperText={`${progress}% of $${campaign.target_amount.toLocaleString()} goal`}
                  />
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '1.5rem', 
                    marginTop: '2rem',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--9xf-border)',
                  }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--9xf-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Min investment
                      </p>
                      <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--9xf-text-primary)' }}>
                        ${campaign.min_investment}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--9xf-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Crowd allocation
                      </p>
                      <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--9xf-text-primary)' }}>
                        {campaign.crowd_percentage}%
                      </p>
                    </div>
                  </div>
                  <Button
                    as={Link}
                    href={`/invest/${campaign.slug}`}
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
                  >
                    Invest from ${campaign.min_investment}
                  </Button>
                </div>
              )}
            </Column>
          </Grid>
        </div>
      </section>

      {/* Main Content */}
      <section className="section" style={{ background: 'var(--9xf-bg-secondary)' }}>
        <div className="page-container">
          <Grid>
            <Column lg={10} md={5} sm={4}>
              {/* About */}
              <div className="glass-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  marginBottom: '1.5rem',
                  color: 'var(--9xf-text-primary)',
                }}>
                  About {campaign.company_name}
                </h2>
                <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--9xf-text-secondary)' }}>
                  {campaign.description}
                </p>

                {campaign.problem && (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--9xf-text-primary)' }}>
                      The problem
                    </h3>
                    <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--9xf-text-secondary)' }}>
                      {campaign.problem}
                    </p>
                  </>
                )}

                {campaign.solution && (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--9xf-text-primary)' }}>
                      Our solution
                    </h3>
                    <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: 'var(--9xf-text-secondary)' }}>
                      {campaign.solution}
                    </p>
                  </>
                )}

                {campaign.traction && (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--9xf-text-primary)' }}>
                      Traction
                    </h3>
                    <p style={{ lineHeight: 1.8, color: 'var(--9xf-text-secondary)' }}>
                      {campaign.traction}
                    </p>
                  </>
                )}
              </div>

              {/* Founder */}
              <div className="glass-card" style={{ marginBottom: '2rem', padding: '2rem' }}>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 700, 
                  marginBottom: '1.5rem',
                  color: 'var(--9xf-text-primary)',
                }}>
                  Meet the founder
                </h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: 'var(--9xf-gradient-accent)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    {campaign.founder_name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--9xf-text-primary)' }}>
                      {campaign.founder_name}
                    </h3>
                    <p style={{ color: 'var(--9xf-text-secondary)', lineHeight: 1.6 }}>
                      {campaign.founder_bio}
                    </p>
                  </div>
                </div>
              </div>
            </Column>

            <Column lg={6} md={3} sm={4}>
              {/* Risk Warning */}
              <div className="border-gradient" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Warning size={20} style={{ color: 'var(--9xf-accent-amber)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', color: 'var(--9xf-text-primary)' }}>
                      Investment risks
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--9xf-text-secondary)', lineHeight: 1.8 }}>
                      <li>You could lose all of your money</li>
                      <li>This is a long-term, illiquid investment</li>
                      <li>This is not a deposit or savings account</li>
                      <li>Past performance is not indicative of future results</li>
                    </ul>
                    <Link
                      href="/risk-disclosure"
                      style={{ 
                        color: 'var(--9xf-primary-light)', 
                        fontWeight: 500, 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        marginTop: '1rem' 
                      }}
                    >
                      Read full risk disclosure <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Column>
          </Grid>
        </div>
      </section>
    </main>
  );
}

function CampaignPageContent({ slug }: { slug: string }) {
  const campaign = use(getCampaignBySlug(slug));

  if (!campaign) {
    notFound();
  }

  return <CampaignContent campaign={campaign} />;
}

export default function CampaignPage({ params }: CampaignPageProps) {
  const { slug } = params;

  return (
    <>
      <Header />
      <Suspense fallback={<CampaignSkeleton />}>
        <CampaignPageContent slug={slug} />
      </Suspense>
      <Footer />
    </>
  );
}
