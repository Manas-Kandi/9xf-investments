import { Grid, Column, Tile, Button, Accordion, AccordionItem } from '@carbon/react';
import { ArrowRight, Security, Wallet, Time, Warning, Checkmark } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main style={{ marginTop: '48px' }}>
        {/* Hero */}
        <section style={{ background: '#161616', color: 'white', padding: '5rem 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '3rem', fontWeight: 300, marginBottom: '1.5rem', textAlign: 'center' }}>
              How 9xf labs works
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
              Investing in startups, simplified. One-time setup, then invest in seconds.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="section">
          <div className="container">
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
                    <Security size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    1. Create your account
                  </h3>
                  <p style={{ color: '#525252', lineHeight: 1.6 }}>
                    Sign up with email or Google/Apple. Complete a simple identity verification (KYC) once. 
                    This keeps the platform safe and compliant with regulations.
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
                    <Wallet size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    2. Link your bank
                  </h3>
                  <p style={{ color: '#525252', lineHeight: 1.6 }}>
                    Securely connect your bank account using Plaid. We never store your login credentials. 
                    Funds are only moved when you confirm an investment.
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
                    <Time size={32} style={{ color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                    3. Invest in seconds
                  </h3>
                  <p style={{ color: '#525252', lineHeight: 1.6 }}>
                    Browse campaigns, pick an amount, and confirm. That&apos;s it. 
                    After your one-time setup, investing takes just a few taps.
                  </p>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* What you're buying */}
        <section className="section" style={{ background: '#f4f4f4' }}>
          <div className="container">
            <Grid>
              <Column lg={{ span: 10, offset: 3 }} md={8} sm={4}>
                <h2 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '2rem', textAlign: 'center' }}>
                  What you&apos;re actually buying
                </h2>
                <Tile style={{ padding: '2rem' }}>
                  <p style={{ lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    When you invest through 9xf labs, you&apos;re buying a share of a <strong>pooled investment vehicle</strong> (like an SPV or fund) 
                    that holds equity in the startup. This means:
                  </p>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 2 }}>
                    <li>You own a piece of the vehicle, which owns shares in the company</li>
                    <li>All investors are pooled together, keeping the startup&apos;s cap table clean</li>
                    <li>If the company is acquired or goes public, proceeds are distributed proportionally</li>
                    <li>There are no dividends or regular payouts—this is a long-term investment</li>
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
                  Understanding the risks
                </h2>
                <Tile style={{ padding: '2rem', background: '#fff8e1', border: '1px solid #f1c21b' }}>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <Warning size={32} style={{ color: '#8a6d3b', flexShrink: 0 }} />
                    <div>
                      <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#8a6d3b' }}>
                        Startup investing is high-risk
                      </h3>
                      <p style={{ color: '#8a6d3b', lineHeight: 1.6 }}>
                        Most startups fail. You should only invest money you can afford to lose entirely.
                      </p>
                    </div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#8a6d3b', lineHeight: 2 }}>
                    <li><strong>Loss of capital:</strong> You could lose 100% of your investment</li>
                    <li><strong>Illiquidity:</strong> You may not be able to sell for 5-10+ years</li>
                    <li><strong>No guarantees:</strong> Past performance doesn&apos;t predict future results</li>
                    <li><strong>Limited information:</strong> Startups don&apos;t report like public companies</li>
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
                  Frequently asked questions
                </h2>
                <Tile style={{ padding: '2rem' }}>
                  <Accordion>
                    <AccordionItem title="Who can invest?">
                      <p style={{ lineHeight: 1.6 }}>
                        Anyone 18+ who is a US resident can invest through 9xf labs. You don&apos;t need to be an accredited investor. 
                        There are annual limits on how much you can invest based on your income and net worth.
                      </p>
                    </AccordionItem>
                    <AccordionItem title="What's the minimum investment?">
                      <p style={{ lineHeight: 1.6 }}>
                        Minimums vary by campaign but typically start at $50. Each campaign also has a maximum per-person limit 
                        (usually $1,000-$2,500) to ensure broad participation.
                      </p>
                    </AccordionItem>
                    <AccordionItem title="How do I make money?">
                      <p style={{ lineHeight: 1.6 }}>
                        If the startup is acquired or goes public, you receive your proportional share of the proceeds. 
                        There are no dividends or regular payouts. This is a long-term investment that could take 5-10+ years to see returns, if ever.
                      </p>
                    </AccordionItem>
                    <AccordionItem title="Can I sell my investment?">
                      <p style={{ lineHeight: 1.6 }}>
                        These are illiquid investments. You typically cannot sell until there&apos;s an exit event (acquisition or IPO). 
                        We may offer secondary liquidity options in the future, but this is not guaranteed.
                      </p>
                    </AccordionItem>
                    <AccordionItem title="What happens if the startup fails?">
                      <p style={{ lineHeight: 1.6 }}>
                        If the startup fails, you lose your investment. Most startups fail. Only invest what you can afford to lose.
                      </p>
                    </AccordionItem>
                    <AccordionItem title="How are startups selected?">
                      <p style={{ lineHeight: 1.6 }}>
                        Every company on 9xf labs is reviewed by our team. We look for strong founders, clear business models, 
                        and reasonable terms. However, our review is not a guarantee of success or endorsement.
                      </p>
                    </AccordionItem>
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
              Ready to start investing?
            </h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
              Browse live campaigns and invest in startups you believe in.
            </p>
            <Button
              as={Link}
              href="/campaigns"
              kind="primary"
              size="lg"
              renderIcon={ArrowRight}
            >
              Browse campaigns
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
