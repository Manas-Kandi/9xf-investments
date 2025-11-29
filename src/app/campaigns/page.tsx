'use client';

import { Suspense, use } from 'react';
import Column from '@carbon/react/es/components/Grid/Column.js';
import { Grid } from '@carbon/react/es/components/Grid/Grid.js';
import Tag from '@carbon/react/es/components/Tag/Tag.js';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { mockCampaigns } from '@/lib/mock-data';

function CampaignsSkeleton() {
  return (
    <main className="main-content">
      <section style={{ background: '#262626', padding: '3rem 0' }}>
        <div className="page-container">
          <div className="skeleton-line" style={{ width: '320px', height: '28px', marginBottom: '0.75rem' }} />
          <div className="skeleton-line" style={{ width: '520px', height: '20px' }} />
        </div>
      </section>
      <section className="section" style={{ background: '#161616' }}>
        <div className="page-container">
          <div className="skeleton-line" style={{ width: '200px', height: '24px', marginBottom: '2rem' }} />
          <Grid condensed>
            {Array.from({ length: 4 }).map((_, index) => (
              <Column key={index} lg={8} md={4} sm={4}>
                <div className="card-skeleton" />
              </Column>
            ))}
          </Grid>
        </div>
      </section>
    </main>
  );
}

function CampaignsContent() {
  const campaigns = use(getCampaigns());

  const liveCampaigns = campaigns.filter((c) => c.status === 'live');
  const upcomingCampaigns = campaigns.filter((c) => c.status === 'draft');

  return (
    <>
      <Header />
      <ErrorBoundary title="Campaigns are unavailable" description="We couldn't load campaigns right now. Please refresh or try again later.">
        <main className="main-content">
          {/* Hero */}
          <section style={{ background: '#262626', padding: '3rem 0' }}>
            <div className="page-container">
              <h1 style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem', color: '#f4f4f4' }}>
                Investment opportunities
              </h1>
              <p style={{ color: '#c6c6c6', maxWidth: '600px' }}>
                Browse startups raising on 9xf labs. Each company has been reviewed by our team.
                Invest from as little as $50.
              </p>
            </div>
          </section>

          {/* Live Campaigns */}
          <section className="section" style={{ background: '#161616' }}>
            <div className="page-container">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#f4f4f4', margin: 0 }}>
                  Raising now
                </h2>
                <Tag type="green">{liveCampaigns.length} live</Tag>
              </div>
              {liveCampaigns.length > 0 ? (
                <Grid>
                  {liveCampaigns.map((campaign) => (
                    <Column key={campaign.id} lg={8} md={4} sm={4}>
                      <CampaignCard campaign={campaign} />
                    </Column>
                  ))}
                </Grid>
              ) : (
                <p style={{ color: '#c6c6c6' }}>No live campaigns at the moment. Check back soon!</p>
              )}
            </div>
          </section>

          {/* Upcoming Campaigns */}
          {upcomingCampaigns.length > 0 && (
            <section className="section" style={{ background: '#1a1a1a' }}>
              <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#f4f4f4', margin: 0 }}>
                    Coming soon
                  </h2>
                  <Tag type="gray">{upcomingCampaigns.length} upcoming</Tag>
                </div>
                <Grid>
                  {upcomingCampaigns.map((campaign) => (
                    <Column key={campaign.id} lg={8} md={4} sm={4}>
                      <CampaignCard campaign={campaign} />
                    </Column>
                  ))}
                </Grid>
              </div>
            </section>
          )}
        </main>
      </ErrorBoundary>
      <Footer />
    </>
  );
}
