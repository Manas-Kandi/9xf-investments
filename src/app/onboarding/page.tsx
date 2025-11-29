'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, TextInput, Button, InlineLoading, Checkbox, ProgressIndicator, ProgressStep } from '@carbon/react';
import { ArrowRight, Checkmark, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore } from '@/lib/store';
import styles from './page.module.scss';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, onboardingStep, setOnboardingStep, setUser, setFundingSource, isOnboarded } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState<'info' | 'success' | 'error'>('info');

  // KYC form state
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [ssn, setSsn] = useState('');

  // Funding state
  const [bankConnected, setBankConnected] = useState(false);

  // Terms state
  const [riskAccepted, setRiskAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
    if (isOnboarded) {
      router.push('/campaigns');
    }
  }, [user, isOnboarded, router]);

  const stepIndex = {
    account: 0,
    kyc: 0,
    funding: 1,
    terms: 2,
    complete: 3,
  }[onboardingStep];

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusTone('info');
    setStatusMessage('Verifying your identity...');

    // Simulate KYC verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user with KYC data
    if (user) {
      setUser({
        ...user,
        full_name: fullName,
        date_of_birth: dob,
        address,
        citizenship,
        ssn_last4: ssn.slice(-4),
        kyc_status: 'verified',
      });
    }

    setOnboardingStep('funding');
    setStatusTone('success');
    setStatusMessage('Identity verified. Continue to link your bank.');
    setIsLoading(false);
  };

  const handleConnectBank = async () => {
    setIsLoading(true);
    setStatusTone('info');
    setStatusMessage('Connecting to your bank...');

    // Simulate Plaid connection
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setFundingSource({
      id: '1',
      user_id: user?.id || '1',
      type: 'bank',
      institution_name: 'Chase Bank',
      last4: '4567',
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setBankConnected(true);
    setStatusTone('success');
    setStatusMessage('Bank connected. You can proceed to accept the terms.');
    setIsLoading(false);
  };

  const handleTermsSubmit = async () => {
    if (!riskAccepted || !termsAccepted) {
      setStatusTone('error');
      setStatusMessage('Please confirm the risk disclosure and terms to continue.');
      return;
    }

    setIsLoading(true);
    setStatusTone('info');
    setStatusMessage('Completing setup...');
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (user) {
      setUser({
        ...user,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
      });
    }

    setOnboardingStep('complete');
    setIsLoading(false);
    setStatusTone('success');
    setStatusMessage('You are all set. Redirecting to campaigns.');
    router.push('/campaigns');
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <main className={styles.pageMain} id="main-content">
        <div className={`page-container ${styles.sectionContainer}`}>
          <Grid>
            <Column lg={{ span: 8, offset: 4 }} md={8} sm={4}>
              {/* Progress Indicator */}
              <ProgressIndicator currentIndex={stepIndex} className={styles.progress}>
                <ProgressStep label="Verify identity" />
                <ProgressStep label="Link bank" />
                <ProgressStep label="Accept terms" />
              </ProgressIndicator>

              {statusMessage && (
                <div className={styles.feedback} role="status" aria-live="polite">
                  <div className={styles.statusRow}>
                    <InlineLoading
                      status={statusTone === 'error' ? 'error' : isLoading ? 'active' : 'finished'}
                      description={statusMessage}
                    />
                  </div>
                </div>
              )}

              {/* KYC Step */}
              {onboardingStep === 'kyc' && (
                <Tile className={styles.stepTile} aria-labelledby="kyc-heading">
                  <h1 id="kyc-heading" className={styles.stepHeading}>
                    Verify your identity
                  </h1>
                  <p className={styles.stepCopy}>
                    We need to verify your identity once to keep the platform safe and compliant.
                  </p>

                  <form onSubmit={handleKycSubmit}>
                    <TextInput
                      id="fullName"
                      labelText="Legal full name"
                      placeholder="As it appears on your ID"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className={styles.fieldGroup}
                    />
                    <TextInput
                      id="dob"
                      type="date"
                      labelText="Date of birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className={styles.fieldGroup}
                    />
                    <TextInput
                      id="address"
                      labelText="Address"
                      placeholder="Street, City, State, ZIP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      className={styles.fieldGroup}
                    />
                    <TextInput
                      id="citizenship"
                      labelText="Country of citizenship"
                      placeholder="e.g., United States"
                      value={citizenship}
                      onChange={(e) => setCitizenship(e.target.value)}
                      required
                      className={styles.fieldGroup}
                    />
                    <TextInput
                      id="ssn"
                      labelText="Last 4 digits of SSN"
                      placeholder="XXXX"
                      maxLength={4}
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value.replace(/\D/g, ''))}
                      required
                      className={styles.fieldGroup}
                    />

                    {isLoading ? (
                      <InlineLoading description="Verifying your identity..." />
                    ) : (
                      <Button
                        type="submit"
                        kind="primary"
                        size="lg"
                        renderIcon={ArrowRight}
                        className={styles.fullWidthAction}
                      >
                        Continue
                      </Button>
                    )}
                  </form>
                </Tile>
              )}

              {/* Funding Step */}
              {onboardingStep === 'funding' && (
                <Tile className={styles.stepTile} aria-labelledby="bank-heading">
                  <h1 id="bank-heading" className={styles.stepHeading}>
                    Link your bank account
                  </h1>
                  <p className={styles.stepCopy}>
                    Connect your bank account securely. Funds are only moved when you invest.
                  </p>

                  {!bankConnected ? (
                    <>
                      {isLoading ? (
                        <InlineLoading description="Connecting to your bank..." />
                      ) : (
                        <Button
                          kind="primary"
                          size="lg"
                          onClick={handleConnectBank}
                          className={styles.fullWidthAction}
                        >
                          Connect bank account
                        </Button>
                      )}
                      <p className={styles.helperText}>
                        We use Plaid to securely connect to your bank. We never store your login credentials.
                      </p>
                    </>
                  ) : (
                    <>
                      <Tile className={styles.bankConnected} aria-live="polite" role="status">
                        <div className={styles.bankRow}>
                          <Checkmark size={24} />
                          <div>
                            <p className={styles.bankTitle}>Bank connected</p>
                            <p className={styles.bankSubtitle}>Chase Bank ••••4567</p>
                          </div>
                        </div>
                      </Tile>
                      <Button
                        kind="primary"
                        size="lg"
                        renderIcon={ArrowRight}
                        onClick={() => setOnboardingStep('terms')}
                        className={styles.fullWidthAction}
                      >
                        Continue
                      </Button>
                    </>
                  )}
                </Tile>
              )}

              {/* Terms Step */}
              {onboardingStep === 'terms' && (
                <Tile className={styles.stepTile} aria-labelledby="terms-heading">
                  <h1 id="terms-heading" className={styles.stepHeading}>
                    Understand the risks
                  </h1>
                  <p className={styles.stepCopy}>
                    Please read and acknowledge the following before you can invest.
                  </p>

                  {/* Risk Warning */}
                  <Tile className={styles.riskTile} role="note" aria-labelledby="risk-info-heading">
                    <div>
                      <Warning size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 id="risk-info-heading" className={styles.riskHeading}>
                        Important risk information
                      </h3>
                      <ul className={styles.riskList}>
                        <li><strong>High risk:</strong> You could lose all of your investment.</li>
                        <li><strong>Illiquid:</strong> You may not be able to sell for many years.</li>
                        <li><strong>Not a deposit:</strong> This is not a savings account or insured product.</li>
                        <li><strong>No guarantees:</strong> Past performance does not predict future results.</li>
                      </ul>
                    </div>
                  </Tile>

                  {/* Checkboxes */}
                  <div className={styles.checkboxGroup}>
                    <Checkbox
                      id="riskAccepted"
                      labelText="I understand that this is a high-risk, long-term investment and I may lose all of my money."
                      checked={riskAccepted}
                      onChange={(_, { checked }) => setRiskAccepted(checked)}
                      className={styles.fieldGroup}
                    />
                    <Checkbox
                      id="termsAccepted"
                      labelText={
                        <>
                          I agree to the{' '}
                          <Link href="/terms" target="_blank">
                            Terms of Use
                          </Link>{' '}
                          and{' '}
                          <Link href="/risk-disclosure" target="_blank">
                            Risk Disclosure
                          </Link>
                          , and consent to receive documents electronically.
                        </>
                      }
                      checked={termsAccepted}
                      onChange={(_, { checked }) => setTermsAccepted(checked)}
                    />
                  </div>

                  {isLoading ? (
                    <InlineLoading description="Completing setup..." />
                  ) : (
                    <Button
                      kind="primary"
                      size="lg"
                      renderIcon={ArrowRight}
                      onClick={handleTermsSubmit}
                      disabled={!riskAccepted || !termsAccepted}
                      className={styles.fullWidthAction}
                    >
                      Agree and continue
                    </Button>
                  )}
                </Tile>
              )}
            </Column>
          </Grid>
        </div>
      </main>
    </>
  );
}
