'use client';

import { Grid, Column, Tag } from '@carbon/react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { mockCampaigns } from '@/lib/mock-data';
import styles from './page.module.scss';

export default function CampaignsPage() {
  const liveCampaigns = mockCampaigns.filter((c) => c.status === 'live');
  const upcomingCampaigns = mockCampaigns.filter((c) => c.status === 'draft');

  return (
    <>
      <Header />
      <main className="main-content" id="main-content">
        {/* Hero */}
        <section className={styles.hero} aria-labelledby="campaigns-hero-heading">
          <div className="page-container">
            <h1 id="campaigns-hero-heading" className={styles.heroTitle}>
              Investment opportunities
            </h1>
            <p className={styles.heroCopy}>
              Browse startups raising on 9xf labs. Each company has been reviewed by our team.
              Invest from as little as $50.
            </p>
          </div>
        </section>

        {/* Live Campaigns */}
        <section className={`section ${styles.sectionLayer}`} aria-labelledby="live-campaigns-heading">
          <div className="page-container">
            <div className={styles.sectionHeading}>
              <h2 id="live-campaigns-heading" className={styles.sectionTitle}>
                Raising now
              </h2>
              <Tag type="green" aria-label={`${liveCampaigns.length} campaigns live`}>
                {liveCampaigns.length} live
              </Tag>
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
              <p className={styles.emptyCopy}>No live campaigns at the moment. Check back soon!</p>
            )}
          </div>
        </section>

        {/* Upcoming Campaigns */}
        {upcomingCampaigns.length > 0 && (
          <section className={`section ${styles.sectionAlt}`} aria-labelledby="upcoming-campaigns-heading">
            <div className="page-container">
              <div className={styles.sectionHeading}>
                <h2 id="upcoming-campaigns-heading" className={styles.sectionTitle}>
                  Coming soon
                </h2>
                <Tag type="gray" aria-label={`${upcomingCampaigns.length} upcoming campaigns`}>
                  {upcomingCampaigns.length} upcoming
                </Tag>
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
