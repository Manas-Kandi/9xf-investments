// Database types matching the web app
export type KycStatus = 'pending' | 'verified' | 'failed';
export type FundingSourceType = 'bank' | 'card';
export type FundingSourceStatus = 'active' | 'inactive';
export type CampaignStatus = 'draft' | 'live' | 'paused' | 'closed';
export type InvestmentStatus = 'initiated' | 'processing' | 'confirmed' | 'failed';
export type VCApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  date_of_birth?: string;
  address?: string;
  citizenship?: string;
  ssn_last4?: string;
  kyc_status: KycStatus;
  terms_accepted: boolean;
  terms_accepted_at?: string;
  is_vc?: boolean;
  vc_status?: VCApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface FundingSource {
  id: string;
  user_id: string;
  type: FundingSourceType;
  provider_id?: string;
  provider_token?: string;
  institution_name?: string;
  last4: string;
  status: FundingSourceStatus;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface VCInfo {
  id: string;
  name: string;
  logo_url?: string;
  website?: string;
  commitment: number;
}

export interface Campaign {
  id: string;
  company_name: string;
  tagline: string;
  description: string;
  logo_url?: string;
  cover_image_url?: string;
  media_urls?: string[];
  founder_name: string;
  founder_bio?: string;
  problem?: string;
  solution?: string;
  traction?: string;
  min_investment: number;
  max_investment_per_person: number;
  target_amount: number;
  amount_raised: number;
  crowd_percentage: number;
  status: CampaignStatus;
  partner_type?: string;
  partner_campaign_id?: string;
  partner_url?: string;
  slug: string;
  close_date?: string;
  instrument?: 'SAFE' | 'Equity' | 'Note';
  valuation_cap?: number;
  vc_info?: VCInfo;
  vc_memo?: string;
  vc_reasons?: string[];
  investor_count?: number;
  faqs?: { question: string; answer: string }[];
  created_at: string;
  updated_at: string;
}

export interface InvestmentIntent {
  id: string;
  user_id: string;
  campaign_id: string;
  amount: number;
  status: InvestmentStatus;
  partner_tx_id?: string;
  created_at: string;
  updated_at: string;
  campaign?: Campaign;
}

export interface VCApplication {
  id: string;
  user_id: string;
  fund_name: string;
  fund_type: 'vc_fund' | 'solo_gp' | 'angel_syndicate';
  website?: string;
  linkedin_url?: string;
  aum?: number;
  description: string;
  work_email: string;
  status: VCApplicationStatus;
  created_at: string;
  updated_at: string;
}

export interface VCDeal {
  id: string;
  vc_user_id: string;
  company_name: string;
  company_website?: string;
  logo_url?: string;
  industry: string;
  stage: string;
  vc_commitment: number;
  crowd_allocation: number;
  instrument: 'SAFE' | 'Equity' | 'Note';
  valuation_cap?: number;
  target_close_date?: string;
  memo: string;
  key_reasons: string[];
  deck_url?: string;
  partner_provider?: string;
  partner_deal_id?: string;
  status: 'draft' | 'pending_approval' | 'live' | 'closed';
  amount_raised: number;
  investor_count: number;
  created_at: string;
  updated_at: string;
}

// Onboarding step tracking
export type OnboardingStep = 'account' | 'kyc' | 'funding' | 'terms' | 'complete';
