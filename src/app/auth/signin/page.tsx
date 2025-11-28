'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, TextInput, Button, InlineLoading } from '@carbon/react';
import { ArrowRight, UserFollow } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore } from '@/lib/store';

export default function SignInPage() {
  const router = useRouter();
  const { setUser, setOnboardingStep } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For MVP demo, accept any email/password
    if (email && password) {
      // Create mock user
      setUser({
        id: '1',
        email,
        kyc_status: 'pending',
        terms_accepted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setOnboardingStep('kyc');
      router.push('/onboarding');
    } else {
      setError('Please enter your email and password');
    }

    setIsLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      email: `user@${provider}.com`,
      kyc_status: 'pending',
      terms_accepted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    setOnboardingStep('kyc');
    router.push('/onboarding');
  };

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)', background: '#f4f4f4', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ padding: '4rem 1rem' }}>
          <Grid>
            <Column lg={{ span: 6, offset: 5 }} md={{ span: 6, offset: 1 }} sm={4}>
              <Tile style={{ padding: '2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Welcome back
                </h1>
                <p style={{ color: '#525252', marginBottom: '2rem' }}>
                  Sign in to continue investing
                </p>

                {/* OAuth Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Button
                    kind="tertiary"
                    size="lg"
                    renderIcon={UserFollow}
                    onClick={() => handleOAuth('google')}
                    disabled={isLoading}
                    style={{ width: '100%' }}
                  >
                    Continue with Google
                  </Button>
                  <Button
                    kind="tertiary"
                    size="lg"
                    renderIcon={UserFollow}
                    onClick={() => handleOAuth('apple')}
                    disabled={isLoading}
                    style={{ width: '100%' }}
                  >
                    Continue with Apple
                  </Button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
                  <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                  <span style={{ color: '#525252', fontSize: '0.875rem' }}>or</span>
                  <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }} />
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSignIn}>
                  <TextInput
                    id="email"
                    type="email"
                    labelText="Email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    style={{ marginBottom: '1rem' }}
                  />
                  <TextInput
                    id="password"
                    type="password"
                    labelText="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    invalid={!!error}
                    invalidText={error}
                    style={{ marginBottom: '1.5rem' }}
                  />

                  {isLoading ? (
                    <InlineLoading description="Signing in..." />
                  ) : (
                    <Button
                      type="submit"
                      kind="primary"
                      size="lg"
                      renderIcon={ArrowRight}
                      style={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  )}
                </form>

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#525252' }}>
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" style={{ color: '#0f62fe', fontWeight: 500 }}>
                    Create one
                  </Link>
                </p>
              </Tile>
            </Column>
          </Grid>
        </div>
      </main>
    </>
  );
}
