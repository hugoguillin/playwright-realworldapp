import { APIRequestContext, type Locator, type Page } from '@playwright/test';
import ArticlesApi from '../api/articles-api'

// data-testId attributes
const COMMENT_TEXTAREA = 'comment-textarea'
const POST_COMMENT_BUTTON = 'post-comment'
const COMMENT_TEXT = 'comment-content'
const COMMENT_AUTHOR = 'author-username'
const DELETE_COMMENT_BUTTON = 'delete-comment'
const TAG_PILLS = 'article-tag'
const EDIT_ARTICLE = 'edit-article'
const DELETE_ARTICLE = 'delete-article'

export default class ArticleDetailPage {
  readonly page: Page
  readonly articlesApi: ArticlesApi
  readonly commentTextarea: Locator
  readonly postCommentButton: Locator
  readonly commentText: Locator
  readonly commentAuthor: Locator

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.articlesApi = new ArticlesApi(request)
    this.commentTextarea = page.getByTestId('comment-textarea')
    this.postCommentButton = page.getByTestId('post-comment')
    this.commentText = page.getByTestId('comment-content')
    this.commentAuthor = page.getByTestId('author-username')
  }

  public async visit(articleIndex = 0) {
    const articles = await this.articlesApi.getArticles()
    const slug = articles[articleIndex].slug
    this.page.goto(`http://localhost:3000/#/article/${slug}`)
    // This elements are only visible when the page is fully loaded
    const heart = this.page.locator('.ion-heart').first()
    await heart.waitFor({ state: 'visible', timeout: 10000 })
    const articleBody = this.page.locator('.article-content p')
    await articleBody.waitFor({ state: 'visible', timeout: 10000 })
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

  }

  public async getArticleTags() {
  }

  public async getArticleBody() {
  }

  public async goToEditArticle() {
  }

  public async deleteArticle() {
  }
}
