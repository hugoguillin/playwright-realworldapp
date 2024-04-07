import { expect, APIRequestContext } from "@playwright/test"
import ArticlesApi from "./articles-api";
import { ar } from "@faker-js/faker";

const url = process.env.API_URL

export default class AuthorApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }
  public async unfollowAuthor(articleIndex = 0) {
    const articles = await new ArticlesApi(this.request).getArticles(articleIndex + 1)
    const authorName = articles[articleIndex].author.username
    const encodedAuthorName = encodeURIComponent(authorName)
    const response = await this.request.delete(`${url}/profiles/${encodedAuthorName}/follow`)
    expect(response).toBeOK()
  }
}
