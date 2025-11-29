'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createClient } from './client';
import type {
  CampaignInsert,
  CampaignModel,
  CampaignUpdate,
  FounderApplicationModel,
  InvestmentIntentInsert,
  InvestmentIntentModel,
  InvestmentWithCampaign,
  FounderApplicationUpdate,
  FundingSourceInsert,
  FundingSourceModel,
  UserModel,
  UserUpdate,
} from '@/types/models';
import { mockCampaigns } from '../mock-data';

const supabase = createClient();

const campaignsQuery = async (): Promise<CampaignModel[]> => {
  if (!supabase) return mockCampaigns;
  const { data, error } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
};

export const useCampaigns = () =>
  useQuery({ queryKey: ['campaigns'], queryFn: campaignsQuery, initialData: mockCampaigns });

export const useCampaign = (slug: string) =>
  useQuery({
    queryKey: ['campaign', slug],
    queryFn: async (): Promise<CampaignModel> => {
      if (!supabase) {
        const fallback = mockCampaigns.find((c) => c.slug === slug);
        if (!fallback) throw new Error('Campaign not found');
        return fallback;
      }
      const { data, error } = await supabase.from('campaigns').select('*').eq('slug', slug).single();
      if (error || !data) throw error ?? new Error('Campaign missing');
      return data;
    },
  });

export const useInvestments = (userId?: string) =>
  useQuery({
    queryKey: ['investments', userId],
    enabled: Boolean(userId),
    queryFn: async (): Promise<InvestmentWithCampaign[]> => {
      if (!supabase || !userId) return [];
      const { data, error } = await supabase
        .from('investment_intents')
        .select('*, campaign:campaigns(*)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data as InvestmentWithCampaign[]) ?? [];
    },
  });

export const useFounderApplications = () =>
  useQuery({
    queryKey: ['founder-applications'],
    queryFn: async (): Promise<FounderApplicationModel[]> => {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('founder_applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const useUpsertCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CampaignInsert | CampaignUpdate) => {
      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase.from('campaigns').upsert(payload).select('*').single();
      if (error) throw error;
      return data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['campaigns'] });
      const previous = queryClient.getQueryData<CampaignModel[]>(['campaigns']) ?? [];
      const optimistic: CampaignModel = {
        ...previous.find((c) => c.id === (payload as CampaignUpdate).id),
        ...(payload as CampaignModel),
        updated_at: new Date().toISOString(),
        id: (payload as CampaignUpdate).id ?? crypto.randomUUID(),
      } as CampaignModel;
      queryClient.setQueryData<CampaignModel[]>(['campaigns'], [optimistic, ...previous.filter((c) => c.id !== optimistic.id)]);
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['campaigns'], context.previous);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<CampaignModel[]>(['campaigns'], (existing = []) => {
        const filtered = existing.filter((c) => c.id !== data.id);
        return [data, ...filtered];
      });
    },
  });
};

export const useInvestmentMutation = (user?: UserModel | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: InvestmentIntentInsert) => {
      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase
        .from('investment_intents')
        .insert(payload)
        .select('*, campaign:campaigns(*)')
        .single();
      if (error || !data) throw error ?? new Error('Unable to create investment');
      return data as InvestmentWithCampaign;
    },
    onMutate: async (payload) => {
      if (!user) return { previous: [] };
      await queryClient.cancelQueries({ queryKey: ['investments', user.id] });
      const previous = queryClient.getQueryData<InvestmentWithCampaign[]>(['investments', user.id]) ?? [];
      const optimistic: InvestmentWithCampaign = {
        ...(payload as InvestmentIntentModel),
        id: crypto.randomUUID(),
        status: 'processing',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      queryClient.setQueryData<InvestmentWithCampaign[]>(['investments', user.id], [optimistic, ...previous]);
      return { previous };
    },
    onError: (_error, _payload, context) => {
      if (user && context?.previous) {
        queryClient.setQueryData(['investments', user.id], context.previous);
      }
    },
    onSuccess: (data) => {
      if (!user) return;
      queryClient.setQueryData<InvestmentWithCampaign[]>(['investments', user.id], (existing = []) => {
        const filtered = existing.filter((inv) => inv.id !== data.id);
        return [data, ...filtered];
      });
    },
  });
};

export const useApplicationStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: FounderApplicationUpdate }) => {
      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase
        .from('founder_applications')
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();
      if (error || !data) throw error ?? new Error('Unable to update application');
      return data as FounderApplicationModel;
    },
    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: ['founder-applications'] });
      const previous = queryClient.getQueryData<FounderApplicationModel[]>(['founder-applications']) ?? [];
      queryClient.setQueryData<FounderApplicationModel[]>(['founder-applications'], (existing = []) =>
        existing.map((app) => (app.id === id ? { ...app, ...payload, updated_at: new Date().toISOString() } : app))
      );
      return { previous };
    },
    onError: (_error, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['founder-applications'], context.previous);
      }
    },
  });
};

export const useOnboardingMutation = (user?: UserModel | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userUpdate,
      fundingSource,
    }: {
      userUpdate?: UserUpdate;
      fundingSource?: FundingSourceInsert;
    }): Promise<{ user?: UserModel; fundingSource?: FundingSourceModel | null }> => {
      if (!supabase || !user) throw new Error('Supabase not configured');
      let updatedUser: UserModel | undefined;
      let updatedFunding: FundingSourceModel | null | undefined;

      if (userUpdate) {
        const { data, error } = await supabase
          .from('users')
          .update(userUpdate)
          .eq('id', user.id)
          .select('*')
          .single();
        if (error) throw error;
        updatedUser = data as UserModel;
      }

      if (fundingSource) {
        const { data, error } = await supabase
          .from('funding_sources')
          .upsert(fundingSource)
          .select('*')
          .single();
        if (error) throw error;
        updatedFunding = data as FundingSourceModel;
      }

      return { user: updatedUser, fundingSource: updatedFunding };
    },
    onError: (error) => {
      console.error('Onboarding error', error);
    },
    onSuccess: (data) => {
      if (user) {
        queryClient.setQueryData(['user', user.id], data.user ?? user);
        if (data.fundingSource) {
          queryClient.setQueryData(['funding', user.id], data.fundingSource);
        }
      }
    },
  });
};
