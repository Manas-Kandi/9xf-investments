'use client';

import { useEffect } from 'react';
import { init } from '@sentry/nextjs';

export function MonitoringProvider() {
  useEffect(() => {
    init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
      enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
      tracesSampleRate: 0.2,
    });
  }, []);

  return null;
}
