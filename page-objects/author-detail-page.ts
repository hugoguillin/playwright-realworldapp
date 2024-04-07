import { expect, APIRequestContext, type Locator, type Page } from '@playwright/test';
import ArticlesApi from '../api/articles-api'

export default class AuthorDetailPage {
  readonly page: Page
  readonly articlesApi: ArticlesApi
  readonly articleTitle: Locator

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.articlesApi = new ArticlesApi(request)
    this.articleTitle = page.getByTestId('article-title')
  }

  public async visit(index: number = 0) {
    const articles = await this.articlesApi.getArticles(index + 1)
    const authorName = articles[index].author.username
    const encodedAuthorName = encodeURIComponent(authorName)
    this.page.goto(`/#/profile/${encodedAuthorName}`)

    // Wait for the page to load
    const authorArticles = await this.articlesApi.getArticlesByAuthor(authorName)
    const titlesDisplayed = await this.getArticlesTitles()
    await expect(titlesDisplayed, 'Wait for articles to be loaded').toHaveCount(authorArticles.length, { timeout: 10000 })

    return authorName
  }

  public async getArticlesTitles() {
    return this.articleTitle
  }

  public async showFavoritedArticles() {
    this.page.getByText('Favorited Articles').click()
  }
}
