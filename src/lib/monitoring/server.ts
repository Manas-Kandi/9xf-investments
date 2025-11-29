import { NextRequest } from 'next/server';
import { captureException } from '@sentry/nextjs';

export function logServerError(error: unknown, request?: NextRequest | Request) {
  const requestContext = request
    ? {
        method: 'method' in request ? (request as Request).method : undefined,
        url: 'url' in request ? (request as Request).url : undefined,
        headers:
          'headers' in request
            ? {
                'user-agent': (request as Request).headers.get('user-agent') ?? undefined,
                referer: (request as Request).headers.get('referer') ?? undefined,
              }
            : undefined,
      }
    : undefined;

  captureException(error, {
    request: requestContext,
  });
}
