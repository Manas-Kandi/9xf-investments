import { Grid, Column, Tile, Button, Accordion, AccordionItem, Tag } from '@carbon/react';
import { ArrowRight, Security, Wallet, Time, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCmsContent } from '@/lib/hooks/useCmsContent';
import { fallbackHowItWorksContent, editorialGuidelines } from '@/lib/cms/fallback-content';
import { CmsStep } from '@/lib/cms/types';

export default function HowItWorksPage() {
  const content = useCmsContent('howItWorks', {
    initialData: fallbackHowItWorksContent,
    initialContext: editorialGuidelines,
  });

  const renderIcon = (step: CmsStep) => {
    switch (step.icon) {
      case 'shield':
        return <Security size={32} style={{ color: 'white' }} />;
      case 'wallet':
        return <Wallet size={32} style={{ color: 'white' }} />;
      case 'clock':
      default:
        return <Time size={32} style={{ color: 'white' }} />;
    }
  };

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px' }}>
        {/* Hero */}
        <section style={{ background: '#161616', color: 'white', padding: '5rem 0' }}>
          <div className="container">
            {content.source === 'fallback' && (
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <Tag type="warm-gray">Fallback copy</Tag>
                {content.context.fallbackMessage && (
                  <p style={{ color: '#c6c6c6', marginTop: '0.5rem' }}>{content.context.fallbackMessage}</p>
                )}
                <ul style={{ color: '#c6c6c6', lineHeight: 1.4, marginTop: '0.5rem', paddingLeft: '1.25rem', display: 'inline-block', textAlign: 'left' }}>
                  {content.context.guidelines.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}
            <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1.5rem', textAlign: 'center' }}>
              {content.data.heroTitle}
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              {content.data.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="section">
          <div className="container">
            <Grid>
              {content.data.steps.map((step) => (
                <Column key={step.title} lg={5} md={4} sm={4}>
                  <Tile style={{ height: '100%', padding: '2rem' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      background: '#0f62fe',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                    }}>
                      {renderIcon(step)}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                      {step.title}
                    </h3>
                    <p style={{ color: '#525252', lineHeight: 1.6 }}>
                      {step.description}
                    </p>
                  </Tile>
                </Column>
              ))}
            </Grid>
          </div>
        </section>

        {/* What you're buying */}
        <section className="section" style={{ background: '#f4f4f4' }}>
          <div className="container">
            <Grid>
              <Column lg={{ span: 10, offset: 3 }} md={8} sm={4}>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem', textAlign: 'center' }}>
                  {content.data.buyingTitle}
                </h2>
                <Tile style={{ padding: '2rem' }}>
                  <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    {content.data.buyingIntro}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 2 }}>
                    {content.data.buyingBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Risks */}
        <section className="section">
          <div className="container">
            <Grid>
              <Column lg={{ span: 10, offset: 3 }} md={8} sm={4}>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem', textAlign: 'center' }}>
                  {content.data.riskTitle}
                </h2>
                <Tile style={{ padding: '2rem', background: '#fff8e1', border: '1px solid #f1c21b' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Warning size={32} style={{ color: '#8a6d3b', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8a6d3b' }}>
                        {content.data.riskIntro}
                      </h3>
                      <p style={{ color: '#8a6d3b', lineHeight: 1.6 }}>
                        Most startups fail. You should only invest money you can afford to lose entirely.
                      </p>
                    </div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#8a6d3b', lineHeight: 2 }}>
                    {content.data.riskBullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" style={{ background: '#f4f4f4' }}>
          <div className="container">
            <Grid>
              <Column lg={{ span: 10, offset: 3 }} md={8} sm={4}>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem', textAlign: 'center' }}>
                  {content.data.faqHeading}
                </h2>
                <Tile style={{ padding: '2rem' }}>
                  <Accordion>
                    {content.data.faqs.map((faq) => (
                      <AccordionItem key={faq.question} title={faq.question}>
                        <p style={{ lineHeight: 1.6 }}>
                          {faq.answer}
                        </p>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#161616', color: 'white', padding: '4rem 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>
              {content.data.ctaTitle}
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
              {content.data.ctaSubtitle}
            </p>
            <Button
              as={Link}
              href={content.data.ctaHref}
              kind="primary"
              size="lg"
              renderIcon={ArrowRight}
            >
              {content.data.ctaLabel}
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
