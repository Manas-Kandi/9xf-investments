import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareSupabaseClient } from '@/lib/supabase/middleware';

function redirectWithCookies(url: URL, response: NextResponse) {
  const redirectResponse = NextResponse.redirect(url);
  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set({
      name: cookie.name,
      value: cookie.value,
      ...cookie,
    });
  });
  return redirectResponse;
}

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareSupabaseClient(request);

  if (!supabase) {
    return response;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname, search } = request.nextUrl;
  const isProtectedRoute =
    pathname.startsWith('/account') ||
    pathname.startsWith('/invest') ||
    pathname.startsWith('/investments') ||
    pathname.startsWith('/admin');

  if (isProtectedRoute && !session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/signin';
    redirectUrl.searchParams.set('redirect', `${pathname}${search}`);
    return redirectWithCookies(redirectUrl, response);
  }

  if (pathname.startsWith('/admin') && session) {
    const role = (session.user?.app_metadata as { role?: string } | null)?.role;
    if (role !== 'admin') {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = '/';
      homeUrl.search = '';
      return redirectWithCookies(homeUrl, response);
    }
  }

  if ((pathname.startsWith('/invest') || pathname.startsWith('/investments')) && session) {
    const { data: profile } = await supabase
      .from('users')
      .select('kyc_status')
      .eq('id', session.user.id)
      .maybeSingle();

    if (profile?.kyc_status !== 'verified') {
      const onboardingUrl = request.nextUrl.clone();
      onboardingUrl.pathname = '/onboarding';
      onboardingUrl.search = '';
      return redirectWithCookies(onboardingUrl, response);
    }
  }

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
