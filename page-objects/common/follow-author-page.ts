import { type Locator, type Page } from '@playwright/test';

export default class FollowAuthorPage {
  readonly page: Page
  readonly followButton: Locator

  constructor(page: Page) {
    this.page = page
    this.followButton = page.getByTestId('follow-button').first()
  }

  public async followAuthor() {
    await this.followButton.click()
  }

}
