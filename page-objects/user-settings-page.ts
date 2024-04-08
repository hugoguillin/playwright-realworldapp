import { APIRequestContext, type Locator, type Page } from '@playwright/test';

export const UserSettingsFields = {
  image: 'profile-image',
  username: 'username',
  bio: 'bio',
  email: 'email',
  password: 'password'
}

export type UserSettings = {
  image?: string,
  username?: string,
  bio?: string,
  email?: string,
  password?: string
}

export default class UserSettingsPage {
  readonly page: Page
  readonly settingsHeader: Locator
  readonly userPic: Locator
  readonly submitButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page
    this.settingsHeader = page.getByText('Your Settings')
    this.userPic = page.getByTestId('user-pic')
    this.submitButton = page.getByRole('button', { name: 'Update Settings' })
    this.logoutButton = page.getByTestId('logout')
  }

  public async visit() {
    this.page.goto('/#/settings')
    await this.page.getByText('Your Settings').waitFor({ state: 'visible' })
  }

  public async getFormField(fieldName: string) {
    return this.page.getByTestId(fieldName)
  }

  public async updateField(fieldName: string, value: string) {
    const field = this.page.getByTestId(fieldName)
    field.fill(value)
  }

  public async updateAllFields(userSettings: UserSettings) {
    for (const field in userSettings) {
      if (userSettings[field]) {
        this.updateField(field, userSettings[field])
      }
    }
  }

  public async submit() {
    this.submitButton.click()
  }

  public async logout() {
    this.logoutButton.click()
  }
}
