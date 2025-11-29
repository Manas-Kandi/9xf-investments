import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// Next.js relies on router helpers; provide safe mocks for tests
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Supabase client mock to avoid network calls in unit tests
jest.mock('@supabase/ssr', () => ({
  createBrowserClient: () => ({
    auth: {
      getUser: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
      update: jest.fn(),
    })),
  }),
  createServerClient: () => ({
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(),
    })),
  }),
}));

// Polyfills for test environment
if (!global.TextEncoder) {
  // @ts-expect-error - jsdom global
  global.TextEncoder = TextEncoder;
}
if (!global.TextDecoder) {
  // @ts-expect-error - jsdom global
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}

process.env.NEXT_PUBLIC_SUPABASE_URL ||= 'http://127.0.0.1:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||= 'test-anon-key';
