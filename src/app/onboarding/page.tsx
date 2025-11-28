'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, TextInput, Button, InlineLoading, Checkbox, ProgressIndicator, ProgressStep } from '@carbon/react';
import { ArrowRight, Checkmark, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore, type OnboardingStep } from '@/lib/store';

export default function OnboardingPage() {
  const router = useRouter();
  const { user, onboardingStep, setOnboardingStep, setUser, setFundingSource, isOnboarded } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
  };

  const handleConnectBank = async () => {
    setIsLoading(true);

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
    setIsLoading(false);
  };

  const handleTermsSubmit = async () => {
    if (!riskAccepted || !termsAccepted) return;

    setIsLoading(true);
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
    router.push('/campaigns');
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', background: '#f4f4f4' }}>
        <div className="container" style={{ padding: '3rem 1rem' }}>
          <Grid>
            <Column lg={{ span: 8, offset: 4 }} md={8} sm={4}>
              {/* Progress Indicator */}
              <ProgressIndicator currentIndex={stepIndex} style={{ marginBottom: '2rem' }}>
                <ProgressStep label="Verify identity" />
                <ProgressStep label="Link bank" />
                <ProgressStep label="Accept terms" />
              </ProgressIndicator>

              {/* KYC Step */}
              {onboardingStep === 'kyc' && (
                <Tile style={{ padding: '2.5rem' }}>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Verify your identity
                  </h1>
                  <p style={{ color: '#525252', marginBottom: '2rem' }}>
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
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextInput
                      id="dob"
                      type="date"
                      labelText="Date of birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextInput
                      id="address"
                      labelText="Address"
                      placeholder="Street, City, State, ZIP"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextInput
                      id="citizenship"
                      labelText="Country of citizenship"
                      placeholder="e.g., United States"
                      value={citizenship}
                      onChange={(e) => setCitizenship(e.target.value)}
                      required
                      style={{ marginBottom: '1rem' }}
                    />
                    <TextInput
                      id="ssn"
                      labelText="Last 4 digits of SSN"
                      placeholder="XXXX"
                      maxLength={4}
                      value={ssn}
                      onChange={(e) => setSsn(e.target.value.replace(/\D/g, ''))}
                      required
                      style={{ marginBottom: '2rem' }}
                    />

                    {isLoading ? (
                      <InlineLoading description="Verifying your identity..." />
                    ) : (
                      <Button
                        type="submit"
                        kind="primary"
                        size="lg"
                        renderIcon={ArrowRight}
                        style={{ width: '100%' }}
                      >
                        Continue
                      </Button>
                    )}
                  </form>
                </Tile>
              )}

              {/* Funding Step */}
              {onboardingStep === 'funding' && (
                <Tile style={{ padding: '2.5rem' }}>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Link your bank account
                  </h1>
                  <p style={{ color: '#525252', marginBottom: '2rem' }}>
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
                          style={{ width: '100%' }}
                        >
                          Connect bank account
                        </Button>
                      )}
                      <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#525252', textAlign: 'center' }}>
                        We use Plaid to securely connect to your bank. We never store your login credentials.
                      </p>
                    </>
                  ) : (
                    <>
                      <Tile style={{ background: '#defbe6', padding: '1.5rem', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <Checkmark size={24} style={{ color: '#0e6027' }} />
                          <div>
                            <p style={{ fontWeight: 600, color: '#0e6027' }}>Bank connected</p>
                            <p style={{ color: '#0e6027' }}>Chase Bank ••••4567</p>
                          </div>
                        </div>
                      </Tile>
                      <Button
                        kind="primary"
                        size="lg"
                        renderIcon={ArrowRight}
                        onClick={() => setOnboardingStep('terms')}
                        style={{ width: '100%' }}
                      >
                        Continue
                      </Button>
                    </>
                  )}
                </Tile>
              )}

              {/* Terms Step */}
              {onboardingStep === 'terms' && (
                <Tile style={{ padding: '2.5rem' }}>
                  <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Understand the risks
                  </h1>
                  <p style={{ color: '#525252', marginBottom: '2rem' }}>
                    Please read and acknowledge the following before you can invest.
                  </p>

                  {/* Risk Warning */}
                  <Tile style={{ background: '#fff8e1', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #f1c21b' }}>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Warning size={24} style={{ color: '#8a6d3b', flexShrink: 0 }} />
                      <div>
                        <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#8a6d3b' }}>
                          Important risk information
                        </h3>
                        <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#8a6d3b', lineHeight: 1.8 }}>
                          <li><strong>High risk:</strong> You could lose all of your investment.</li>
                          <li><strong>Illiquid:</strong> You may not be able to sell for many years.</li>
                          <li><strong>Not a deposit:</strong> This is not a savings account or insured product.</li>
                          <li><strong>No guarantees:</strong> Past performance does not predict future results.</li>
                        </ul>
                      </div>
                    </div>
                  </Tile>

                  {/* Checkboxes */}
                  <div style={{ marginBottom: '2rem' }}>
                    <Checkbox
                      id="riskAccepted"
                      labelText="I understand that this is a high-risk, long-term investment and I may lose all of my money."
                      checked={riskAccepted}
                      onChange={(_, { checked }) => setRiskAccepted(checked)}
                      style={{ marginBottom: '1rem' }}
                    />
                    <Checkbox
                      id="termsAccepted"
                      labelText={
                        <>
                          I agree to the{' '}
                          <Link href="/terms" target="_blank" style={{ color: '#0f62fe' }}>
                            Terms of Use
                          </Link>{' '}
                          and{' '}
                          <Link href="/risk-disclosure" target="_blank" style={{ color: '#0f62fe' }}>
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
                      style={{ width: '100%' }}
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
