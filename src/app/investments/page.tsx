'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid, Column, Tile, Button, Tag, InlineNotification } from '@carbon/react';
import { ArrowRight, Wallet } from '@carbon/icons-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';
import type { InvestmentIntent, Payout } from '@/types/database';

type CashFlow = {
  amount: number;
  date: string;
};

function computeIrr(cashFlows: CashFlow[]): number | null {
  if (cashFlows.length === 0) return null;

  const hasPositive = cashFlows.some((cf) => cf.amount > 0);
  const hasNegative = cashFlows.some((cf) => cf.amount < 0);

  if (!hasPositive || !hasNegative) return null;

  const sorted = [...cashFlows].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstDate = new Date(sorted[0].date).getTime();
  let rate = 0.1;

  for (let i = 0; i < 50; i += 1) {
    let npv = 0;
    let derivative = 0;

    for (const cashFlow of sorted) {
      const t = (new Date(cashFlow.date).getTime() - firstDate) / (365 * 24 * 60 * 60 * 1000);
      const discount = Math.pow(1 + rate, t);

      npv += cashFlow.amount / discount;
      derivative += (-t * cashFlow.amount) / (discount * (1 + rate));
    }

    if (derivative === 0) break;

    const newRate = rate - npv / derivative;

    if (Number.isNaN(newRate) || !Number.isFinite(newRate)) break;

    if (Math.abs(newRate - rate) < 1e-6) return newRate;

    rate = newRate;
  }

  return null;
}

