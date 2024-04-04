import { expect, type Locator, type Page } from '@playwright/test';
import exp from 'constants';

export default class FollowAuthorPage {
  readonly page: Page
  readonly followButton: Locator

  constructor(page: Page) {
    this.page = page
    this.followButton = page.getByTestId('follow-button').first()
  }

  public async clickAndGetButton() {
    const followRequest = this.page.waitForRequest('**/profiles/*/follow')
    await this.followButton.click()
    await followRequest
    return this.followButton
  }
}
