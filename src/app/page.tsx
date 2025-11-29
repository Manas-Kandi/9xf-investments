'use client';

import { Grid, Column, Button, Tile, Tag } from '@carbon/react';
import { ArrowRight, Wallet, Security, Time } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CampaignCard } from '@/components/CampaignCard';
import { getLiveCampaigns, getFeaturedCampaign } from '@/lib/mock-data';
import { useCmsContent } from '@/lib/hooks/useCmsContent';
import { fallbackLandingContent, editorialGuidelines } from '@/lib/cms/fallback-content';
import { CmsStep } from '@/lib/cms/types';

export default function Home() {
  const featuredCampaign = getFeaturedCampaign();
  const liveCampaigns = getLiveCampaigns();
  const landing = useCmsContent('landing', {
    initialData: fallbackLandingContent,
    initialContext: editorialGuidelines,
  });

  const renderIcon = (step: CmsStep) => {
    switch (step.icon) {
      case 'shield':
        return <Security size={32} style={{ fill: 'white' }} />;
      case 'wallet':
        return <Wallet size={32} style={{ fill: 'white' }} />;
      case 'clock':
      default:
        return <Time size={32} style={{ fill: 'white' }} />;
    }
  };

  return (
    <>
      <Header />
      <main className="main-content">
        {/* Hero Section */}
        <section style={{ background: '#262626', padding: '4rem 0', textAlign: 'center' }}>
          <div className="page-container">
            {landing.source === 'fallback' && (
              <div style={{ marginBottom: '1rem' }}>
                <Tag type="warm-gray">Fallback copy</Tag>
                {landing.context.fallbackMessage && (
                  <p style={{ color: '#c6c6c6', marginTop: '0.5rem' }}>{landing.context.fallbackMessage}</p>
                )}
                <ul style={{ color: '#c6c6c6', lineHeight: 1.4, marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                  {landing.context.guidelines.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
            <h1 style={{ fontSize: '2.5rem', fontWeight: 300, marginBottom: '1rem', color: '#f4f4f4' }}>
              {landing.data.heroTitle}
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#c6c6c6', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              {landing.data.heroSubtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button as={Link} href={landing.data.primaryCtaHref} kind="primary" size="lg" renderIcon={ArrowRight}>
                {landing.data.primaryCtaLabel}
              </Button>
              <Button as={Link} href={landing.data.secondaryCtaHref} kind="secondary" size="lg">
                {landing.data.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="section" style={{ background: '#161616' }}>
          <div className="page-container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.75rem', fontWeight: 400, color: '#f4f4f4' }}>
              {landing.data.stepsHeading}
            </h2>
            <Grid>
              {landing.data.steps.map((step) => (
                <Column key={step.title} lg={5} md={4} sm={4}>
                  <Tile style={{ height: '100%', textAlign: 'center', padding: '2rem' }}>
                    <div style={{
                      width: '64px', height: '64px', background: '#0f62fe', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'
                    }}>
                      {renderIcon(step)}
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#f4f4f4' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: '#c6c6c6' }}>
                      {step.description}
                    </p>
                  </Tile>
                </Column>
              ))}
            </Grid>
          </div>
        </section>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <section className="section" style={{ background: '#1a1a1a' }}>
            <div className="page-container">
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem', fontWeight: 400, color: '#f4f4f4' }}>
                {landing.data.featuredHeading}
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
          <section className="section" style={{ background: '#161616' }}>
            <div className="page-container">
              <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem', fontWeight: 400, color: '#f4f4f4' }}>
                {landing.data.moreHeading}
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
        <section className="section" style={{ background: '#1a1a1a' }}>
          <div className="page-container">
            <Tile style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', fontWeight: 600, color: '#f4f4f4' }}>{landing.data.riskTitle}</h3>
              {landing.data.riskParagraphs.map((paragraph) => (
                <p key={paragraph} style={{ color: '#c6c6c6', lineHeight: 1.6, marginBottom: '1rem' }}>
                  {paragraph}
                </p>
              ))}
              <p style={{ color: '#78a9ff', marginTop: '0.5rem' }}>
                <Link href="/risk-disclosure" style={{ color: '#78a9ff' }}>Read full risk disclosure</Link>
              </p>
            </Tile>
          </div>
        </section>

        {/* CTA for Founders */}
        <section style={{ background: '#262626', padding: '4rem 0' }}>
          <div className="page-container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 400, marginBottom: '1rem', color: '#f4f4f4' }}>
              {landing.data.founderTitle}
            </h2>
            <p style={{ color: '#c6c6c6', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              {landing.data.founderSubtitle}
            </p>
            <Button as={Link} href={landing.data.founderCtaHref} kind="tertiary" size="lg" renderIcon={ArrowRight}>
              {landing.data.founderCtaLabel}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