export default function InvestmentsPage() {
  const router = useRouter();
  const { user } = useAppStore();
  const [investments, setInvestments] = useState<InvestmentIntent[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin?redirect=/investments');
    }
  }, [user, router]);

  const loadPortfolio = useCallback(async () => {
    if (!user) return;

    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    const [investmentResponse, payoutResponse] = await Promise.all([
      supabase
        .from('investment_intents')
        .select(
          'id, amount, status, created_at, campaign_id, campaign:campaigns(company_name, slug)'
        )
        .eq('user_id', user.id),
      supabase
        .from('payouts')
        .select('id, amount, created_at, campaign_id, investment_id, user_id')
        .eq('user_id', user.id),
    ]);

    if (investmentResponse.error || payoutResponse.error) {
      setError(
        investmentResponse.error?.message || payoutResponse.error?.message || 'Unable to load data.'
      );
      setIsLoading(false);
      return;
    }

    setInvestments(investmentResponse.data || []);
    setPayouts(payoutResponse.data || []);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  const positions = useMemo(() => {
    const payoutsByCampaign = payouts.reduce<Record<string, Payout[]>>((acc, payout) => {
      const key = payout.campaign_id || payout.investment_id || 'unknown';
      acc[key] = acc[key] ? [...acc[key], payout] : [payout];
      return acc;
    }, {});

    return investments.reduce<
      Array<{
        campaignId: string;
        company: string;
        slug?: string;
        invested: number;
        pending: number;
        payoutsTotal: number;
        costBasis: number;
        irr: number | null;
      }>
    >((acc, inv) => {
      const existing = acc.find((item) => item.campaignId === inv.campaign_id);
      const campaignPayouts = payoutsByCampaign[inv.campaign_id] || [];

      if (existing) {
        if (inv.status === 'confirmed') {
          existing.invested += inv.amount;
        } else {
          existing.pending += inv.amount;
        }
        existing.costBasis = existing.invested;
        const cashFlows: CashFlow[] = [
          ...investments
            .filter((item) => item.campaign_id === inv.campaign_id)
            .map((item) => ({ amount: -item.amount, date: item.created_at })),
          ...campaignPayouts.map((payout) => ({ amount: payout.amount, date: payout.created_at })),
        ];
        existing.payoutsTotal = campaignPayouts.reduce((sum, payout) => sum + payout.amount, 0);
        existing.irr = computeIrr(cashFlows);
        return acc;
      }

      const cashFlows: CashFlow[] = [
        { amount: -inv.amount, date: inv.created_at },
        ...campaignPayouts.map((payout) => ({ amount: payout.amount, date: payout.created_at })),
      ];

      acc.push({
        campaignId: inv.campaign_id,
        company: inv.campaign?.company_name || 'Unknown Company',
        slug: inv.campaign?.slug,
        invested: inv.status === 'confirmed' ? inv.amount : 0,
        pending: inv.status !== 'confirmed' ? inv.amount : 0,
        payoutsTotal: campaignPayouts.reduce((sum, payout) => sum + payout.amount, 0),
        costBasis: inv.status === 'confirmed' ? inv.amount : 0,
        irr: computeIrr(cashFlows),
      });

      return acc;
    }, []);
  }, [investments, payouts]);

  const totalInvested = positions.reduce((sum, pos) => sum + pos.costBasis, 0);
  const totalPayouts = positions.reduce((sum, pos) => sum + pos.payoutsTotal, 0);
  const portfolioIrr = computeIrr([
    ...investments.map((inv) => ({ amount: -inv.amount, date: inv.created_at })),
    ...payouts.map((payout) => ({ amount: payout.amount, date: payout.created_at })),
  ]);

  if (!user) return null;

  return (
    <>
      <Header />
      <main style={{ marginTop: '48px', minHeight: 'calc(100vh - 48px)' }}>
        {/* Header */}
        <section style={{ background: '#161616', color: 'white', padding: '3rem 0' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem' }}>
              My investments
            </h1>
            <p style={{ opacity: 0.8 }}>
              Track your startup investments
            </p>
          </div>
        </section>

        {/* Summary */}
        <section style={{ background: '#f4f4f4', padding: '2rem 0' }}>
          <div className="container">
            <Grid>
              <Column lg={4} md={4} sm={4}>
                <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Total invested (cost basis)
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: 600 }}>
                    ${totalInvested.toLocaleString()}
                  </p>
                </Tile>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Payouts received
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: 600 }}>
                    ${totalPayouts.toLocaleString()}
                  </p>
                </Tile>
              </Column>
              <Column lg={4} md={4} sm={4}>
                <Tile style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <p style={{ color: '#525252', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    Portfolio IRR
                  </p>
                  <p style={{ fontSize: '2rem', fontWeight: 600 }}>
                    {portfolioIrr === null
                      ? 'N/A'
                      : `${(portfolioIrr * 100).toFixed(2)}%`}
                  </p>
                </Tile>
              </Column>
            </Grid>
          </div>
        </section>

        {/* Investments List */}
        <section className="section">
          <div className="container">
            {error && (
              <Tile style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <InlineNotification
                  kind="error"
                  title="We couldn't load your investments"
                  subtitle={error}
                  onClose={() => setError(null)}
                />
                <div style={{ marginTop: '1rem' }}>
                  <Button kind="primary" onClick={loadPortfolio} size="sm">
                    Retry
                  </Button>
                </div>
              </Tile>
            )}

            {isLoading ? (
              <Tile style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ marginBottom: '0.5rem' }}>Loading your investments...</p>
                <p style={{ color: '#525252' }}>
                  Fetching positions, payouts, and performance.
                </p>
              </Tile>
            ) : positions.length === 0 ? (
              <Tile style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: '#f4f4f4',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}>
                  <Wallet size={40} style={{ color: '#525252' }} />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  No investments yet
                </h2>
                <p style={{ color: '#525252', marginBottom: '2rem' }}>
                  Start building your portfolio by investing in startups you believe in.
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
              </Tile>
            ) : (
              <Grid>
                {positions.map((position) => (
                  <Column key={position.campaignId} lg={8} md={4} sm={4}>
                    <Tile style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div
                            style={{
                              width: '48px',
                              height: '48px',
                              background: '#e0e0e0',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: '#525252',
                            }}
                          >
                            {position.company.charAt(0)}
                          </div>
                          <div>
                            <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                              {position.company}
                            </h3>
                            <p style={{ color: '#525252', fontSize: '0.875rem' }}>
                              {position.slug ? (
                                <Link href={`/campaigns/${position.slug}`} style={{ color: '#0f62fe' }}>
                                  View campaign
                                </Link>
                              ) : (
                                'Campaign details unavailable'
                              )}
                            </p>
                          </div>
                        </div>
                        <Tag type={position.pending > 0 ? 'blue' : 'green'} size="sm">
                          {position.pending > 0 ? 'Pending funds' : 'Invested'}
                        </Tag>
                      </div>

                      <Grid condensed>
                        <Column lg={4} md={2} sm={4}>
                          <p style={{ color: '#525252', fontSize: '0.75rem' }}>Cost basis</p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                            ${position.costBasis.toLocaleString()}
                          </p>
                        </Column>
                        <Column lg={4} md={2} sm={4}>
                          <p style={{ color: '#525252', fontSize: '0.75rem' }}>Payouts</p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                            ${position.payoutsTotal.toLocaleString()}
                          </p>
                        </Column>
                        <Column lg={4} md={2} sm={4}>
                          <p style={{ color: '#525252', fontSize: '0.75rem' }}>IRR (approx)</p>
                          <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                            {position.irr === null ? 'N/A' : `${(position.irr * 100).toFixed(2)}%`}
                          </p>
                        </Column>
                      </Grid>
                      {position.pending > 0 && (
                        <p style={{ color: '#525252', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                          Pending transfers: ${position.pending.toLocaleString()}
                        </p>
                      )}
                    </Tile>
                  </Column>
                ))}
              </Grid>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
