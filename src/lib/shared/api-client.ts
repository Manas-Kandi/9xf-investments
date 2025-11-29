import { createClient, type SupabaseClient, type SupabaseClientOptions } from '@supabase/supabase-js';
import type { Campaign, Database } from './types';
import { getCampaignBySlug as getMockCampaignBySlug, getLiveCampaigns, mockCampaigns } from './mock-data';

export interface SharedClientConfig {
  supabaseUrl?: string;
  supabaseKey?: string;
  storage?: SupabaseClientOptions['auth']['storage'];
  fetch?: SupabaseClientOptions['global']['fetch'];
}

export interface SharedApiClient {
  supabase?: SupabaseClient<Database>;
  listCampaigns: () => Promise<Campaign[]>;
  getCampaign: (slug: string) => Promise<Campaign | undefined>;
}

export function createSharedApiClient(config: SharedClientConfig = {}): SharedApiClient {
  const { supabaseUrl, supabaseKey, storage, fetch } = config;

  const supabase =
    supabaseUrl && supabaseKey
      ? createClient<Database>(supabaseUrl, supabaseKey, {
          auth: { storage },
          global: { fetch },
        })
      : undefined;

  const listCampaigns = async () => {
    if (!supabase) return getLiveCampaigns();

    const { data, error } = await supabase.from('campaigns').select('*');

    if (error) {
      console.warn('Falling back to mock campaigns after Supabase error', error.message);
      return getLiveCampaigns();
    }

    return (data as Campaign[]) || getLiveCampaigns();
  };

  const getCampaign = async (slug: string) => {
    if (!supabase) return getMockCampaignBySlug(slug);

    const { data, error } = await supabase.from('campaigns').select('*').eq('slug', slug).maybeSingle();

    if (error) {
      console.warn('Falling back to mock campaign after Supabase error', error.message);
      return getMockCampaignBySlug(slug);
    }

    return (data as Campaign | null) ?? getMockCampaignBySlug(slug);
  };

  return { supabase, listCampaigns, getCampaign };
}

export function getAllMockCampaigns() {
  return mockCampaigns;
}
