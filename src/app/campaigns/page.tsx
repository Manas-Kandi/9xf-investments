'use client';

import { Grid, Column, Tag } from '@carbon/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { mockCampaigns } from '@/lib/mock-data';

export default function CampaignsPage() {
  const liveCampaigns = mockCampaigns.filter((c) => c.status === 'live');
  const upcomingCampaigns = mockCampaigns.filter((c) => c.status === 'draft');

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
