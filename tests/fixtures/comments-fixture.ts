import { test as base } from '@playwright/test';
import CommentsApi from '../../api/comments-api';

type CommentsFixture = {
  commentsApi: CommentsApi
}

export const test = base.extend<CommentsFixture>({
  commentsApi: async ({ request }, use) => {
    const commentsApi = new CommentsApi(request)
    await use(commentsApi)
  }
})
