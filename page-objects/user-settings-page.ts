import { expect, type Locator, type Page } from '@playwright/test';
import { UserSettings } from '../types';

export const UserSettingsFields = {
  image: 'profile-image',
  username: 'username',
  bio: 'bio',
  email: 'email',
  password: 'password'
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
    await expect(this.page.getByText('Your Settings')).toBeVisible();
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
