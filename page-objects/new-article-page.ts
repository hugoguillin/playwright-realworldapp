import { expect, type Locator, type Page } from '@playwright/test';
import { NewArticle } from '../types';

export default class NewArticlePage {
  readonly page: Page
  readonly articleTitle: Locator
  readonly articleDescription: Locator
  readonly articleBody: Locator
  readonly articleTags: Locator
  readonly publishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.articleTitle = page.getByTestId('title')
    this.articleDescription = page.getByTestId('description')
    this.articleBody = page.getByTestId('body')
    this.articleTags = page.getByTestId('tags')
    this.publishButton = page.getByTestId('submit-button')
  }

  public async visit() {
    this.page.goto('/#/editor')
  }

  public async fillForm(newArticle: NewArticle) {
    await this.articleTitle.fill(newArticle.article.title)
    await this.articleDescription.fill(newArticle.article.description)
    await this.articleBody.fill(newArticle.article.body)
    // Tag input expects tags to be separated by space. Can't use for loop because of async nature of fill, meaning that each iteration would overwrite the previous one
    if (newArticle.article.tagList) {
      await this.articleTags.fill(newArticle.article.tagList[0] + ' ' + newArticle.article.tagList[1])
    }
    this.page.waitForTimeout(200)
    await this.publishButton.click()
  }
}
