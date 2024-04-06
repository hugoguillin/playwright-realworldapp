import { APIRequestContext, type Locator, type Page } from '@playwright/test';
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

  public async visit() {
    const articles = await this.articlesApi.getArticles(100)
    const authorName = articles[15].author.username
    const encodedAuthorName = encodeURIComponent(authorName)
    this.page.goto(`/#/profile/${encodedAuthorName}`)
    return authorName
  }

  public async getArticlesTitles() {
    return this.articleTitle
  }

  public async showFavoritedArticles() {
    this.page.getByText('Favorited Articles').click()
  }
}
