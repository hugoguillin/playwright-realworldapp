import { test as base } from '@playwright/test';
import UserDetailsPage from '../../page-objects/user-details-page';

type UserFixture = {
  userDetails: UserDetailsPage
}

export const test = base.extend<UserFixture>({
  userDetails: async ({ page }, use) => {
    const userDetails = new UserDetailsPage(page)
    await use(userDetails)
  }
})
