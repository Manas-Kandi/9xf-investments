import { NextRequest } from 'next/server';

// Sentry disabled - package not installed
export function logServerError(error: unknown, request?: NextRequest | Request) {
  console.error('[Server Error]', error);
}
