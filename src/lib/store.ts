import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, FundingSource, Campaign, InvestmentIntent } from '@/types/database';

// Onboarding step tracking
export type OnboardingStep = 'account' | 'kyc' | 'funding' | 'terms' | 'complete';

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
      onboardingStep: 'account',
      isOnboarded: false,
      fundingSource: null,
      investments: [],

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isOnboarded: user?.kyc_status === 'verified' && user?.terms_accepted,
        }),

      setOnboardingStep: (step) =>
        set({
          onboardingStep: step,
          isOnboarded: step === 'complete',
        }),

      setFundingSource: (source) => set({ fundingSource: source }),

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
          onboardingStep: 'account',
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
