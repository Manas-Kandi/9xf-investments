'use client';

import { Suspense, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Accordion from '@carbon/react/es/components/Accordion/Accordion.js';
import AccordionItem from '@carbon/react/es/components/Accordion/AccordionItem.js';
import Button from '@carbon/react/es/components/Button/Button.js';
import Column from '@carbon/react/es/components/Grid/Column.js';
import { Grid } from '@carbon/react/es/components/Grid/Grid.js';
import ProgressBar from '@carbon/react/es/components/ProgressBar/ProgressBar.js';
import Tag from '@carbon/react/es/components/Tag/Tag.js';
import { Tile } from '@carbon/react/es/components/Tile/Tile.js';
import { ArrowRight, Warning } from '@carbon/icons-react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getCampaignBySlug } from '@/lib/queries/campaigns';
import type { Campaign } from '@/types/database';

interface CampaignPageProps {
  params: { slug: string };
}

function CampaignSkeleton() {
  return (
    <main style={{ marginTop: '48px' }}>
      <section style={{ background: '#161616', color: 'white', padding: '4rem 0' }}>
        <div className="container">
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

      <section className="section">
        <div className="container">
          <Grid>
            <Column lg={10} md={5} sm={4}>
              <div className="card-skeleton" style={{ height: '620px' }} />
            </Column>
            <Column lg={6} md={3} sm={4}>
              <div className="card-skeleton" style={{ height: '280px', marginBottom: '1rem' }} />
              <div className="card-skeleton" style={{ height: '260px' }} />
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
    <main style={{ marginTop: '48px' }}>
      <section style={{ background: '#161616', color: 'white', padding: '4rem 0' }}>
        <div className="container">
          <Grid>
            <Column lg={10} md={6} sm={4}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    background: '#393939',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                >
                  {campaign.company_name.charAt(0)}
                </div>
                <div>
                  <Tag type={isLive ? 'green' : 'warm-gray'} style={{ marginBottom: '0.5rem' }}>
                    {isLive ? 'Raising now' : 'Coming soon'}
                  </Tag>
                  <h1 style={{ fontSize: '2rem', fontWeight: 600, margin: 0 }}>
                    {campaign.company_name}
                  </h1>
                </div>
              </div>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem' }}>
                {campaign.tagline}
              </p>
              {campaign.cover_image_url && (
                <div style={{ borderRadius: '12px', overflow: 'hidden', marginTop: '1rem', background: '#262626' }}>
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
                <Tile style={{ background: '#262626', padding: '1.5rem' }}>
                  <ProgressBar
                    value={progress}
                    max={100}
                    label={`$${campaign.amount_raised.toLocaleString()} raised`}
                    helperText={`${progress}% of $${campaign.target_amount.toLocaleString()} goal`}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Min investment</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>${campaign.min_investment}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Crowd allocation</p>
                      <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{campaign.crowd_percentage}%</p>
                    </div>
                  </div>
                  <Button
                    as={Link}
                    href={`/invest/${campaign.slug}`}
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    style={{ width: '100%', marginTop: '1.5rem' }}
                  >
                    Invest from ${campaign.min_investment}
                  </Button>
                </Tile>
              )}
            </Column>
          </Grid>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Grid>
            <Column lg={10} md={5} sm={4}>
              <Tile style={{ marginBottom: '2rem', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  About {campaign.company_name}
                </h2>
                <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {campaign.description}
                </p>

                {campaign.problem && (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      The problem
                    </h3>
                    <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: '#525252' }}>
                      {campaign.problem}
                    </p>
                  </>
                )}

                {campaign.solution && (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      Our solution
                    </h3>
                    <p style={{ lineHeight: 1.8, marginBottom: '1.5rem', color: '#525252' }}>
                      {campaign.solution}
                    </p>
                  </>
                )}

                {campaign.traction && (
                  <>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      Traction
                    </h3>
                    <p style={{ lineHeight: 1.8, color: '#525252' }}>
                      {campaign.traction}
                    </p>
                  </>
                )}

                {campaign.media_urls?.length ? (
                  <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
                    {campaign.media_urls.map((mediaUrl) => (
                      <div key={mediaUrl} style={{ borderRadius: '12px', overflow: 'hidden', background: '#f4f4f4' }}>
                        <Image
                          src={mediaUrl}
                          alt={`${campaign.company_name} media asset`}
                          width={1200}
                          height={720}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </Tile>

              <Tile style={{ marginBottom: '2rem', padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  Meet the founder
                </h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      background: '#e0e0e0',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: '#525252',
                      flexShrink: 0,
                    }}
                  >
                    {campaign.founder_name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{campaign.founder_name}</h3>
                    <p style={{ color: '#525252', lineHeight: 1.6 }}>{campaign.founder_bio}</p>
                  </div>
                </div>
              </Tile>

              <Tile style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>
                  Frequently asked questions
                </h2>
                <Accordion>
                  <AccordionItem title="What exactly am I buying?">
                    <p style={{ lineHeight: 1.6 }}>
                      You are investing in a pooled investment vehicle (like an SPV) that holds shares in {campaign.company_name}
                      . This means you own a piece of the vehicle, which in turn owns equity in the company.
                    </p>
                  </AccordionItem>
                  <AccordionItem title="How do I earn returns?">
                    <p style={{ lineHeight: 1.6 }}>
                      If {campaign.company_name} is acquired or goes public, the proceeds are distributed to investors
                      proportionally. There are no dividends or regular payouts—this is a long-term investment.
                    </p>
                  </AccordionItem>
                  <AccordionItem title="What if the company fails?">
                    <p style={{ lineHeight: 1.6 }}>
                      If the company fails, you could lose your entire investment. Startup investing is high-risk.
                      Only invest money you can afford to lose.
                    </p>
                  </AccordionItem>
                  <AccordionItem title="When can I get my money back?">
                    <p style={{ lineHeight: 1.6 }}>
                      This is an illiquid investment. You typically cannot sell your shares until there is an exit event
                      (acquisition or IPO), which could take 5-10+ years or may never happen.
                    </p>
                  </AccordionItem>
                </Accordion>
              </Tile>
            </Column>

            <Column lg={6} md={3} sm={4}>
              <Tile style={{ marginBottom: '2rem', padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Offer details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#525252' }}>Target raise</span>
                    <span style={{ fontWeight: 600 }}>${campaign.target_amount.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#525252' }}>Crowd allocation</span>
                    <span style={{ fontWeight: 600 }}>{campaign.crowd_percentage}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#525252' }}>Min investment</span>
                    <span style={{ fontWeight: 600 }}>${campaign.min_investment}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#525252' }}>Max per person</span>
                    <span style={{ fontWeight: 600 }}>${campaign.max_investment_per_person.toLocaleString()}</span>
                  </div>
                </div>
              </Tile>

              <Tile style={{ padding: '1.5rem', background: '#fff8e1', border: '1px solid #f1c21b' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Warning size={24} style={{ color: '#8a6d3b', flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8a6d3b' }}>
                      Investment risks
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#8a6d3b', lineHeight: 1.6 }}>
                      <li>You could lose all of your money</li>
                      <li>This is a long-term, illiquid investment</li>
                      <li>This is not a deposit or savings account</li>
                      <li>Past performance is not indicative of future results</li>
                    </ul>
                    <Link
                      href="/risk-disclosure"
                      style={{ color: '#8a6d3b', fontWeight: 600, display: 'inline-block', marginTop: '1rem' }}
                    >
                      Read full risk disclosure →
                    </Link>
                  </div>
                </div>
              </Tile>

              {isLive && (
                <div style={{ marginTop: '2rem' }}>
                  <Button
                    as={Link}
                    href={`/invest/${campaign.slug}`}
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    style={{ width: '100%' }}
                  >
                    Invest from ${campaign.min_investment}
                  </Button>
                </div>
              )}
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
