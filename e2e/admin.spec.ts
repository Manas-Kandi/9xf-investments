import { test, expect } from '@playwright/test';

test.describe('Admin CRUD', () => {
  test('creates a new campaign from the modal', async ({ page }) => {
    await page.goto('/admin');

    await page.getByRole('button', { name: 'New Campaign' }).click();
    await expect(page.getByRole('heading', { name: /Campaign/ })).toBeVisible();

    await page.getByLabel('Company Name').fill('Playwright Ventures');
    await page.getByLabel('Tagline').fill('Testing capital');
    await page.getByLabel('Description').fill('Funds end-to-end testing excellence.');
    await page.getByLabel('Founder Name').fill('QA Bot');
    await page.getByLabel('Min Investment ($)').fill('150');
    await page.getByLabel('Max per investor ($)').fill('1000');
    await page.getByLabel('Target amount ($)').fill('50000');
    await page.getByLabel('Crowd allocation (%)').fill('10');
    await page.getByLabel('Status').selectOption('live');

    await page.getByRole('button', { name: 'Save' }).click();

    await expect(page.getByText('Playwright Ventures')).toBeVisible();
    await expect(page.getByText('$50,000')).toBeVisible();
  });
});
