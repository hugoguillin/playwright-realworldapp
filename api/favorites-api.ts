import { expect, APIRequestContext } from "@playwright/test"
import ArticlesApi from "./articles-api";

const url = process.env.API_URL
const username: string = process.env.RWAPP_USERNAME ?? ""

export default class FavoritesApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  /**
   * Get all the articles favorited by a user
   * @param username The username of the user
   * @returns An array of articles
   */
  public async getUserFavorites(username: string) {
    const response = await this.request.get(`${url}/articles?favorited=${username}&limit=10`)
    expect(response).toBeOK()
    const body = await response.json()
    return body.articles
  }

  /**
   * Unfavorite an article
   * @param index The index of the article to unfavorite
   */
  public async unfavoriteArticle(index: number = 0) {
    let finalSlug: string = ''
    // Get the slug of the article to unfavorite
    const articlesResponse = await new ArticlesApi(this.request).getArticles()
    let slug = articlesResponse[index].slug

    // Check if the article is already favorited
    const favoritesResponse = await this.getUserFavorites(username)
    for (const article of favoritesResponse) {
      if (article.slug === slug) {
        finalSlug = article.slug
      }
    }
    // Unfavorite the article if it is already favorited
    if (finalSlug !== '') {
      const response = await this.request.delete(`${url}/articles/${slug}/favorite`)
      expect(response).toBeOK()
    }
  }
}
