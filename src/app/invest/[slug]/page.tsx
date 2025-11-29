'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, Button, InlineLoading, Checkbox, NumberInput } from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore } from '@/lib/store';
import { getCampaignBySlug } from '@/lib/mock-data';
import styles from './page.module.scss';

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
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState<'info' | 'success' | 'error'>('info');
  const [amountError, setAmountError] = useState('');

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
        <main className={`${styles.pageMain} ${styles.notFoundMain}`} id="main-content">
          <Tile className={`${styles.contentTile} ${styles.centeredTile}`}>
            <h1>Campaign not found</h1>
            <Button as={Link} href="/campaigns" kind="primary">
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
    setAmountError('');
    setStatusMessage('');
  };

  const handleContinue = () => {
    if (amount < campaign.min_investment || amount > campaign.max_investment_per_person) {
      setAmountError(
        `Please enter an amount between $${campaign.min_investment} and $${campaign.max_investment_per_person.toLocaleString()}`
      );
      setStatusTone('error');
      setStatusMessage('Investment amount is outside the allowed range.');
      return;
    }

    setAmountError('');
    setStatusTone('info');
    setStatusMessage('Review your investment details.');
    setStep('confirm');
  };

  const handleConfirmInvestment = async () => {
    if (!confirmed) {
      setStatusTone('error');
      setStatusMessage('Please confirm you understand the risks before investing.');
      return;
    }

    setStep('processing');
    setStatusTone('info');
    setStatusMessage('Processing your investment...');

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create investment record
    addInvestment({
      id: crypto.randomUUID(),
      user_id: user?.id || '1',
      campaign_id: campaign.id,
      amount,
      status: 'confirmed',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      campaign,
    });

    setStep('success');
    setStatusTone('success');
    setStatusMessage('Investment confirmed.');
  };

  if (!user || !isOnboarded) return null;

  return (
    <>
      <Header />
      <main className={styles.pageMain} id="main-content">
        <div className={`page-container ${styles.sectionContainer}`}>
          <Grid>
            <Column lg={{ span: 8, offset: 4 }} md={8} sm={4}>
              {/* Amount Selection */}
              {step === 'amount' && (
                <Tile className={styles.contentTile} aria-labelledby="amount-heading">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={ArrowLeft}
                    as={Link}
                    href={`/campaigns/${slug}`}
                    className={styles.backButton}
                  >
                    Back to campaign
                  </Button>

                  <h1 id="amount-heading" className={styles.heading}>
                    Invest in {campaign.company_name}
                  </h1>
                  <p className={styles.subheading}>How much would you like to invest?</p>

                  {/* Preset Amounts */}
                  <div className={styles.presetGrid}>
                    {presetAmounts.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handleAmountSelect(preset)}
                        className={`${styles.presetButton} ${amount === preset ? styles.presetSelected : ''}`}
                        aria-pressed={amount === preset}
                        type="button"
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
                    invalid={!!amountError}
                    invalidText={amountError || undefined}
                  />

                  <Button
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    onClick={handleContinue}
                    disabled={amount < campaign.min_investment || amount > campaign.max_investment_per_person}
                    className={styles.fullWidthButton}
                  >
                    Continue with ${amount}
                  </Button>
                  {statusMessage && (
                    <p
                      className={styles.statusText}
                      role="status"
                      aria-live="polite"
                      data-status={statusTone}
                    >
                      {statusMessage}
                    </p>
                  )}
                </Tile>
              )}

              {/* Confirmation */}
              {step === 'confirm' && (
                <Tile className={styles.contentTile} aria-labelledby="confirm-heading">
                  <Button
                    kind="ghost"
                    size="sm"
                    renderIcon={ArrowLeft}
                    onClick={() => setStep('amount')}
                    className={styles.backButton}
                  >
                    Change amount
                  </Button>

                  <h1 id="confirm-heading" className={styles.heading}>
                    Confirm your investment
                  </h1>

                  {/* Summary */}
                  <Tile className={styles.summaryTile} role="group" aria-label="Investment summary">
                    <div className={styles.summaryRow}>
                      <span>Company</span>
                      <span className={styles.summaryValue}>{campaign.company_name}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Investment amount</span>
                      <span className={styles.summaryValue}>${amount.toLocaleString()}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Funding source</span>
                      <span className={styles.summaryValue}>
                        {fundingSource?.institution_name} ••••{fundingSource?.last4}
                      </span>
                    </div>
                  </Tile>

                  {/* Risk Warning */}
                  <Tile className={styles.riskTile} role="note">
                    <Warning size={20} aria-hidden="true" />
                    <p className={styles.riskCopy}>
                      This is a high-risk, long-term investment. You may lose all of this money, and you may not be able to sell for many years.
                    </p>
                  </Tile>

                  {/* Confirmation Checkbox */}
                  <Checkbox
                    id="confirmInvestment"
                    labelText="I confirm this investment and understand the risks."
                    checked={confirmed}
                    onChange={(_, { checked }) => setConfirmed(checked)}
                  />

                  <Button
                    kind="primary"
                    size="lg"
                    onClick={handleConfirmInvestment}
                    disabled={!confirmed}
                    className={styles.fullWidthButton}
                  >
                    Confirm investment
                  </Button>
                  {statusMessage && (
                    <p
                      className={styles.statusText}
                      role="status"
                      aria-live="polite"
                      data-status={statusTone}
                    >
                      {statusMessage}
                    </p>
                  )}
                </Tile>
              )}

              {/* Processing */}
              {step === 'processing' && (
                <Tile className={`${styles.contentTile} ${styles.centeredTile}`} role="status" aria-live="polite">
                  <InlineLoading description={statusMessage || 'Processing your investment...'} />
                  <p className={styles.statusText} data-status={statusTone}>
                    {statusMessage || 'Please wait while we process your investment.'}
                  </p>
                </Tile>
              )}

              {/* Success */}
              {step === 'success' && (
                <Tile className={`${styles.contentTile} ${styles.centeredTile}`} role="status" aria-live="polite">
                  <div className={styles.successIcon}>
                    <Checkmark size={40} />
                  </div>

                  <h1 className={styles.heading}>Investment confirmed!</h1>
                  <p className={styles.subheading}>
                    You&apos;ve invested ${amount.toLocaleString()} in {campaign.company_name}.
                  </p>

                  {statusMessage && (
                    <p className={styles.statusText} data-status={statusTone}>
                      {statusMessage}
                    </p>
                  )}

                  <Tile className={styles.listTile}>
                    <h3 className={styles.listHeading}>What happens next?</h3>
                    <ul className={styles.nextList}>
                      <li>You&apos;ll receive a confirmation email shortly.</li>
                      <li>Funds will be debited from your bank account within 3-5 business days.</li>
                      <li>You can view your investment in your portfolio at any time.</li>
                    </ul>
                  </Tile>

                  <div className={styles.actionStack}>
                    <Button
                      as={Link}
                      href="/investments"
                      kind="primary"
                      size="lg"
                      className={styles.fullWidthButton}
                    >
                      View my investments
                    </Button>
                    <Button
                      as={Link}
                      href="/campaigns"
                      kind="tertiary"
                      size="lg"
                      className={styles.fullWidthButton}
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
    </>
  );
}
