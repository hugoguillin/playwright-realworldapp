import { expect, type Locator, type Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page
  readonly emailField: Locator
  readonly passwordField: Locator
  readonly loginButton: Locator
  readonly yourFeedTab: Locator

  constructor(page: Page) {
    this.page = page
    this.emailField = page.getByTestId('email')
    this.passwordField = page.getByTestId('password')
    this.loginButton = page.getByTestId('login-button')
    this.yourFeedTab = page.getByText('Your Feed')
  }

  public async login(email: string, password: string) {
    await this.page.goto('/#/login');
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await expect(this.yourFeedTab).toBeVisible();
  }
}
