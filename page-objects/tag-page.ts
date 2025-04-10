import { APIRequestContext, expect, type Locator, type Page } from '@playwright/test';
import TagsApi from '../api-clients/tags-api'
import _ from 'lodash'

export default class TagPage {
  readonly page: Page
  readonly tagsApi: TagsApi
  readonly tagPill: Locator
  readonly tagTab: Locator

  constructor(page: Page, request: APIRequestContext) {
    this.page = page
    this.tagsApi = new TagsApi(request)
    this.tagPill = page.getByTestId('popular-tag')
    this.tagTab = page.getByTestId('tag-feed')
  }

  public async getTag() {
    return this.tagPill
  }

  public async getPopularTags() {
    return (await this.getTag()).allInnerTexts()
  }

  public async filterByTag(tag: string) {
    const tagElement = this.tagPill.filter({ hasText: tag })
    await tagElement.click()
    await expect(this.tagTab).toBeVisible()
  }

  public async getRandomTag() {
    const tags = await this.getPopularTags()
    return tags[_.random(0, 19)]
  }

  public async getTagTab() {
    return this.tagTab
  }
}
