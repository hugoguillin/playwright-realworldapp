import { expect, APIRequestContext } from "@playwright/test"
import { Tag } from "../types"

const url = process.env.API_URL

export default class TagsApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  /**
   * Get all tags
   * @returns The list of tags
   */
  public async getPopularTags(): Promise<Tag> {
    const response = await this.request.get(`${url}/tags`)
    expect(response).toBeOK()
    return await response.json()
  }
}
