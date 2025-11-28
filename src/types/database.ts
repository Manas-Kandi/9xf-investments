// Database types matching the PRD entities

export type KycStatus = 'pending' | 'verified' | 'failed';
export type FundingSourceType = 'bank' | 'card';
export type FundingSourceStatus = 'active' | 'inactive';
export type CampaignStatus = 'draft' | 'live' | 'paused' | 'closed';
export type InvestmentStatus = 'initiated' | 'processing' | 'confirmed' | 'failed';
export type ApplicationStatus = 'new' | 'in_review' | 'approved' | 'rejected';

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
  created_at: string;
  updated_at: string;
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
  // Joined fields
  campaign?: Campaign;
}

export interface FounderApplication {
  id: string;
  company_name: string;
  website?: string;
  logo_url?: string;
  contact_name: string;
  contact_email: string;
  stage: string;
  description: string;
  desired_crowd_raise: number;
  existing_investors?: string;
  status: ApplicationStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface EventLog {
  id: string;
  user_id?: string;
  campaign_id?: string;
  event_type: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

// Supabase Database type helper
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      funding_sources: {
        Row: FundingSource;
        Insert: Omit<FundingSource, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FundingSource, 'id' | 'created_at'>>;
      };
      campaigns: {
        Row: Campaign;
        Insert: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Campaign, 'id' | 'created_at'>>;
      };
      investment_intents: {
        Row: InvestmentIntent;
        Insert: Omit<InvestmentIntent, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<InvestmentIntent, 'id' | 'created_at'>>;
      };
      founder_applications: {
        Row: FounderApplication;
        Insert: Omit<FounderApplication, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<FounderApplication, 'id' | 'created_at'>>;
      };
      event_logs: {
        Row: EventLog;
        Insert: Omit<EventLog, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
}
