import { type NextRequest } from 'next/server';
import { env } from '@/env.mjs';
import { updateSession } from '@/lib/supabase/middleware';

const supabaseUrl = new URL(env.NEXT_PUBLIC_SUPABASE_URL);
const connectSources = [
  `'self'`,
  supabaseUrl.origin,
  `wss://${supabaseUrl.host}`,
];

const contentSecurityPolicy = [
  "default-src 'self';",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
  "style-src 'self' 'unsafe-inline';",
  "img-src 'self' data: blob:;",
  "font-src 'self' data:;",
  `connect-src ${connectSources.join(' ')};`,
  "frame-ancestors 'none';",
  "base-uri 'self';",
  "form-action 'self';",
].join(' ');

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Permissions-Policy',
    'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
  );
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Content-Type-Options', 'nosniff');

  return response;
}

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
