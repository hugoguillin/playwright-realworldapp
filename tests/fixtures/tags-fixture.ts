import { test as base } from '@playwright/test';
import TagsApi from '../../api-clients/tags-api';
import TagPage from '../../page-objects/tag-page';

type TagFixture = {
  tagsApi: TagsApi
  tagPage: TagPage
}

export const test = base.extend<TagFixture>({
  tagsApi: async ({ request }, use) => {
    const tagsApi = new TagsApi(request)
    await use(tagsApi)
  },
  tagPage: async ({ page, request }, use) => {
    const tagPage = new TagPage(page, request)
    await use(tagPage)
  }
})
