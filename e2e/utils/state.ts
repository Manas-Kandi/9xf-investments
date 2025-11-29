import type { Page } from '@playwright/test';

interface PersistedUser {
  id: string;
  email: string;
  kyc_status: 'pending' | 'verified' | 'failed';
  terms_accepted: boolean;
  terms_accepted_at?: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}

interface PersistedFundingSource {
  id: string;
  user_id: string;
  type: 'bank' | 'card';
  institution_name?: string;
  last4: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

interface PersistedInvestment {
  id: string;
  user_id: string;
  campaign_id: string;
  amount: number;
  status: 'initiated' | 'processing' | 'confirmed' | 'failed';
  created_at: string;
  updated_at: string;
  campaign?: {
    company_name: string;
    slug: string;
  };
}

interface PersistedState {
  user: PersistedUser | null;
  isAuthenticated: boolean;
  onboardingStep: 'account' | 'kyc' | 'funding' | 'terms' | 'complete';
  isOnboarded: boolean;
  fundingSource: PersistedFundingSource | null;
  investments: PersistedInvestment[];
}

const defaultState: PersistedState = {
  user: null,
  isAuthenticated: false,
  onboardingStep: 'account',
  isOnboarded: false,
  fundingSource: null,
  investments: [],
};

export async function seedAppState(page: Page, state: Partial<PersistedState>) {
  const mergedState: PersistedState = { ...defaultState, ...state } as PersistedState;
  await page.addInitScript(({ persistedState }) => {
    window.localStorage.setItem('9xf-storage', JSON.stringify({ state: persistedState, version: 0 }));
  }, { persistedState: mergedState });
}
