import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { InvestmentIntent } from '@/types/database';

const CONFIRMATION_DELAY_MS = 3000;

const buildReceiptUrl = (paymentIntentId?: string | null) =>
  paymentIntentId ? `https://dashboard.stripe.com/test/payments/${paymentIntentId}` : undefined;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: investment, error } = await supabase
    .from('investment_intents')
    .select('id,status,partner_tx_id,created_at')
    .eq('id', id)
    .maybeSingle();

  if (error || !investment) {
    return NextResponse.json({ error: 'Investment not found.' }, { status: 404 });
  }

  let nextStatus: InvestmentIntent['status'] = investment.status;

  if (investment.status === 'processing') {
    const createdAt = new Date(investment.created_at).getTime();
    const now = Date.now();

    if (now - createdAt > CONFIRMATION_DELAY_MS) {
      nextStatus = 'confirmed';
      await supabase
        .from('investment_intents')
        .update({ status: nextStatus })
        .eq('id', investment.id);
    }
  }

  return NextResponse.json({
    id: investment.id,
    status: nextStatus === 'confirmed' ? 'succeeded' : nextStatus === 'failed' ? 'failed' : 'processing',
    receipt_url: buildReceiptUrl(investment.partner_tx_id),
    payment_intent_id: investment.partner_tx_id,
  });
}
