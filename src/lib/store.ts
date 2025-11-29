import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, FundingSource, Campaign, InvestmentIntent } from '@/types/database';

// Onboarding step tracking
export type OnboardingStep = 'account' | 'kyc' | 'funding' | 'terms' | 'complete';

const computeOnboardingStep = (
  user: User | null,
  fundingSource: FundingSource | null
): OnboardingStep => {
  const hasVerifiedKyc = user?.kyc_status === 'verified';
  const hasFundingSource = fundingSource?.status === 'active';
  const hasAcceptedTerms = Boolean(user?.terms_accepted);

  if (hasVerifiedKyc && hasFundingSource && hasAcceptedTerms) return 'complete';
  if (hasVerifiedKyc && hasFundingSource) return 'terms';
  if (hasVerifiedKyc) return 'funding';
  return 'kyc';
};

const computeIsOnboarded = (user: User | null, fundingSource: FundingSource | null) =>
  computeOnboardingStep(user, fundingSource) === 'complete';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  
  // Onboarding
  onboardingStep: OnboardingStep;
  isOnboarded: boolean;
  
  // Funding
  fundingSource: FundingSource | null;
  
  // Investments
  investments: InvestmentIntent[];
  
  // Actions
  setUser: (user: User | null) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  setFundingSource: (source: FundingSource | null) => void;
  addInvestment: (investment: InvestmentIntent) => void;
  updateInvestment: (id: string, updates: Partial<InvestmentIntent>) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      onboardingStep: 'kyc',
      isOnboarded: false,
      fundingSource: null,
      investments: [],

      // Actions
      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: !!user,
          onboardingStep: computeOnboardingStep(user, state.fundingSource),
          isOnboarded: computeIsOnboarded(user, state.fundingSource),
        })),

      setOnboardingStep: (step) =>
        set((state) => ({
          onboardingStep: step,
          isOnboarded: computeIsOnboarded(state.user, state.fundingSource),
        })),

      setFundingSource: (source) =>
        set((state) => ({
          fundingSource: source,
          onboardingStep: computeOnboardingStep(state.user, source),
          isOnboarded: computeIsOnboarded(state.user, source),
        })),

      addInvestment: (investment) =>
        set((state) => ({
          investments: [...state.investments, investment],
        })),

      updateInvestment: (id, updates) =>
        set((state) => ({
          investments: state.investments.map((inv) =>
            inv.id === id ? { ...inv, ...updates } : inv
          ),
        })),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: 'kyc',
          isOnboarded: false,
          fundingSource: null,
        }),
    }),
    {
      name: '9xf-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
        isOnboarded: state.isOnboarded,
        fundingSource: state.fundingSource,
        investments: state.investments,
      }),
    }
  )
);
