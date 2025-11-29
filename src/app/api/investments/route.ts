import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { Campaign, InvestmentIntent } from '@/types/database';

interface InvestmentRequestBody {
  amount: number;
  campaignSlug: string;
  fundingSourceId: string;
  paymentMethod: 'bank' | 'card';
  userId?: string;
}

const VALID_PAYMENT_METHODS = ['bank', 'card'];
const PAYMENT_SANDBOX_PROVIDER = 'stripe_test';

const buildSandboxReceiptUrl = (paymentIntentId: string) =>
  `https://dashboard.stripe.com/test/payments/${paymentIntentId}`;

const createSandboxPayment = (amount: number, paymentMethod: 'bank' | 'card') => {
  const payment_intent_id = `pi_${Math.random().toString(36).slice(2)}`;

  return {
    provider: PAYMENT_SANDBOX_PROVIDER,
    payment_intent_id,
    status: 'processing' as const,
    receipt_url: buildSandboxReceiptUrl(payment_intent_id),
    payment_method: paymentMethod,
    amount,
  };
};

async function validateCampaignRules(
  campaign: Campaign,
  amount: number,
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  if (campaign.status !== 'live') {
    return 'Campaign is not live for investments.';
  }

  if (amount < campaign.min_investment) {
    return `Minimum investment is $${campaign.min_investment}.`;
  }

  if (amount > campaign.max_investment_per_person) {
    return `Maximum per person is $${campaign.max_investment_per_person}.`;
  }

  const { data: existingInvestments, error: investmentError } = await supabase
    .from('investment_intents')
    .select('amount,status,user_id')
    .eq('campaign_id', campaign.id);

  if (investmentError) {
    return 'Unable to validate investment caps.';
  }

  const activeInvestments = (existingInvestments || []).filter((inv) => inv.status !== 'failed');
  const totalRaised = activeInvestments.reduce((sum, inv) => sum + inv.amount, campaign.amount_raised);
  if (totalRaised + amount > campaign.target_amount) {
    return 'Campaign has reached its target amount.';
  }

  const userTotal = activeInvestments
    .filter((inv) => inv.user_id === userId)
    .reduce((sum, inv) => sum + inv.amount, 0);

  if (userTotal + amount > campaign.max_investment_per_person) {
    return 'You have reached the per-person investment cap for this campaign.';
  }

  return null;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = (await request.json()) as InvestmentRequestBody;

  if (!body.userId) {
    return NextResponse.json({ error: 'User is required.' }, { status: 401 });
  }

  if (!VALID_PAYMENT_METHODS.includes(body.paymentMethod)) {
    return NextResponse.json({ error: 'Unsupported payment method.' }, { status: 400 });
  }

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', body.campaignSlug)
    .single();

  if (error || !campaign) {
    return NextResponse.json({ error: 'Campaign not found.' }, { status: 404 });
  }

  const validationError = await validateCampaignRules(campaign as Campaign, body.amount, supabase, body.userId);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const sandboxPayment = createSandboxPayment(body.amount, body.paymentMethod);

  const { data: investment, error: insertError } = await supabase
    .from('investment_intents')
    .insert({
      user_id: body.userId,
      campaign_id: (campaign as Campaign).id,
      amount: body.amount,
      status: 'processing' satisfies InvestmentIntent['status'],
      partner_tx_id: sandboxPayment.payment_intent_id,
    })
    .select('id,status,partner_tx_id')
    .single();

  if (insertError || !investment) {
    return NextResponse.json({ error: 'Unable to create investment intent.' }, { status: 500 });
  }

  return NextResponse.json({
    id: investment.id,
    status: 'processing',
    payment_intent_id: sandboxPayment.payment_intent_id,
    receipt_url: sandboxPayment.receipt_url,
  });
}
