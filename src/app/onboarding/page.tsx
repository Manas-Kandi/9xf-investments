'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Grid,
  Column,
  Tile,
  TextInput,
  Button,
  InlineLoading,
  Checkbox,
  ProgressIndicator,
  ProgressStep,
} from '@carbon/react';
import { ArrowRight, Checkmark, Warning } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore, type OnboardingStep } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import { useForm } from '@/lib/vendor/react-hook-form';
import { z } from '@/lib/vendor/zod';
import { zodResolver } from '@/lib/vendor/zod-resolver';

const kycSchema = z.object({
  fullName: z.string().nonempty('Legal name is required'),
  dob: z.string().nonempty('Date of birth is required'),
  address: z.string().min(5, 'Address is required'),
  citizenship: z.string().nonempty('Country of citizenship is required'),
  ssn: z.string().regex(/^\d{4}$/g, 'Enter last 4 digits'),
});

const termsSchema = z.object({
  riskAccepted: z.boolean().refine((value) => value === true, 'You must acknowledge the risk'),
  termsAccepted: z.boolean().refine((value) => value === true, 'You must accept the terms'),
});

type KycFormValues = {
  fullName: string;
  dob: string;
  address: string;
  citizenship: string;
  ssn: string;
};

type TermsFormValues = {
  riskAccepted: boolean;
  termsAccepted: boolean;
};

