import { Grid, Column } from '@carbon/react';
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
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
        {/* Hero */}
        <section style={{ background: '#161616', color: 'white', padding: '4rem 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem' }}>
              Investment opportunities
            </h1>
            <p style={{ opacity: 0.8, maxWidth: '600px' }}>
              Browse startups raising on 9xf labs. Each company has been reviewed by our team.
              Invest from as little as $50.
            </p>
          </div>
        </section>

        {/* Live Campaigns */}
        <section className="section">
          <div className="container">
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>
              Raising now
            </h2>
            {liveCampaigns.length > 0 ? (
              <Grid>
                {liveCampaigns.map((campaign) => (
                  <Column key={campaign.id} lg={8} md={4} sm={4}>
                    <CampaignCard campaign={campaign} />
                  </Column>
                ))}
              </Grid>
            ) : (
              <p style={{ color: '#525252' }}>No live campaigns at the moment. Check back soon!</p>
            )}
          </div>
        </section>

        {/* Upcoming Campaigns */}
        {upcomingCampaigns.length > 0 && (
          <section className="section" style={{ background: '#f4f4f4' }}>
            <div className="container">
              <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 600 }}>
                Coming soon
              </h2>
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
