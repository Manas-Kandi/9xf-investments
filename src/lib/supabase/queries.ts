import { notFound } from 'next/navigation';
import { createClient as createServerClient } from './server';
import type {
  CampaignModel,
  InvestmentIntentInsert,
  InvestmentIntentModel,
  InvestmentWithCampaign,
  CampaignInsert,
  CampaignUpdate,
  FounderApplicationModel,
  FounderApplicationUpdate,
  FundingSourceInsert,
  FundingSourceModel,
  UserModel,
  UserUpdate,
} from '@/types/models';
import { mockCampaigns } from '../mock-data';

export async function fetchCampaigns(): Promise<CampaignModel[]> {
  const supabase = await createServerClient();
  if (!supabase) {
    return mockCampaigns;
  }

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch campaigns', error.message);
    return mockCampaigns;
  }

  return data ?? [];
}

export async function fetchCampaignBySlug(slug: string): Promise<CampaignModel> {
  const supabase = await createServerClient();
  if (!supabase) {
    const fallback = mockCampaigns.find((c) => c.slug === slug);
    if (!fallback) notFound();
    return fallback;
  }

  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    console.error('Failed to fetch campaign', error?.message);
    notFound();
  }

  return data as CampaignModel;
}

export async function fetchInvestments(userId: string): Promise<InvestmentWithCampaign[]> {
  const supabase = await createServerClient();
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('investment_intents')
    .select('*, campaign:campaigns(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch investments', error.message);
    return [];
  }

  return (data as InvestmentWithCampaign[]) ?? [];
}

export async function fetchFounderApplications(): Promise<FounderApplicationModel[]> {
  const supabase = await createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('founder_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch applications', error.message);
    return [];
  }

  return data ?? [];
}

export async function upsertCampaign(payload: CampaignInsert | CampaignUpdate) {
  const supabase = await createServerClient();
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };

  return supabase.from('campaigns').upsert(payload).select('*').single();
}

export async function createInvestmentIntent(payload: InvestmentIntentInsert) {
  const supabase = await createServerClient();
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };

  return supabase.from('investment_intents').insert(payload).select('*, campaign:campaigns(*)').single();
}

export async function updateFounderApplication(
  id: string,
  payload: FounderApplicationUpdate
) {
  const supabase = await createServerClient();
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };

  return supabase
    .from('founder_applications')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();
}

export async function upsertFundingSource(payload: FundingSourceInsert) {
  const supabase = await createServerClient();
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };

  return supabase.from('funding_sources').upsert(payload).select('*').single();
}

export async function updateUserProfile(userId: string, payload: UserUpdate) {
  const supabase = await createServerClient();
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };

  return supabase.from('users').update(payload).eq('id', userId).select('*').single();
}

export async function fetchUser(userId: string): Promise<UserModel | null> {
  const supabase = await createServerClient();
  if (!supabase) return null;

  const { data } = await supabase.from('users').select('*').eq('id', userId).single();
  return data ?? null;
}

export async function fetchFundingSource(userId: string): Promise<FundingSourceModel | null> {
  const supabase = await createServerClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from('funding_sources')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return data ?? null;
}
