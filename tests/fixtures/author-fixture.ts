import { test as base } from '@playwright/test';
import AuthorApi from '../../api/author-api';
import AuthorDetailPage from '../../page-objects/author-detail-page';
import FollowAuthorPage from '../../page-objects/common/follow-author-page';

type AuthorFixture = {
  authorApi: AuthorApi
  authorDetail: AuthorDetailPage
  followAuthor: FollowAuthorPage
}

export const test = base.extend<AuthorFixture>({
  authorApi: async ({ request }, use) => {
    const authorApi = new AuthorApi(request)
    await use(authorApi)
  },
  authorDetail: async ({ page, request }, use) => {
    const authorDetail = new AuthorDetailPage(page, request)
    await use(authorDetail)
  },
  followAuthor: async ({ page }, use) => {
    const followAuthor = new FollowAuthorPage(page)
    await use(followAuthor)
  }
})
