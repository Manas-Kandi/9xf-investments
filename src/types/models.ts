import type { Database } from './database';

export type CampaignModel = Database['public']['Tables']['campaigns']['Row'];
export type CampaignInsert = Database['public']['Tables']['campaigns']['Insert'];
export type CampaignUpdate = Database['public']['Tables']['campaigns']['Update'];

export type InvestmentIntentModel = Database['public']['Tables']['investment_intents']['Row'];
export type InvestmentIntentInsert = Database['public']['Tables']['investment_intents']['Insert'];
export type InvestmentIntentUpdate = Database['public']['Tables']['investment_intents']['Update'];
export type InvestmentWithCampaign = InvestmentIntentModel & { campaign?: CampaignModel | null };

export type UserModel = Database['public']['Tables']['users']['Row'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

export type FundingSourceModel = Database['public']['Tables']['funding_sources']['Row'];
export type FundingSourceInsert = Database['public']['Tables']['funding_sources']['Insert'];
export type FundingSourceUpdate = Database['public']['Tables']['funding_sources']['Update'];

export type FounderApplicationModel = Database['public']['Tables']['founder_applications']['Row'];
export type FounderApplicationUpdate = Database['public']['Tables']['founder_applications']['Update'];
