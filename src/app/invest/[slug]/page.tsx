'use client';

import { useState, useEffect, use, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Grid,
  Column,
  Tile,
  Button,
  InlineLoading,
  Checkbox,
  NumberInput,
  Tag,
} from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore } from '@/lib/store';
import type { Campaign } from '@/types/database';
import { createClient } from '@/lib/supabase/client';
import { getCampaignBySlug } from '@/lib/mock-data';

interface InvestPageProps {
  params: Promise<{ slug: string }>;
}

type InvestStep = 'amount' | 'confirm' | 'processing' | 'success' | 'error';
type TransactionState = 'processing' | 'succeeded' | 'failed';

interface TransactionReceipt {
  receipt_url?: string;
  payment_intent_id?: string;
}

interface ApiResponse {
  id: string;
  status: TransactionState;
  receipt_url?: string;
  payment_intent_id?: string;
  error?: string;
}

export default function InvestPage({ params }: InvestPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const { user, isOnboarded, fundingSource, addInvestment } = useAppStore();
  const [step, setStep] = useState<InvestStep>('amount');
  const [amount, setAmount] = useState<number>(0);
  const [confirmed, setConfirmed] = useState(false);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignError, setCampaignError] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<TransactionState>('processing');
  const [processingMessage, setProcessingMessage] = useState('Processing your investment...');
  const [receipt, setReceipt] = useState<TransactionReceipt>({});
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!user) {
      router.push(`/auth/signin?redirect=/invest/${slug}`);
      return;
    }
    if (!isOnboarded) {
      router.push('/onboarding');
    }
  }, [user, isOnboarded, router, slug]);

  useEffect(() => {
    let isMounted = true;

    const fetchCampaign = async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        setCampaignError('Unable to load campaign from Supabase, showing fallback data.');
        setCampaign(getCampaignBySlug(slug) || null);
        return;
      }

      if (!data) {
        setCampaignError('Campaign not found');
        setCampaign(null);
        return;
      }

      setCampaign(data as Campaign);
      setCampaignError(null);
    };

    fetchCampaign();

    return () => {
      isMounted = false;
    };
  }, [slug, supabase]);

  if (!campaign) {
    return (
      <>
        <Header />
        <main
          style={{
            marginTop: '48px',
            minHeight: 'calc(100vh - 48px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tile style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>{campaignError || 'Campaign not found'}</h1>
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
      setStep('confirm');
    }
  };

  const pollTransaction = async (investmentId: string) => {
    const pollInterval = 2000;
    const maxAttempts = 10;
    let attempts = 0;

    const intervalId = setInterval(async () => {
      attempts += 1;
      const res = await fetch(`/api/investments/${investmentId}`);
      const data: ApiResponse = await res.json();

      if (!res.ok || data.error) {
        clearInterval(intervalId);
        setProcessingStatus('failed');
        setProcessingMessage(data.error || 'Payment failed.');
        setStep('error');
        return;
      }

      if (data.status === 'succeeded' || data.status === 'failed' || attempts >= maxAttempts) {
        clearInterval(intervalId);

        if (data.status === 'succeeded') {
          setProcessingStatus('succeeded');
          setReceipt({ receipt_url: data.receipt_url, payment_intent_id: data.payment_intent_id });
          addInvestment({
            id: investmentId,
            user_id: user?.id || '1',
            campaign_id: campaign.id,
            amount,
            status: 'confirmed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            partner_tx_id: data.payment_intent_id,
            campaign,
          });
          setStep('success');
        } else {
          setProcessingStatus('failed');
          setProcessingMessage('Payment failed. Please try again.');
          setStep('error');
        }
      }
    }, pollInterval);
  };

  const handleConfirmInvestment = async () => {
    if (!confirmed || !fundingSource) return;

    setStep('processing');
    setProcessingStatus('processing');
    setProcessingMessage('Processing your payment in the sandbox...');

    const res = await fetch('/api/investments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        campaignSlug: slug,
        fundingSourceId: fundingSource.id,
        paymentMethod: fundingSource.type,
        userId: user?.id,
      }),
    });

    const data: ApiResponse = await res.json();

    if (!res.ok || data.error) {
      setProcessingStatus('failed');
      setProcessingMessage(data.error || 'Payment failed.');
      setStep('error');
      return;
    }

    setReceipt({ receipt_url: data.receipt_url, payment_intent_id: data.payment_intent_id });
    await pollTransaction(data.id);
  };

  if (!user || !isOnboarded) return null;

  return (
    <>
      <Header />
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
                  <InlineLoading description={processingMessage} style={{ justifyContent: 'center' }} />
                  <p style={{ color: '#525252', marginTop: '1rem' }}>{processingMessage}</p>
                  <Tag type={processingStatus === 'processing' ? 'blue' : processingStatus === 'succeeded' ? 'green' : 'red'}>
                    {processingStatus === 'processing' && 'Processing payment'}
                    {processingStatus === 'succeeded' && 'Payment succeeded'}
                    {processingStatus === 'failed' && 'Payment failed'}
                  </Tag>
                  {receipt.receipt_url && (
                    <p style={{ marginTop: '1rem' }}>
                      Sandbox receipt: <Link href={receipt.receipt_url}>{receipt.receipt_url}</Link>
                    </p>
                  )}
                </Tile>
              )}

              {/* Success */}
              {step === 'success' && (
                <Tile style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#defbe6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}
                  >
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

                  {receipt.receipt_url && (
                    <Tile style={{ background: '#e8f0ff', padding: '1rem', marginBottom: '1.5rem' }}>
                      <p style={{ margin: 0 }}>
                        Sandbox receipt:{' '}
                        <Link href={receipt.receipt_url} target="_blank">
                          View receipt
                        </Link>
                      </p>
                    </Tile>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <Button as={Link} href="/investments" kind="primary" size="lg" style={{ width: '100%' }}>
                      View my investments
                    </Button>
                    <Button as={Link} href="/campaigns" kind="tertiary" size="lg" style={{ width: '100%' }}>
                      Browse more campaigns
                    </Button>
                  </div>
                </Tile>
              )}

              {/* Error */}
              {step === 'error' && (
                <Tile style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#fff1f1',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                    }}
                  >
                    <Warning size={40} style={{ color: '#da1e28' }} />
                  </div>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Payment failed
                  </h1>
                  <p style={{ color: '#525252', marginBottom: '2rem' }}>{processingMessage}</p>
                  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                    <Button kind="primary" size="lg" style={{ width: '100%' }} onClick={() => setStep('confirm')}>
                      Try again
                    </Button>
                    <Button as={Link} href="/campaigns" kind="tertiary" size="lg" style={{ width: '100%' }}>
                      Browse campaigns
                    </Button>
                  </div>
                </Tile>
              )}
            </Column>
          </Grid>
        </div>
      </main>
    </>
  );
}
