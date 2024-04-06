import { expect, APIRequestContext } from "@playwright/test"
import ArticlesApi from "./articles-api";
import Utils from "../utils/utils"

const url = process.env.API_URL

export default class CommentsApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  public async addCommentToArticle(articleIndex: number, message: string) {
    let slug = ''
    const articlesResponse = await new ArticlesApi(this.request).getArticles()
    slug = articlesResponse[articleIndex].slug
    const response = await this.request.post(`${url}/articles/${slug}/comments`, {
      headers: { Authorization: Utils.getToken() },
      data: { comment: { body: message } },
    })
    await expect(response).toBeOK()
  }

  public async deleteArticleComments(articleIndex: number) {
    let slug = ''
    const articlesResponse = await new ArticlesApi(this.request).getArticles()
    slug = articlesResponse[articleIndex].slug
    const comments = await this.getArticleComments(slug)
    for (const comment of comments) {
      const response = await this.request.delete(`${url}/articles/${slug}/comments/${comment.id}`, {
        headers: { Authorization: Utils.getToken() },
      })
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