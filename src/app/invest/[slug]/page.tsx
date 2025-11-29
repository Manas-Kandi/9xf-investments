'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, Button, InlineLoading, Checkbox, NumberInput } from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useAppStore } from '@/lib/store';
import { getCampaignBySlug } from '@/lib/mock-data';
import { trackEvent } from '@/lib/analytics';

interface InvestPageProps {
  params: Promise<{ slug: string }>;
}

type InvestStep = 'amount' | 'confirm' | 'processing' | 'success' | 'error';

export default function InvestPage({ params }: InvestPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, isOnboarded, fundingSource, addInvestment } = useAppStore();
  const [step, setStep] = useState<InvestStep>('amount');
  const [amount, setAmount] = useState<number>(0);
  const [confirmed, setConfirmed] = useState(false);

  const campaign = getCampaignBySlug(slug);

  useEffect(() => {
    if (!user) {
      router.push(`/auth/signin?redirect=/invest/${slug}`);
      return;
    }
    if (!isOnboarded) {
      router.push('/onboarding');
    }
  }, [user, isOnboarded, router, slug]);

  if (!campaign) {
    return (
      <>
        <Header />
        <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Tile style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Campaign not found</h1>
            <Button as={Link} href="/campaigns" kind="primary" style={{ marginTop: '1rem' }}>
              Browse campaigns
            </Button>
          </Tile>
        </main>
      </>
    );
  }

  const presetAmounts = [50, 100, 250];

  const handleAmountSelect = (value: number) => {
    setAmount(value);
  };

  const handleContinue = () => {
    if (amount >= campaign.min_investment && amount <= campaign.max_investment_per_person) {
      trackEvent('invest_attempt', {
        amount,
        campaign: campaign.slug,
      });
      setStep('confirm');
    }
  };

  const handleConfirmInvestment = async () => {
    if (!confirmed) return;

    setStep('processing');

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create investment record
    addInvestment({
      id: Date.now().toString(),
      user_id: user?.id || '1',
      campaign_id: campaign.id,
      amount,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      campaign,
    });

    trackEvent('invest_success', {
      amount,
      campaign: campaign.slug,
    });

    setStep('success');
  };

  if (!user || !isOnboarded) return null;

  return (
    <>
      <Header />
      <ErrorBoundary title="Investment flow unavailable" description="We couldn't load the investment flow. Please refresh and try again.">
        <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', background: '#f4f4f4' }}>
          <div className="container" style={{ padding: '3rem 1rem' }}>
            <Grid>
              <Column lg={{ span: 8, offset: 4 }} md={8} sm={4}>
                {/* Amount Selection */}
                {step === 'amount' && (
                  <Tile style={{ padding: '2.5rem' }}>
                    <Button
                      kind="ghost"
                      size="sm"
                      renderIcon={ArrowLeft}
                      as={Link}
                      href={`/campaigns/${slug}`}
                      style={{ marginBottom: '1.5rem', marginLeft: '-1rem' }}
                    >
                      Back to campaign
                    </Button>

                    <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Invest in {campaign.company_name}
                    </h1>
                    <p style={{ color: '#525252', marginBottom: '2rem' }}>
                      How much would you like to invest?
                    </p>

                  {/* Preset Amounts */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleAmountSelect(preset)}
                        style={{
                          padding: '1.5rem',
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          border: amount === preset ? '2px solid #0f62fe' : '2px solid #e0e0e0',
                          background: amount === preset ? '#e0e0ff' : 'white',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        ${preset}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <NumberInput
                    id="customAmount"
                    label="Or enter a custom amount"
                    min={campaign.min_investment}
                    max={campaign.max_investment_per_person}
                    value={amount}
                    onChange={(_, { value }) => setAmount(Number(value) || 0)}
                    helperText={`Min: $${campaign.min_investment} · Max: $${campaign.max_investment_per_person.toLocaleString()}`}
                    style={{ marginBottom: '2rem' }}
                  />

                  <Button
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    onClick={handleContinue}
                    disabled={amount < campaign.min_investment || amount > campaign.max_investment_per_person}
                    style={{ width: '100%' }}
                  >
                    Continue with ${amount}
                  </Button>
                </Tile>
              )}

              {/* Confirmation */}
              {step === 'confirm' && (
                <Tile style={{ padding: '2.5rem' }}>
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={ArrowLeft}
                    onClick={() => setStep('amount')}
                    style={{ marginBottom: '1.5rem', marginLeft: '-1rem' }}
                  >
                    Change amount
                  </Button>

                  <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '2rem' }}>
                    Confirm your investment
                  </h1>

                  {/* Summary */}
                  <Tile style={{ background: '#f4f4f4', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                      <span style={{ color: '#525252' }}>Company</span>
                      <span style={{ fontWeight: 600 }}>{campaign.company_name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
                      <span style={{ color: '#525252' }}>Investment amount</span>
                      <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>${amount.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#525252' }}>Funding source</span>
                      <span style={{ fontWeight: 600 }}>
                        {fundingSource?.institution_name} ••••{fundingSource?.last4}
                      </span>
                    </div>
                  </Tile>

                  {/* Risk Warning */}
                  <Tile style={{ background: '#fff8e1', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #f1c21b' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <Warning size={20} style={{ color: '#8a6d3b', flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ color: '#8a6d3b', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                        This is a high-risk, long-term investment. You may lose all of this money, and you may not be able to sell for many years.
                      </p>
                    </div>
                  </Tile>

                  {/* Confirmation Checkbox */}
                  <Checkbox
                    id="confirmInvestment"
                    labelText="I confirm this investment and understand the risks."
                    checked={confirmed}
                    onChange={(_, { checked }) => setConfirmed(checked)}
                    style={{ marginBottom: '2rem' }}
                  />

                  <Button
                    kind="primary"
                    size="lg"
                    onClick={handleConfirmInvestment}
                    disabled={!confirmed}
                    style={{ width: '100%' }}
                  >
                    Confirm investment
                  </Button>
                </Tile>
              )}

              {/* Processing */}
              {step === 'processing' && (
                <Tile style={{ padding: '4rem 2.5rem', textAlign: 'center' }}>
                  <InlineLoading
                    description="Processing your investment..."
                    style={{ justifyContent: 'center' }}
                  />
                  <p style={{ color: '#525252', marginTop: '1rem' }}>
                    Please wait while we process your investment.
                  </p>
                </Tile>
              )}

              {/* Success */}
              {step === 'success' && (
                <Tile style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
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

                  <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Investment confirmed!
                  </h1>
                  <p style={{ color: '#525252', marginBottom: '2rem' }}>
                    You&apos;ve invested ${amount.toLocaleString()} in {campaign.company_name}.
                  </p>

                  <Tile style={{ background: '#f4f4f4', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                    <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>What happens next?</h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#525252', lineHeight: 1.8 }}>
                      <li>You&apos;ll receive a confirmation email shortly.</li>
                      <li>Funds will be debited from your bank account within 3-5 business days.</li>
                      <li>You can view your investment in your portfolio at any time.</li>
                    </ul>
                  </Tile>

                  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <Button
                      as={Link}
                      href="/investments"
                      kind="primary"
                      size="lg"
                      style={{ width: '100%' }}
                    >
                      View my investments
                    </Button>
                    <Button
                      as={Link}
                      href="/campaigns"
                      kind="tertiary"
                      size="lg"
                      style={{ width: '100%' }}
                    >
                      Browse more campaigns
                    </Button>
                  </div>
                </Tile>
              )}
              </Column>
            </Grid>
          </div>
        </main>
      </ErrorBoundary>
    </>
  );
}
