import { APIRequestContext, type Locator, type Page } from '@playwright/test';
import ArticlesApi from '../api/articles-api'

export default class ArticleDetailPage {
  readonly page: Page
  readonly articlesApi: ArticlesApi
  readonly commentTextarea: Locator
  readonly postCommentButton: Locator
  readonly commentCard: Locator
  readonly commentText: Locator
  readonly commentAuthor: Locator
  readonly articleBody: Locator
  readonly deleteArticleButton: Locator

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.articlesApi = new ArticlesApi(request)
    this.commentCard = page.getByTestId('comment-card')
    this.commentTextarea = page.getByTestId('comment-textarea')
    this.postCommentButton = page.getByTestId('post-comment')
    this.commentText = page.getByTestId('comment-content')
    this.commentAuthor = page.getByTestId('author-username')
    this.articleBody = page.getByTestId('article-content')
    this.deleteArticleButton = page.getByTestId('delete-article')
  }

  public async visit(articleIndex = 0) {
    const articles = await this.articlesApi.getArticles()
    const slug = articles[articleIndex].slug
    this.page.goto(`/#/article/${slug}`)
    await this.articleBody.waitFor({ state: 'visible', timeout: 10000 })
  }

  public async goToArticle(slug: string) {
    this.page.goto(`/#/article/${slug}`)
    await this.articleBody.waitFor({ state: 'visible', timeout: 10000 })
  }

  public async sendComment(comment: string) {
    this.commentTextarea.fill(comment)
    this.postCommentButton.click()
  }
  public async getCommentText() {
    return this.commentText
  }

  public async getCommentAuthor() {
    return this.commentAuthor
  }

  public async deleteComment(commentText: string) {
    const comment = this.commentCard.filter({ hasText: commentText })
    this.page.on('dialog', dialog => dialog.accept());
    comment.getByTestId('delete-comment').click()
    return comment
  }

  public async deleteArticle() {
    const requestPromise = this.page.waitForRequest(request =>
      request.method() === 'DELETE',
    );
    this.page.on('dialog', dialog => dialog.accept());
    this.deleteArticleButton.first().click()
    await requestPromise;
  }
}
