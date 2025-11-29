import { type NextRequest } from 'next/server';
import { wrapMiddlewareWithSentry } from '@sentry/nextjs';
import { updateSession } from '@/lib/supabase/middleware';
import { logServerError } from '@/lib/monitoring/server';

export const middleware = wrapMiddlewareWithSentry(async function middleware(request: NextRequest) {
  try {
    return await updateSession(request);
  } catch (error) {
    logServerError(error, request);
    throw error;
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
