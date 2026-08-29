import { expect, test } from '@playwright/test';

test('playable loop starts from difficulty selection', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Выберите сложность' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Новичок/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Эксперт/ })).toBeVisible();

  await page.getByRole('button', { name: /Новичок/ }).click();
  await expect(page.getByRole('grid', { name: 'Шахматная доска' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Сдаться' })).toBeVisible();
});

test('resignation opens result overlay and returns to menu', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Новичок/ }).click();
  await page.getByRole('button', { name: 'Сдаться' }).click();

  await expect(page.getByRole('heading', { name: 'Поражение' })).toBeVisible();
  await expect(page.getByText('+1')).toBeVisible();
  await page.getByRole('button', { name: 'Главное меню' }).click();
  await expect(page.getByRole('heading', { name: 'Выберите сложность' })).toBeVisible();
});
