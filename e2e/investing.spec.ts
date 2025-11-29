import { test, expect } from '@playwright/test';
import { seedAppState } from './utils/state';

test.describe('Investing', () => {
  test('shows seeded investments and totals', async ({ page }) => {
    await seedAppState(page, {
      user: {
        id: 'investor-1',
        email: 'investor@example.com',
        kyc_status: 'verified',
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      isAuthenticated: true,
      onboardingStep: 'complete',
      isOnboarded: true,
      investments: [
        {
          id: 'inv-1',
          user_id: 'investor-1',
          campaign_id: 'camp-1',
          amount: 500,
          status: 'confirmed',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          campaign: {
            company_name: 'Carbon Batteries',
            slug: 'carbon-batteries',
          },
        },
      ],
    });

    await page.goto('/investments');

    await expect(page.getByRole('heading', { name: 'My investments' })).toBeVisible();
    await expect(page.getByText('$500')).toBeVisible();
    await expect(page.getByText('Carbon Batteries')).toBeVisible();
  });
});
