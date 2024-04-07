import { type Locator, type Page } from '@playwright/test';

export default class FavoritesPage {
  readonly page: Page
  readonly favButton: Locator

  constructor(page: Page) {
    this.page = page
    this.favButton = page.getByTestId('fav-button')
  }

  /**
   * Get the total number of likes of an article
   * @param articleIndex The index of the article to get the number of likes
   * @returns The number of likes of the article
   */
  public async getAmountOfLikes(articleIndex = 0) {
    let favoritesText = await this.favButton.nth(articleIndex).textContent()
    // Like button loads the number of likes a little bit later than the rest of its text
    while (favoritesText?.match(/\d+/) === null) {
      console.log('waiting for likes count to load...')
      favoritesText = await this.favButton.nth(articleIndex).textContent()
    }
    const numberOfLikes = favoritesText?.replace(/\D+/g, '')
    return parseInt(numberOfLikes ?? '')
  }

  public async likeArticle(index = 0) {
    const postFavorite = this.page.waitForResponse('**/articles/*/favorite')
    await this.favButton.nth(index).click()
    await postFavorite
  }
}
