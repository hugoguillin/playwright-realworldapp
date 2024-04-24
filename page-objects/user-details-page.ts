import { type Locator, type Page } from '@playwright/test';

export default class UserDetailsPage {
  readonly page: Page
  readonly settingsButton: Locator
  readonly myArticlesTab: Locator
  readonly favoritedArticlesTab: Locator

  constructor(page: Page) {
    this.page = page
    this.settingsButton = page.getByTestId('edit-profile-settings')
    this.myArticlesTab = page.getByText('My Articles')
    this.favoritedArticlesTab = page.getByText('Favorited Articles')
  }

  public async visit(username: string) {
    this.page.goto(`/#/profile/${username}`)
  }

}
