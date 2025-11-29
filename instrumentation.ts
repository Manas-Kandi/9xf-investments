import { init } from '@sentry/nextjs';

export async function register() {
  init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
    enabled: Boolean(process.env.SENTRY_DSN),
    tracesSampleRate: 0.2,
  });
}
