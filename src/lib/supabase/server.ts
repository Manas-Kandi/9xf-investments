import { createServerComponentClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export function createClient(): SupabaseClient<Database> | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const cookieStore = cookies();

  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
}
