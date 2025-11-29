import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { 
  User, 
  FundingSource, 
  InvestmentIntent, 
  OnboardingStep,
  VCApplication,
  VCDeal 
} from '../types';

interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  
  // Onboarding
  onboardingStep: OnboardingStep;
  isOnboarded: boolean;
  
  // Funding
  fundingSources: FundingSource[];
  defaultFundingSourceId: string | null;
  
  // Investments
  investments: InvestmentIntent[];
  
  // VC Mode
  vcApplication: VCApplication | null;
  vcDeals: VCDeal[];
  
  // Actions
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  addFundingSource: (source: FundingSource) => void;
  removeFundingSource: (id: string) => void;
  setDefaultFundingSource: (id: string) => void;
  addInvestment: (investment: InvestmentIntent) => void;
  updateInvestment: (id: string, updates: Partial<InvestmentIntent>) => void;
  setVCApplication: (application: VCApplication | null) => void;
  addVCDeal: (deal: VCDeal) => void;
  updateVCDeal: (id: string, updates: Partial<VCDeal>) => void;
  logout: () => void;
}

// Create a custom storage adapter for React Native
const zustandStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name: string, value: unknown) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      onboardingStep: 'account',
      isOnboarded: false,
      fundingSources: [],
      defaultFundingSourceId: null,
      investments: [],
      vcApplication: null,
      vcDeals: [],

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isOnboarded: user?.kyc_status === 'verified' && user?.terms_accepted,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
          isOnboarded: 
            (updates.kyc_status === 'verified' || state.user?.kyc_status === 'verified') && 
            (updates.terms_accepted === true || state.user?.terms_accepted === true),
        })),

      setOnboardingStep: (step) =>
        set({
          onboardingStep: step,
          isOnboarded: step === 'complete',
        }),

      addFundingSource: (source) =>
        set((state) => {
          const sources = [...state.fundingSources, source];
          return {
            fundingSources: sources,
            defaultFundingSourceId: state.defaultFundingSourceId || source.id,
          };
        }),

      removeFundingSource: (id) =>
        set((state) => ({
          fundingSources: state.fundingSources.filter((s) => s.id !== id),
          defaultFundingSourceId: 
            state.defaultFundingSourceId === id 
              ? state.fundingSources.find((s) => s.id !== id)?.id || null
              : state.defaultFundingSourceId,
        })),

      setDefaultFundingSource: (id) =>
        set({ defaultFundingSourceId: id }),

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

      setVCApplication: (application) =>
        set({ vcApplication: application }),

      addVCDeal: (deal) =>
        set((state) => ({
          vcDeals: [...state.vcDeals, deal],
        })),

      updateVCDeal: (id, updates) =>
        set((state) => ({
          vcDeals: state.vcDeals.map((deal) =>
            deal.id === id ? { ...deal, ...updates } : deal
          ),
        })),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          onboardingStep: 'account',
          isOnboarded: false,
          fundingSources: [],
          defaultFundingSourceId: null,
          vcApplication: null,
          vcDeals: [],
        }),
    }),
    {
      name: '9xf-mobile-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        onboardingStep: state.onboardingStep,
        isOnboarded: state.isOnboarded,
        fundingSources: state.fundingSources,
        defaultFundingSourceId: state.defaultFundingSourceId,
        investments: state.investments,
        vcApplication: state.vcApplication,
        vcDeals: state.vcDeals,
      }),
    }
  )
);
