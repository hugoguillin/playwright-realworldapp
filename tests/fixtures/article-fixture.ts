import { test as base } from '@playwright/test';
import ArticlesApi from '../../api/articles-api';
import ArticleDetailPage from '../../page-objects/article-detail-page';

type ArticleFixture = {
  articlesApi: ArticlesApi
  articleDetail: ArticleDetailPage
}

export const test = base.extend<ArticleFixture>({
  articlesApi: async ({ request }, use) => {
    const articlesApi = new ArticlesApi(request)
    await use(articlesApi)
  },
  articleDetail: async ({ page, request }, use) => {
    const articleDetail = new ArticleDetailPage(page, request)
    await use(articleDetail)
  }
})
