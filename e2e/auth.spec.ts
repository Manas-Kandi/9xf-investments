import { test, expect } from '@playwright/test';
import { seedAppState } from './utils/state';

test.describe('Signup and signin flows', () => {
  test('redirects to auth when unauthenticated user taps sign in', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Sign in').click();

    await expect(page).toHaveURL(/\/auth\/signin/);
  });

  test('shows account shortcuts when session is seeded', async ({ page }) => {
    await seedAppState(page, {
      user: {
        id: 'user-1',
        email: 'playwright@example.com',
        kyc_status: 'verified',
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      isAuthenticated: true,
      onboardingStep: 'complete',
      isOnboarded: true,
    });

    await page.goto('/');

    await expect(page.getByLabel('Account')).toBeVisible();
    await expect(page.getByLabel('Portfolio')).toBeVisible();
  });
});
