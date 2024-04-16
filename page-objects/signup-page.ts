import { expect, type Locator, type Page } from '@playwright/test';
import { User } from '../types';

export default class SignUpPage {
  readonly page: Page
  readonly username: Locator
  readonly email: Locator
  readonly password: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.username = page.getByTestId("username")
    this.email = page.getByTestId("email")
    this.password = page.getByTestId("password")
    this.errorMessage = page.getByTestId("signup-error")
  }

  public async visit() {
    this.page.goto('/#/register')
    await expect(this.username).toBeEditable()
  }

  public async signUp(userData: User) {
    await this.username.fill(userData.user.username)
    await this.email.fill(userData.user.email)
    await this.password.fill(userData.user.password)
    await this.page.keyboard.press('Enter')
  }
}
