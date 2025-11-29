import { expect, test } from '@playwright/test';

test('loads the homepage', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/9xf/i);
});
