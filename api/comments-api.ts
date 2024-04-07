import { expect, APIRequestContext } from "@playwright/test"
import ArticlesApi from "./articles-api";

const url = process.env.API_URL

export default class CommentsApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  public async addCommentToArticle(articleIndex: number, message: string) {
    const articlesResponse = await new ArticlesApi(this.request).getArticles()
    const slug = articlesResponse[articleIndex].slug
    const response = await this.request.post(`${url}/articles/${slug}/comments`, {
      data: { comment: { body: message } },
    })
    await expect(response).toBeOK()
  }

  public async deleteArticleComments(articleIndex: number) {
    const articlesResponse = await new ArticlesApi(this.request).getArticles()
    const slug = articlesResponse[articleIndex].slug
    const comments = await this.getArticleComments(slug)
    for (const comment of comments) {
      const response = await this.request.delete(`${url}/articles/${slug}/comments/${comment.id}`)
      await expect(response).toBeOK()
    }
  }

  public async getArticleComments(slug: string) {
    const response = await this.request.get(`${url}/articles/${slug}/comments`)
    await expect(response).toBeOK()
    const body = await response.json()
    return body.comments
  }

}
