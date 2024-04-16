import { test as base } from '@playwright/test';
import SignUpPage from '../../page-objects/signup-page';

type SignUpFixture = {
  signUpPage: SignUpPage
}

export const test = base.extend<SignUpFixture>({
  signUpPage: async ({ page }, use) => {
    const signUp = new SignUpPage(page)
    await use(signUp)
  }
})
