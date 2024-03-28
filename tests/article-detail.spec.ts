import { test, expect } from '@playwright/test';

test.describe('Article Detail Page', () => {

  test('Mi test', async ({ page }) => {
    await page.goto('http://localhost:3000/#/settings')
    await expect(page.getByTestId('email')).toHaveValue('cypress@realworld.com')
  });

  test('Mi 2 test', async ({ page }) => {
    await page.goto('http://localhost:3000/#/settings')
    await expect(page.getByTestId('username')).toHaveValue('cypress-user')
  });

});
