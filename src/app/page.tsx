'use client';

import { Grid, Column, Button, Tile } from '@carbon/react';
import { ArrowRight, Wallet, Security, Time } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { getLiveCampaigns, getFeaturedCampaign } from '@/lib/mock-data';
import styles from './page.module.scss';

export default function Home() {
  const featuredCampaign = getFeaturedCampaign();
  const liveCampaigns = getLiveCampaigns();

  return (
    <>
      <Header />
      <main className="main-content" id="main-content">
        {/* Hero Section */}
        <section className={styles.heroSection} aria-labelledby="hero-heading">
          <div className="page-container">
            <h1 id="hero-heading" className={styles.heroHeading}>
              Own a piece of the future
            </h1>
            <p className={styles.heroSubtitle}>
              Invest small amounts in startups you believe in. Simple onboarding, one-tap investing, from just $50.
            </p>
            <div className={styles.heroActions}>
              <Button as={Link} href="/campaigns" kind="primary" size="lg" renderIcon={ArrowRight} aria-label="Browse campaigns">
                Browse campaigns
              </Button>
              <Button as={Link} href="/how-it-works" kind="secondary" size="lg" aria-label="Learn how investing works">
                How it works
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={`section ${styles.sectionLayer}`} aria-labelledby="investing-simple-heading">
          <div className="page-container">
            <h2 id="investing-simple-heading" className={styles.sectionTitle}>
              Investing made simple
            </h2>
            <Grid>
              <Column lg={5} md={4} sm={4}>
                <Tile
                  className={styles.stepTile}
                  role="article"
                  tabIndex={0}
                  aria-labelledby="step-verify"
                  aria-describedby="step-verify-copy"
                >
                  <div className={styles.iconCircle} aria-hidden="true">
                    <Security size={32} />
                  </div>
                  <h3 id="step-verify" className={styles.stepTitle}>
                    1. Verify once
                  </h3>
                  <p id="step-verify-copy" className={styles.stepCopy}>
                    Complete a simple identity check. You only need to do this once.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <Tile
                  className={styles.stepTile}
                  role="article"
                  tabIndex={0}
                  aria-labelledby="step-bank"
                  aria-describedby="step-bank-copy"
                >
                  <div className={styles.iconCircle} aria-hidden="true">
                    <Wallet size={32} />
                  </div>
                  <h3 id="step-bank" className={styles.stepTitle}>
                    2. Link your bank
                  </h3>
                  <p id="step-bank-copy" className={styles.stepCopy}>
                    Connect your bank account securely. Funds are only moved when you invest.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
                <Tile
                  className={styles.stepTile}
                  role="article"
                  tabIndex={0}
                  aria-labelledby="step-invest"
                  aria-describedby="step-invest-copy"
                >
                  <div className={styles.iconCircle} aria-hidden="true">
                    <Time size={32} />
                  </div>
                  <h3 id="step-invest" className={styles.stepTitle}>
                    3. Invest in seconds
                  </h3>
                  <p id="step-invest-copy" className={styles.stepCopy}>
                    Pick an amount, tap confirm. That&apos;s it. You&apos;re now an investor.
                  </p>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <section className={`section ${styles.featuredSection}`} aria-labelledby="featured-campaign-heading">
            <div className="page-container">
              <h2 id="featured-campaign-heading" className={styles.sectionTitle}>
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
          <section className={`section ${styles.moreSection}`} aria-labelledby="more-opportunities-heading">
            <div className="page-container">
              <h2 id="more-opportunities-heading" className={styles.sectionTitle}>
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
        <section className={`section ${styles.sectionAlt}`} aria-labelledby="risk-heading">
          <div className="page-container">
            <Tile className={styles.disclaimerTile} role="note" aria-labelledby="risk-heading">
              <h3 id="risk-heading" className={styles.disclaimerHeading}>
                Important information
              </h3>
              <p className={styles.disclaimerCopy}>
                Investing in startups involves significant risk. You could lose all of your investment.
                These are long-term, illiquid investments—you may not be able to sell your shares for many years.
              </p>
              <p className={styles.disclaimerCopy}>
                9xf labs does not provide investment advice. Past performance is not indicative of future results.
                Please read our{' '}
                <Link href="/risk-disclosure" className={styles.disclaimerLink}>
                  full risk disclosure
                </Link>{' '}
                before investing.
              </p>
            </Tile>
          </div>
        </section>

        {/* CTA for Founders */}
        <section className={styles.founderSection} aria-labelledby="founder-heading">
          <div className="page-container">
            <h2 id="founder-heading" className={styles.founderTitle}>
              Are you a founder?
            </h2>
            <p className={styles.founderCopy}>
              Turn your customers and fans into investors. Allocate a small slice of your round to the crowd.
            </p>
            <Button as={Link} href="/founders" kind="tertiary" size="lg" renderIcon={ArrowRight} aria-label="Raise with 9xf labs">
              Raise with 9xf labs
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
