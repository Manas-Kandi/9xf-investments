-- Seed data for automated tests
-- Run with: supabase db reset --use-migra --seed supabase/seed/test-data.sql

-- Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Auth users
INSERT INTO auth.users (id, email)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'investor@example.com'),
  ('00000000-0000-0000-0000-000000000002', 'founder@example.com')
ON CONFLICT (id) DO NOTHING;

-- Profiles
INSERT INTO public.users (id, email, full_name, kyc_status, terms_accepted, terms_accepted_at)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'investor@example.com', 'Test Investor', 'verified', true, NOW()),
  ('00000000-0000-0000-0000-000000000002', 'founder@example.com', 'Founder User', 'verified', true, NOW())
ON CONFLICT (id) DO NOTHING;

-- Campaigns
INSERT INTO public.campaigns (id, company_name, tagline, description, founder_name, min_investment, max_investment_per_person, target_amount, amount_raised, crowd_percentage, status, slug)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'SolarScale', 'Clean power for every roof', 'Residential solar deployment platform', 'Jamie Solar', 100, 5000, 250000, 85000, 8.5, 'live', 'solarscale'),
  ('10000000-0000-0000-0000-000000000002', 'HealthAI', 'Preventive care copilot', 'AI triage for preventative care', 'Morgan Health', 50, 2000, 150000, 64000, 6.0, 'live', 'healthai')
ON CONFLICT (id) DO NOTHING;

-- Funding sources
INSERT INTO public.funding_sources (id, user_id, type, institution_name, last4, status)
VALUES
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'bank', 'Test Bank', '4242', 'active')
ON CONFLICT (id) DO NOTHING;

-- Investments
INSERT INTO public.investment_intents (id, user_id, campaign_id, amount, status, created_at)
VALUES
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 500, 'confirmed', NOW())
ON CONFLICT (id) DO NOTHING;
