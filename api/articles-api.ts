import { expect, APIRequestContext } from "@playwright/test"
import { NewArticle } from "../types"
import Utils from "../utils/utils"

const url = process.env.API_URL

export default class ArticlesApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  /**
   * Get a list of articles
   * @param limit Number of articles to return
   * @returns An array of articles
   */
  public async getArticles(limit: number = 10) {
    const response = await this.request.get(`${url}/articles?limit=${limit}`)
    expect(response.status()).toBe(200)
    const body = await response.json()
    return body.articles
  }

  /**
   * Get all the articles written by an author
   * @param authorName The author's username
   * @returns An array of articles
   */
  public async getArticlesByAuthor(authorName: string) {
    const response = await this.request.get(`${url}/articles?author=${authorName}&limit=10`, {
      headers: { Authorization: Utils.getToken() },
    })
    expect(response.status()).toBe(200)
    const apiResponse = await response.json()
    return apiResponse.articles
  }

  /**
   * Get all the articles with a specific tag
   * @param tagName The tag name
   * @returns An array of articles
   */
  public async getArticlesByTag(tagName: string) {
    const response = await this.request.get(`${url}/articles?tag=${tagName}&limit=10`, {
      headers: { Authorization: Utils.getToken() },
    })
    expect(response.status()).toBe(200)
    const apiResponse = await response.json()
    return apiResponse.articles
  }

  /**
   * Delete all the articles written by an author
   * @param authorName The author's username
   */
  public async deleteAuthorArticles(authorName: string) {
    const authorArticles = await this.getArticlesByAuthor(authorName)
    for (const article of authorArticles) {
      await this.request.delete(`${url}/articles${article.slug}`, {
        headers: { Authorization: Utils.getToken() },
      })
    }
  }

  /**
   * Create a new article
   * @param article The article to create
   * @returns The created article
   */
  public async createNewArticle(article: NewArticle) {
    const response = await this.request.post(`${url}/articles`, {
      headers: { Authorization: Utils.getToken() },
      data: article,
    })
    expect(response.status()).toBe(200)
    return await response.json()
  }

}
