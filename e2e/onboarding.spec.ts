import { test, expect } from '@playwright/test';
import { seedAppState } from './utils/state';

test.describe('Onboarding', () => {
  test('completes KYC step and moves to funding', async ({ page }) => {
    await seedAppState(page, {
      user: {
        id: 'user-kyc',
        email: 'kyc@example.com',
        kyc_status: 'pending',
        terms_accepted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      isAuthenticated: true,
      onboardingStep: 'kyc',
      isOnboarded: false,
    });

    await page.goto('/onboarding');

    await page.getByLabel('Legal full name').fill('Playwright User');
    await page.getByLabel('Date of birth').fill('1990-01-01');
    await page.getByLabel('Address').fill('123 Test St');
    await page.getByLabel('Country of citizenship').fill('USA');
    await page.getByLabel('Last 4 digits of SSN').fill('1234');
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForTimeout(1700);
    await expect(page.getByText('Link your bank account')).toBeVisible();
  });
});