const stepIndexByStep: Record<OnboardingStep, number> = {
  account: 0,
  kyc: 0,
  funding: 1,
  terms: 2,
  complete: 3,
};

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const {
    user,
    onboardingStep,
    setOnboardingStep,
    setUser,
    setFundingSource,
    isOnboarded,
    fundingSource,
  } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [submitError, setSubmitError] = useState('');

  const kycForm = useForm<KycFormValues>({
    resolver: zodResolver(kycSchema),
    defaultValues: {
      fullName: '',
      dob: '',
      address: '',
      citizenship: '',
      ssn: '',
    },
  });

  const termsForm = useForm<TermsFormValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: {
      riskAccepted: false,
      termsAccepted: false,
    },
  });

  const hasVerifiedIdentity = user?.kyc_status === 'verified';
  const hasFundingMethod = fundingSource?.status === 'active';
  const hasAcceptedTerms = Boolean(user?.terms_accepted);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    if (isOnboarded) {
      router.push('/campaigns');
    }
  }, [user, isOnboarded, router]);

  useEffect(() => {
    if (!user) return;

    const hydrateProfile = async () => {
      setInitializing(true);
      setSubmitError('');

      const { data: profile } = await supabase
        .from('users')
        .select(
          'full_name, date_of_birth, address, citizenship, ssn_last4, kyc_status, terms_accepted, terms_accepted_at'
        )
        .eq('id', user.id)
        .maybeSingle();

      const { data: fundingData } = await supabase
        .from('funding_sources')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (profile) {
        setUser({ ...user, ...profile });
        kycForm.reset({
          fullName: profile.full_name || '',
          dob: profile.date_of_birth || '',
          address: profile.address || '',
          citizenship: profile.citizenship || '',
          ssn: profile.ssn_last4 || '',
        });
        termsForm.reset({
          riskAccepted: Boolean(profile.terms_accepted),
          termsAccepted: Boolean(profile.terms_accepted),
        });
      }

      if (fundingData) {
        setFundingSource(fundingData);
      }

      const verified = profile?.kyc_status === 'verified' || hasVerifiedIdentity;
      const funded = fundingData?.status === 'active' || hasFundingMethod;
      const accepted = Boolean(profile?.terms_accepted) || hasAcceptedTerms;

      const nextStep: OnboardingStep = verified ? (funded ? (accepted ? 'complete' : 'terms') : 'funding') : 'kyc';

      setOnboardingStep(nextStep);
      setInitializing(false);
    };

    hydrateProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase, hasAcceptedTerms, hasFundingMethod, hasVerifiedIdentity]);

  const handleKycSubmit = kycForm.handleSubmit(async (values) => {
    if (!user) return;

    setSubmitError('');
    setIsLoading(true);

    const now = new Date().toISOString();
    const { error } = await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      full_name: values.fullName,
      date_of_birth: values.dob,
      address: values.address,
      citizenship: values.citizenship,
      ssn_last4: values.ssn,
      kyc_status: 'verified',
      terms_accepted: Boolean(user.terms_accepted),
      terms_accepted_at: user.terms_accepted_at,
      created_at: user.created_at,
      updated_at: now,
    });

    if (error) {
      setSubmitError('We could not verify your identity right now. Please try again.');
      setIsLoading(false);
      return;
    }

    setUser({
      ...user,
      full_name: values.fullName,
      date_of_birth: values.dob,
      address: values.address,
      citizenship: values.citizenship,
      ssn_last4: values.ssn,
      kyc_status: 'verified',
    });

    setOnboardingStep('funding');
    setIsLoading(false);
  });

  const handleConnectBank = async () => {
    if (!user) return;

    setSubmitError('');
    setIsLoading(true);
    const now = new Date().toISOString();
    const payload = {
      id: fundingSource?.id || `fs_${Date.now()}`,
      user_id: user.id,
      type: 'bank' as const,
      institution_name: 'Chase Bank',
      last4: '4567',
      status: 'active' as const,
      created_at: fundingSource?.created_at || now,
      updated_at: now,
    };

    const { data, error } = await supabase
      .from('funding_sources')
      .upsert(payload)
      .select()
      .single();

    if (error) {
      setSubmitError('Unable to connect your bank right now. Please try again.');
      setIsLoading(false);
      return;
    }

    setFundingSource(data);
    setOnboardingStep('terms');
    setIsLoading(false);
  };

  const handleTermsSubmit = termsForm.handleSubmit(async ({ riskAccepted, termsAccepted }) => {
    if (!user || !riskAccepted || !termsAccepted) return;

    setSubmitError('');
    setIsLoading(true);
    const acceptedAt = new Date().toISOString();

    const { error } = await supabase
      .from('users')
      .update({ terms_accepted: true, terms_accepted_at: acceptedAt })
      .eq('id', user.id);

    if (error) {
      setSubmitError('Saving your agreement failed. Please try again.');
      setIsLoading(false);
      return;
    }

    setUser({ ...user, terms_accepted: true, terms_accepted_at: acceptedAt });
    setOnboardingStep('complete');
    setIsLoading(false);
    router.push('/campaigns');
  });

  if (!user) return null;

  const currentIndex = stepIndexByStep[onboardingStep];

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', background: '#f4f4f4' }}>
        <div className="container" style={{ padding: '3rem 1rem' }}>
          <Grid>
            <Column lg={{ span: 8, offset: 4 }} md={8} sm={4}>
              <ProgressIndicator currentIndex={currentIndex} style={{ marginBottom: '1.5rem' }}>
                <ProgressStep
                  label="Verify identity"
                  description={hasVerifiedIdentity ? 'Verified' : 'In progress'}
                  state={hasVerifiedIdentity ? 'complete' : 'current'}
                />
                <ProgressStep
                  label="Link bank"
                  description={hasFundingMethod ? 'Connected' : 'Required'}
                  state={hasFundingMethod ? 'complete' : onboardingStep === 'funding' ? 'current' : 'incomplete'}
                />
                <ProgressStep
                  label="Accept terms"
                  description={hasAcceptedTerms ? 'Accepted' : 'Pending'}
                  state={hasAcceptedTerms ? 'complete' : onboardingStep === 'terms' ? 'current' : 'incomplete'}
                />
              </ProgressIndicator>

              <Tile style={{ padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ margin: 0, fontWeight: 600 }}>Your onboarding progress</p>
                <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <StatusRow
                    label="Identity verification"
                    complete={hasVerifiedIdentity}
                    description={hasVerifiedIdentity ? 'Identity verified' : 'Provide your personal details'}
                  />
                  <StatusRow
                    label="Funding method"
                    complete={hasFundingMethod}
                    description={
                      hasFundingMethod
                        ? `${fundingSource?.institution_name} ••••${fundingSource?.last4}`
                        : 'Connect a bank account to continue'
                    }
                  />
                  <StatusRow
                    label="Signed disclosures"
                    complete={hasAcceptedTerms}
                    description={hasAcceptedTerms ? 'Terms accepted' : 'Agree to the terms and risk disclosure'}
                  />
                </div>
              </Tile>

              {submitError && (
                <Tile style={{ padding: '1rem', marginBottom: '1rem', background: '#fff1f1', border: '1px solid #ffb3b8' }}>
                  <p style={{ margin: 0, color: '#da1e28' }}>{submitError}</p>
                </Tile>
              )}

              {initializing ? (
                <Tile style={{ padding: '2.5rem' }}>
                  <InlineLoading description="Loading your onboarding progress..." />
                </Tile>
              ) : (
                <>
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
                          value={(kycForm.watch('fullName') as string) || ''}
                          onChange={kycForm.register('fullName').onChange}
                          invalid={Boolean(kycForm.formState.errors.fullName)}
                          invalidText={kycForm.formState.errors.fullName?.message}
                          disabled={isLoading}
                          style={{ marginBottom: '1rem' }}
                        />
                        <TextInput
                          id="dob"
                          type="date"
                          labelText="Date of birth"
                          value={(kycForm.watch('dob') as string) || ''}
                          onChange={kycForm.register('dob').onChange}
                          invalid={Boolean(kycForm.formState.errors.dob)}
                          invalidText={kycForm.formState.errors.dob?.message}
                          disabled={isLoading}
                          style={{ marginBottom: '1rem' }}
                        />
                        <TextInput
                          id="address"
                          labelText="Address"
                          placeholder="Street, City, State, ZIP"
                          value={(kycForm.watch('address') as string) || ''}
                          onChange={kycForm.register('address').onChange}
                          invalid={Boolean(kycForm.formState.errors.address)}
                          invalidText={kycForm.formState.errors.address?.message}
                          disabled={isLoading}
                          style={{ marginBottom: '1rem' }}
                        />
                        <TextInput
                          id="citizenship"
                          labelText="Country of citizenship"
                          placeholder="e.g., United States"
                          value={(kycForm.watch('citizenship') as string) || ''}
                          onChange={kycForm.register('citizenship').onChange}
                          invalid={Boolean(kycForm.formState.errors.citizenship)}
                          invalidText={kycForm.formState.errors.citizenship?.message}
                          disabled={isLoading}
                          style={{ marginBottom: '1rem' }}
                        />
                        <TextInput
                          id="ssn"
                          labelText="Last 4 digits of SSN"
                          placeholder="XXXX"
                          maxLength={4}
                          value={(kycForm.watch('ssn') as string) || ''}
                          onChange={(event) =>
                            kycForm.register('ssn').onChange({
                              ...event,
                              target: { ...event.target, value: event.target.value.replace(/\D/g, '') },
                            })
                          }
                          invalid={Boolean(kycForm.formState.errors.ssn)}
                          invalidText={kycForm.formState.errors.ssn?.message}
                          disabled={isLoading}
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

                  {onboardingStep === 'funding' && (
                    <Tile style={{ padding: '2.5rem' }}>
                      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Link your bank account
                      </h1>
                      <p style={{ color: '#525252', marginBottom: '2rem' }}>
                        Connect your bank account securely. Funds are only moved when you invest.
                      </p>

                      {!hasFundingMethod ? (
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
                          <p
                            style={{
                              marginTop: '1rem',
                              fontSize: '0.875rem',
                              color: '#525252',
                              textAlign: 'center',
                            }}
                          >
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
                                <p style={{ color: '#0e6027' }}>
                                  {fundingSource?.institution_name} ••••{fundingSource?.last4}
                                </p>
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

                  {onboardingStep === 'terms' && (
                    <Tile style={{ padding: '2.5rem' }}>
                      <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        Understand the risks
                      </h1>
                      <p style={{ color: '#525252', marginBottom: '2rem' }}>
                        Please read and acknowledge the following before you can invest.
                      </p>

                      <Tile
                        style={{
                          background: '#fff8e1',
                          padding: '1.5rem',
                          marginBottom: '2rem',
                          border: '1px solid #f1c21b',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                          <Warning size={24} style={{ color: '#8a6d3b', flexShrink: 0 }} />
                          <div>
                            <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#8a6d3b' }}>
                              Important risk information
                            </h3>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#8a6d3b', lineHeight: 1.8 }}>
                              <li>
                                <strong>High risk:</strong> You could lose all of your investment.
                              </li>
                              <li>
                                <strong>Illiquid:</strong> You may not be able to sell for many years.
                              </li>
                              <li>
                                <strong>Not a deposit:</strong> This is not a savings account or insured product.
                              </li>
                              <li>
                                <strong>No guarantees:</strong> Past performance does not predict future results.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Tile>

                      <div style={{ marginBottom: '2rem' }}>
                        <Checkbox
                          id="riskAccepted"
                          labelText="I understand that this is a high-risk, long-term investment and I may lose all of my money."
                          checked={Boolean(termsForm.watch('riskAccepted'))}
                          onChange={(_, { checked }) => termsForm.setValue('riskAccepted', checked)}
                          invalid={Boolean(termsForm.formState.errors.riskAccepted)}
                          invalidText={termsForm.formState.errors.riskAccepted?.message}
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
                          checked={Boolean(termsForm.watch('termsAccepted'))}
                          onChange={(_, { checked }) => termsForm.setValue('termsAccepted', checked)}
                          invalid={Boolean(termsForm.formState.errors.termsAccepted)}
                          invalidText={termsForm.formState.errors.termsAccepted?.message}
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
                          disabled={!termsForm.watch('riskAccepted') || !termsForm.watch('termsAccepted')}
                          style={{ width: '100%' }}
                        >
                          Agree and continue
                        </Button>
                      )}
                    </Tile>
                  )}
                </>
              )}
            </Column>
          </Grid>
        </div>
      </main>
    </>
  );
}

function StatusRow({
  label,
  description,
  complete,
}: {
  label: string;
  description: string;
  complete: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: complete ? '#defbe6' : '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {complete ? <Checkmark size={16} style={{ color: '#0e6027' }} /> : <Warning size={16} />}
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
        <p style={{ margin: 0, color: '#525252' }}>{description}</p>
      </div>
    </div>
  );
}
