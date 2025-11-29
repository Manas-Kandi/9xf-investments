'use client';

import Column from '@carbon/react/es/components/Grid/Column.js';
import { Grid } from '@carbon/react/es/components/Grid/Grid.js';
import Tag from '@carbon/react/es/components/Tag/Tag.js';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { mockCampaigns } from '@/lib/mock-data';

export default function CampaignsPage() {
  const campaigns = mockCampaigns;
  const liveCampaigns = campaigns.filter((c) => c.status === 'live');
  const upcomingCampaigns = campaigns.filter((c) => c.status === 'draft');

  return (
    <>
      <Header />
      <main className="main-content">
        {/* Hero */}
        <section className="hero-gradient" style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
          <div className="glow-orb glow-orb-1" />
          <div className="glow-orb glow-orb-3" />
          <div className="page-container" style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              fontSize: 'clamp(2rem, 4vw, 2.5rem)', 
              fontWeight: 700, 
              marginBottom: '1rem', 
              color: 'var(--9xf-text-primary)',
              letterSpacing: '-0.02em',
            }}>
              Investment <span className="gradient-text">opportunities</span>
            </h1>
            <p style={{ 
              color: 'var(--9xf-text-secondary)', 
              maxWidth: '600px',
              fontSize: '1.125rem',
              lineHeight: 1.6,
            }}>
              Browse startups raising on 9xf labs. Each company has been reviewed by our team.
              Invest from as little as $50.
            </p>
          </div>
        </section>

        {/* Live Campaigns */}
        <section className="section" style={{ background: 'var(--9xf-bg-secondary)' }}>
          <div className="page-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontSize: '1.75rem', 
                fontWeight: 700, 
                color: 'var(--9xf-text-primary)', 
                margin: 0,
                letterSpacing: '-0.02em',
              }}>
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
              <p style={{ color: 'var(--9xf-text-secondary)' }}>No live campaigns at the moment. Check back soon!</p>
            )}
          </div>
        </section>

        {/* Upcoming Campaigns */}
        {upcomingCampaigns.length > 0 && (
          <section className="section" style={{ background: 'var(--9xf-bg-primary)' }}>
            <div className="page-container">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <h2 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: 700, 
                  color: 'var(--9xf-text-primary)', 
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}>
                  Coming soon
                </h2>
                <Tag type="warm-gray">{upcomingCampaigns.length} upcoming</Tag>
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
      <Footer />
    </>
  );
}
