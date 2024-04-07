import { expect, type Locator, type Page } from '@playwright/test';
import ArticlesApi from '../api/articles-api'
import ArticlesFeedPage from './common/articles-feed-page';

export default class GlobalFeedPage {
  readonly page: Page
  readonly articlesApi: ArticlesApi
  readonly articlesFeed: ArticlesFeedPage
  readonly globalFeedTab: Locator
  readonly yourFeedTab: Locator
  readonly loadingArticlesMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.articlesFeed = new ArticlesFeedPage(page)
    this.globalFeedTab = page.getByTestId('global-feed')
    this.yourFeedTab = page.getByText('Your feed')
    this.loadingArticlesMessage = page.getByText('Loading articles list...')
  }

  public async visit() {
    const requestReponse = this.page.waitForResponse('**/articles?limit**')
    this.page.goto('/#/')
    await expect(this.yourFeedTab).toBeVisible()
    await expect(this.loadingArticlesMessage).not.toBeVisible()
    this.globalFeedTab.click()
    await requestReponse
  }
}
