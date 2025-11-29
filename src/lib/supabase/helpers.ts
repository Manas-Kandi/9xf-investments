import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { createClient as createBrowserClient, type TypedSupabaseClient } from './client';
import { createClient as createServerClient, type TypedServerSupabaseClient } from './server';

export type AnySupabaseClient = SupabaseClient<Database>;

export const getBrowserSupabase = (): TypedSupabaseClient | null => createBrowserClient();

export const getServerSupabase = async (): Promise<TypedServerSupabaseClient | null> =>
  createServerClient();

export const getAuthClient = async (isServer = false) => {
  const client = isServer ? await getServerSupabase() : getBrowserSupabase();
  return client?.auth ?? null;
};

export const getDatabaseClient = async (isServer = false) => {
  const client = isServer ? await getServerSupabase() : getBrowserSupabase();
  return client ?? null;
};

export const getStorageClient = async (isServer = false) => {
  const client = isServer ? await getServerSupabase() : getBrowserSupabase();
  return client?.storage ?? null;
};
