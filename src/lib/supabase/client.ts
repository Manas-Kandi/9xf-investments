import { createBrowserClient, type SupabaseClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

export type TypedSupabaseClient = SupabaseClient<Database>;

export function createClient(): TypedSupabaseClient | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
