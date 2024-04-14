import { type Locator, type Page } from "@playwright/test";

export default class ArticlesFeedPage {
  readonly page: Page
  readonly articleTitle: Locator

  constructor(page: Page) {
    this.page = page
    this.articleTitle = page.getByTestId('article-title')
  }
}
