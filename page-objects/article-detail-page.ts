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

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.articlesApi = new ArticlesApi(request)
  }

  public async visit(articleIndex = 0) {
    const articles = await this.articlesApi.getArticles()
    const slug = articles[articleIndex].slug
    this.page.goto(`http://localhost:3000/#/article/${slug}`)
  }
  public async sendComment(comment) {

  }
  public async getCommentText() {
    return await this.page.getByTestId(COMMENT_TEXTAREA)
  }

  public async getCommentAuthor() {
  }

  public async deleteComment(commentText) {

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
