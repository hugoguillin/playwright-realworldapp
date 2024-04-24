import { expect, APIRequestContext, type Page } from '@playwright/test';
import ArticlesApi from '../api/articles-api'
import ArticlesFeedPage from './common/articles-feed-page';

const testUsername = process.env.RWAPP_USERNAME

export default class AuthorDetailPage {
  readonly page: Page
  readonly articlesApi: ArticlesApi
  readonly articlesFeed: ArticlesFeedPage

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.articlesApi = new ArticlesApi(request)
    this.articlesFeed = new ArticlesFeedPage(page)
  }

  public async visit(index: number = 0) {
    const articles = (await this.articlesApi.getArticles(index + 1)).filter(article => article.author.username !== testUsername)
    const authorName = articles[articles.length - 1].author.username
    const encodedAuthorName = encodeURIComponent(authorName)
    this.page.goto(`/#/profile/${encodedAuthorName}`)

    // Wait for the page to load
    const authorArticles = await this.articlesApi.getArticlesByAuthor(authorName)
    const titlesDisplayed = this.articlesFeed.articleTitle
    await expect(titlesDisplayed, 'Wait for articles to be loaded').toHaveCount(authorArticles.length, { timeout: 10000 })

    return authorName
  }

  public async showFavoritedArticles() {
    this.page.getByText('Favorited Articles').click()
  }
}
