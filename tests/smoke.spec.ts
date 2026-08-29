import { expect, test } from '@playwright/test';

test('stage zero shell renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Stage 0 foundation' })).toBeVisible();
  await expect(page.getByText('Current app phase')).toBeVisible();
  await expect(page.getByText('MAIN_MENU')).toBeVisible();
});
