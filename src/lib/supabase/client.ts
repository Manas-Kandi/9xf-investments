import { createSharedApiClient } from '../shared/api-client';

export function createClient() {
  const { supabase } = createSharedApiClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  });

  if (!supabase) {
    throw new Error('Supabase client could not be initialized');
  }

  return supabase;
}
