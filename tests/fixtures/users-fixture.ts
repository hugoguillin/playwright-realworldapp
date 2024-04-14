import { test as base } from '@playwright/test';
import UsersApi from '../../api/users-api';
import UserSettingsPage from '../../page-objects/user-settings-page';

type UserFixture = {
  usersApi: UsersApi
  userSettings: UserSettingsPage
}

export const test = base.extend<UserFixture>({
  usersApi: async ({ request }, use) => {
    const usersApi = new UsersApi(request)
    await use(usersApi)
  },
  userSettings: async ({ page }, use) => {
    const userSettings = new UserSettingsPage(page)
    await use(userSettings)
  }
})
