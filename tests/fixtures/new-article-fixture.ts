import { test as base } from '@playwright/test';
import NewArticlePage from '../../page-objects/new-article-page';

type NewArticleFixture = {
  newArticle: NewArticlePage
}

export const test = base.extend<NewArticleFixture>({
  newArticle: async ({ page }, use) => {
    const newArticlePage = new NewArticlePage(page)
    await use(newArticlePage)
  }
})
