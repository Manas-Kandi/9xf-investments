import { createMiddlewareClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export function createMiddlewareSupabaseClient(request: NextRequest): {
  supabase: SupabaseClient<Database> | null;
  response: NextResponse;
} {
  const supabaseResponse = NextResponse.next({
    request,
  });

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { supabase: null, response: supabaseResponse };
  }

  const supabase = createMiddlewareClient<Database>({
    req: request,
    res: supabaseResponse,
  });

  return { supabase, response: supabaseResponse };
}
