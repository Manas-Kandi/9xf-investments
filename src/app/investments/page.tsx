'use client';

import { Suspense, use, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@carbon/react/es/components/Button/Button.js';
import Column from '@carbon/react/es/components/Grid/Column.js';
import { Grid } from '@carbon/react/es/components/Grid/Grid.js';
import Tag from '@carbon/react/es/components/Tag/Tag.js';
import { Tile } from '@carbon/react/es/components/Tile/Tile.js';
import { ArrowRight, Wallet } from '@carbon/icons-react';
import { Footer } from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAppStore } from '@/lib/store';
import { useInvestments } from '@/lib/supabase/hooks';

function InvestmentsSkeleton() {
  return (
    <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
      <section style={{ background: '#161616', color: 'white', padding: '3rem 0' }}>
        <div className="container">
          <div className="skeleton-line" style={{ width: '260px', height: '28px', marginBottom: '0.5rem' }} />
          <div className="skeleton-line" style={{ width: '200px', height: '18px' }} />
        </div>
      </section>

      <section style={{ background: '#f4f4f4', padding: '2rem 0' }}>
        <div className="container">
          <Grid>
            {Array.from({ length: 3 }).map((_, index) => (
              <Column key={index} lg={4} md={4} sm={4}>
                <div className="card-skeleton" style={{ height: '140px' }} />
              </Column>
            ))}
          </Grid>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card-skeleton" style={{ height: '220px' }} />
        </div>
      </section>
    </main>
  );
}

function InvestmentsContent() {
  const { user, isOnboarded, investments } = use(getInvestmentsSnapshot());
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin?redirect=/investments');
    }
  }, [user, router]);

  if (!user) return null;

  if (isLoading) {
    return (
      <>
        <Header />
        <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tag type="cool-gray">Loading investments...</Tag>
        </main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tile style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ margin: 0 }}>We couldn&apos;t load your investments. Please retry.</p>
          </Tile>
        </main>
      </>
    );
  }

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const statusLabel = {
    initiated: 'Pending',
    processing: 'Processing',
    confirmed: 'Confirmed',
    failed: 'Failed',
  };

  const statusKind = {
    initiated: 'warm-gray',
    processing: 'blue',
    confirmed: 'green',
    failed: 'red',
  } as const;

  return (
    <>
      <Header />
      <ErrorBoundary title="Portfolio not available" description="We couldn't load your investments right now. Please refresh or try again shortly.">
        <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
          {/* Header */}
          <section style={{ background: '#161616', color: 'white', padding: '3rem 0' }}>
            <div className="container">
              <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>
                My investments
              </h1>
              <p style={{ opacity: 0.8 }}>
                Track your startup investments
              </p>
            </div>
          </section>

          {/* Summary */}
          <section style={{ background: '#f4f4f4', padding: '2rem 0' }}>
            <div className="container">
              <Grid>
                <Column lg={4} md={4} sm={4}>
                  <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
                    <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Total invested
                    </p>
                    <p style={{ fontSize: '2rem', fontWeight: 600 }}>
                      ${totalInvested.toLocaleString()}
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
                    <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Companies
                    </p>
                    <p style={{ fontSize: '2rem', fontWeight: 600 }}>
                      {new Set(investments.map((i) => i.campaign_id)).size}
                    </p>
                  </Tile>
                </Column>
                <Column lg={4} md={4} sm={4}>
                  <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
                    <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      Status
                    </p>
                    <p style={{ fontSize: '2rem', fontWeight: 600 }}>
                      {isOnboarded ? 'Active' : 'Pending'}
                    </p>
                  </Tile>
                </Column>
              </Grid>
            </div>
          </section>

          {/* Investments List */}
          <section className="section">
            <div className="container">
              {investments.length === 0 ? (
                <Tile style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#f4f4f4',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                  }}>
                    <Wallet size={40} style={{ color: '#525252' }} />
                  </div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    No investments yet
                  </h2>
                  <p style={{ color: '#525252', marginBottom: '2rem' }}>
                    Start building your portfolio by investing in startups you believe in.
                  </p>
                  <Button
                    as={Link}
                    href="/campaigns"
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                  >
                    Browse campaigns
                  </Button>
                </Tile>
              ) : (
                <Grid>
                  {investments.map((investment) => (
                    <Column key={investment.id} lg={8} md={4} sm={4}>
                      <Tile style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div
                              style={{
                                width: '48px',
                                height: '48px',
                                background: '#e0e0e0',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: 700,
                                color: '#525252',
                              }}
                            >
                              {investment.campaign?.company_name?.charAt(0) || '?'}
                            </div>
                            <div>
                              <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                                {investment.campaign?.company_name || 'Unknown Company'}
                              </h3>
                              <p style={{ color: '#525252', fontSize: '0.875rem' }}>
                                {new Date(investment.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <Tag type={statusKind[investment.status]} size="sm">
                            {statusLabel[investment.status]}
                          </Tag>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ color: '#525252', fontSize: '0.75rem' }}>Amount invested</p>
                            <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                              ${investment.amount.toLocaleString()}
                            </p>
                          </div>
                          <Button
                            as={Link}
                            href={`/campaigns/${investment.campaign?.slug}`}
                            kind="ghost"
                            size="sm"
                          >
                            View campaign
                          </Button>
                        </div>
                      </Tile>
                    </Column>
                  ))}
                </Grid>
              )}
            </div>
          </section>
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}
