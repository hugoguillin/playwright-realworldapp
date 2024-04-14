import { test as base } from '@playwright/test';
import LoginPage from '../../page-objects/common/login-page';

type LoginFixture = {
  loginPage: LoginPage
}

export const test = base.extend<LoginFixture>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page)
    await use(loginPage)
  }
})
