import { expect, APIRequestContext } from "@playwright/test"
import ArticlesApi from "./articles-api";
import Utils from "../utils/utils";

const url = process.env.API_URL

export default class AuthorApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }
  public async unfollowAuthor(articleIndex = 0) {
    const articles = await new ArticlesApi(this.request).getArticles()
    const authorName = articles[articleIndex].author.username
    const encodedAuthorName = encodeURIComponent(authorName)
    const response = await this.request.delete(`${url}/profiles/${encodedAuthorName}/follow`, {
      headers: { Authorization: Utils.getToken() },
    })
    expect(response.status()).toBe(200)
  }
}
