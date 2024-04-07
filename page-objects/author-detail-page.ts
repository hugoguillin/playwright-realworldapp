import { APIRequestContext, type Locator, type Page } from '@playwright/test';
import ArticlesApi from '../api/articles-api'
import _ from 'lodash'

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
    const index = _.random(0, 50)
    console.log('Index:', index)
    const articles = await this.articlesApi.getArticles(index)
    const authorName = articles[index - 1].author.username
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
