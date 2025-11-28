'use client';

import { useState } from 'react';
import { Grid, Column, Tile, TextInput, TextArea, Button, InlineLoading, Select, SelectItem } from '@carbon/react';
import { ArrowRight, Checkmark, Partnership, ChartLineData, UserMultiple } from '@carbon/icons-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function FoundersPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [stage, setStage] = useState('');
  const [description, setDescription] = useState('');
  const [desiredRaise, setDesiredRaise] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px' }}>
        {/* Hero */}
        <section style={{ background: '#161616', color: 'white', padding: '5rem 0' }}>
          <div className="container">
            <Grid>
              <Column lg={10} md={6} sm={4}>
                <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1.5rem', lineHeight: 1.2 }}>
                  Turn your customers into investors
                </h1>
                <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px' }}>
                  Allocate a small slice of your round to the crowd. Keep your cap table clean with a single pooled vehicle.
                </p>
                <Button
                  kind="primary"
                  size="lg"
                  renderIcon={ArrowRight}
                  onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Apply to raise
                </Button>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Benefits */}
        <section className="section" style={{ background: '#f4f4f4' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 300 }}>
              Why raise with 9xf labs?
            </h2>
            <Grid>
              <Column lg={5} md={4} sm={4}>
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
                    <UserMultiple size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Engaged community
                  </h3>
                  <p style={{ color: '#525252', lineHeight: 1.6 }}>
                    Turn your biggest fans into investors. They become your advocates, spreading the word and supporting your growth.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
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
                    <Partnership size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Clean cap table
                  </h3>
                  <p style={{ color: '#525252', lineHeight: 1.6 }}>
                    All crowd investors are pooled into a single SPV. One line on your cap table, no matter how many people invest.
                  </p>
                </Tile>
              </Column>
              <Column lg={5} md={4} sm={4}>
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
                    <ChartLineData size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    Simple process
                  </h3>
                  <p style={{ color: '#525252', lineHeight: 1.6 }}>
                    We handle the complexity. You focus on your business while we manage the legal, compliance, and investor communications.
                  </p>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* How it works */}
        <section className="section">
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 300 }}>
              How it works
            </h2>
            <Grid>
              <Column lg={{ span: 10, offset: 3 }} md={8} sm={4}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    { step: 1, title: 'Apply', desc: 'Fill out a short application. We review every company to ensure quality.' },
                    { step: 2, title: 'Set terms', desc: 'Decide how much to allocate to the crowd (typically 5-10% of your round).' },
                    { step: 3, title: 'Launch', desc: 'We create your campaign page and handle all the legal setup.' },
                    { step: 4, title: 'Share', desc: 'Share your unique link with your community. We promote to our investor base too.' },
                    { step: 5, title: 'Close', desc: 'Once you hit your target, we finalize the SPV and wire the funds.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: '#0f62fe',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>
                        {step}
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{title}</h3>
                        <p style={{ color: '#525252' }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Application Form */}
        <section id="apply-form" className="section" style={{ background: '#f4f4f4' }}>
          <div className="container">
            <Grid>
              <Column lg={{ span: 8, offset: 4 }} md={8} sm={4}>
                {submitted ? (
                  <Tile style={{ padding: '3rem', textAlign: 'center' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: '#defbe6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}>
                      <Checkmark size={40} style={{ color: '#0e6027' }} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Application received!
                    </h2>
                    <p style={{ color: '#525252', marginBottom: '1rem' }}>
                      Thanks for your interest in raising with 9xf labs.
                    </p>
                    <p style={{ color: '#525252' }}>
                      We&apos;ll review your application and get back to you within 5 business days.
                    </p>
                  </Tile>
                ) : (
                  <Tile style={{ padding: '2.5rem' }}>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Apply to raise with 9xf labs
                    </h2>
                    <p style={{ color: '#525252', marginBottom: '2rem' }}>
                      Tell us about your company. We&apos;ll be in touch within 5 business days.
                    </p>

                    <form onSubmit={handleSubmit}>
                      <TextInput
                        id="companyName"
                        labelText="Company name"
                        placeholder="Your company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextInput
                        id="website"
                        labelText="Website"
                        placeholder="https://yourcompany.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextInput
                        id="contactName"
                        labelText="Your name"
                        placeholder="Founder name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextInput
                        id="contactEmail"
                        type="email"
                        labelText="Email"
                        placeholder="you@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                        style={{ marginBottom: '1rem' }}
                      />
                      <Select
                        id="stage"
                        labelText="Stage"
                        value={stage}
                        onChange={(e) => setStage(e.target.value)}
                        style={{ marginBottom: '1rem' }}
                      >
                        <SelectItem value="" text="Select stage" />
                        <SelectItem value="pre-seed" text="Pre-seed" />
                        <SelectItem value="seed" text="Seed" />
                        <SelectItem value="series-a" text="Series A" />
                        <SelectItem value="other" text="Other" />
                      </Select>
                      <TextArea
                        id="description"
                        labelText="Tell us about your company"
                        placeholder="What does your company do? What problem are you solving?"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        style={{ marginBottom: '1rem' }}
                      />
                      <TextInput
                        id="desiredRaise"
                        labelText="How much do you want to raise from the crowd?"
                        placeholder="e.g., $100,000"
                        value={desiredRaise}
                        onChange={(e) => setDesiredRaise(e.target.value)}
                        style={{ marginBottom: '2rem' }}
                      />

                      {isLoading ? (
                        <InlineLoading description="Submitting application..." />
                      ) : (
                        <Button
                          type="submit"
                          kind="primary"
                          size="lg"
                          renderIcon={ArrowRight}
                          style={{ width: '100%' }}
                        >
                          Submit application
                        </Button>
                      )}
                    </form>
                  </Tile>
                )}
              </Column>
            </Grid>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
