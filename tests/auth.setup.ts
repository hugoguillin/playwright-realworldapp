import { test as setup, expect } from '@playwright/test';

const authFile = './.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('http://localhost:3000/#/login');
  await page.getByTestId('email').fill('cypress@realworld.com');
  await page.getByTestId('password').fill('cypress@realworld.com');
  await page.getByTestId('login-button').click();

  await expect(page.getByTestId('your-feed')).toBeVisible();

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
