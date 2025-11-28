-- 9xf labs Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  date_of_birth DATE,
  address TEXT,
  citizenship TEXT,
  ssn_last4 TEXT,
  kyc_status TEXT NOT NULL DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'failed')),
  terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  terms_accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Funding sources
CREATE TABLE public.funding_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('bank', 'card')),
  provider_id TEXT,
  provider_token TEXT,
  institution_name TEXT,
  last4 TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Campaigns
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  logo_url TEXT,
  cover_image_url TEXT,
  media_urls JSONB DEFAULT '[]',
  founder_name TEXT NOT NULL,
  founder_bio TEXT,
  problem TEXT,
  solution TEXT,
  traction TEXT,
  min_investment INTEGER NOT NULL DEFAULT 50,
  max_investment_per_person INTEGER NOT NULL DEFAULT 1000,
  target_amount INTEGER NOT NULL,
  amount_raised INTEGER NOT NULL DEFAULT 0,
  crowd_percentage NUMERIC(5,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'paused', 'closed')),
  partner_type TEXT,
  partner_campaign_id TEXT,
  partner_url TEXT,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Investment intents
CREATE TABLE public.investment_intents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'processing', 'confirmed', 'failed')),
  partner_tx_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Founder applications
CREATE TABLE public.founder_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  website TEXT,
  logo_url TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  stage TEXT NOT NULL,
  description TEXT NOT NULL,
  desired_crowd_raise INTEGER NOT NULL,
  existing_investors TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'approved', 'rejected')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Event logs for analytics
CREATE TABLE public.event_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_funding_sources_user_id ON public.funding_sources(user_id);
CREATE INDEX idx_investment_intents_user_id ON public.investment_intents(user_id);
CREATE INDEX idx_investment_intents_campaign_id ON public.investment_intents(campaign_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);
CREATE INDEX idx_campaigns_slug ON public.campaigns(slug);
CREATE INDEX idx_event_logs_user_id ON public.event_logs(user_id);
CREATE INDEX idx_event_logs_campaign_id ON public.event_logs(campaign_id);
CREATE INDEX idx_event_logs_event_type ON public.event_logs(event_type);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_intents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Funding sources policies
CREATE POLICY "Users can view own funding sources" ON public.funding_sources
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own funding sources" ON public.funding_sources
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own funding sources" ON public.funding_sources
  FOR UPDATE USING (auth.uid() = user_id);

-- Campaigns policies (public read, admin write)
CREATE POLICY "Anyone can view live campaigns" ON public.campaigns
  FOR SELECT USING (status = 'live' OR status = 'closed');

-- Investment intents policies
CREATE POLICY "Users can view own investments" ON public.investment_intents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create investments" ON public.investment_intents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Founder applications policies
CREATE POLICY "Anyone can submit applications" ON public.founder_applications
  FOR INSERT WITH CHECK (true);

-- Event logs policies
CREATE POLICY "Users can insert events" ON public.event_logs
  FOR INSERT WITH CHECK (true);

-- Functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_funding_sources_updated_at
  BEFORE UPDATE ON public.funding_sources
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_investment_intents_updated_at
  BEFORE UPDATE ON public.investment_intents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_founder_applications_updated_at
  BEFORE UPDATE ON public.founder_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
