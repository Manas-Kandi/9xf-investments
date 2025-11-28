'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, Button, Tag } from '@carbon/react';
import { Logout, Edit, Checkmark } from '@carbon/icons-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAppStore } from '@/lib/store';

export default function AccountPage() {
  const router = useRouter();
  const { user, fundingSource, isOnboarded, logout } = useAppStore();

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
        {/* Header */}
        <section style={{ background: '#161616', color: 'white', padding: '3rem 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>
              Account settings
            </h1>
            <p style={{ opacity: 0.8 }}>
              Manage your profile and preferences
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <Grid>
              <Column lg={10} md={6} sm={4}>
                {/* Profile */}
                <Tile style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Profile</h2>
                    <Tag type={isOnboarded ? 'green' : 'warm-gray'} size="sm">
                      {isOnboarded ? 'Verified' : 'Pending verification'}
                    </Tag>
                  </div>
                  
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                      <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Email</p>
                      <p style={{ fontWeight: 500 }}>{user.email}</p>
                    </div>
                    {user.full_name && (
                      <div>
                        <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Name</p>
                        <p style={{ fontWeight: 500 }}>{user.full_name}</p>
                      </div>
                    )}
                    <div>
                      <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.25rem' }}>KYC Status</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {user.kyc_status === 'verified' ? (
                          <>
                            <Checkmark size={16} style={{ color: '#0e6027' }} />
                            <span style={{ color: '#0e6027' }}>Verified</span>
                          </>
                        ) : (
                          <span style={{ color: '#8a6d3b' }}>
                            {user.kyc_status === 'pending' ? 'Pending' : 'Failed'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Tile>

                {/* Funding Source */}
                <Tile style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Funding source</h2>
                    <Button kind="ghost" size="sm" renderIcon={Edit}>
                      Change
                    </Button>
                  </div>
                  
                  {fundingSource ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: '#e0e0e0',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        color: '#525252',
                      }}>
                        🏦
                      </div>
                      <div>
                        <p style={{ fontWeight: 500 }}>{fundingSource.institution_name}</p>
                        <p style={{ color: '#525252', fontSize: '0.875rem' }}>
                          ••••{fundingSource.last4}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: '#525252' }}>No funding source linked</p>
                  )}
                </Tile>

                {/* Legal */}
                <Tile style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Legal documents</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a href="/terms" style={{ color: '#0f62fe' }}>Terms of Use</a>
                    <a href="/privacy" style={{ color: '#0f62fe' }}>Privacy Policy</a>
                    <a href="/risk-disclosure" style={{ color: '#0f62fe' }}>Risk Disclosure</a>
                  </div>
                  {user.terms_accepted && user.terms_accepted_at && (
                    <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#525252' }}>
                      Accepted on {new Date(user.terms_accepted_at).toLocaleDateString()}
                    </p>
                  )}
                </Tile>

                {/* Logout */}
                <Button
                  kind="danger--tertiary"
                  renderIcon={Logout}
                  onClick={handleLogout}
                >
                  Sign out
                </Button>
              </Column>
            </Grid>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
