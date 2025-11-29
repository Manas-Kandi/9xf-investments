'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, TextInput, Button, InlineLoading } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { useAppStore } from '@/lib/store';

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email && password) {
      setUser({
        id: '1',
        email,
        kyc_status: 'verified',
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      router.push('/');
    } else {
      setError('Please enter your email and password');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <main className="main-content" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="page-container" style={{ padding: '4rem 1rem' }}>
          <Grid>
            <Column lg={{ span: 6, offset: 5 }} md={{ span: 6, offset: 1 }} sm={4}>
              <Tile style={{ padding: '2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '0.5rem', color: '#f4f4f4' }}>
                  Welcome back
                </h1>
                <p style={{ color: '#c6c6c6', marginBottom: '2rem' }}>
                  Sign in to continue investing
                </p>

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

                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#c6c6c6' }}>
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" style={{ color: '#78a9ff', fontWeight: 500 }}>
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
