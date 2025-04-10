import { test as base } from '@playwright/test';
import ArticlesApi from '../../api-clients/articles-api';
import ArticleDetailPage from '../../page-objects/article-detail-page';
import ArticlesFeedPage from '../../page-objects/common/articles-feed-page';
import GlobalFeedPage from '../../page-objects/global-feed-page';

type ArticleFixture = {
  articlesApi: ArticlesApi
  articleDetail: ArticleDetailPage
  articlesFeed: ArticlesFeedPage
  globalFeed: GlobalFeedPage
}

export const test = base.extend<ArticleFixture>({
  articlesApi: async ({ request }, use) => {
    const articlesApi = new ArticlesApi(request)
    await use(articlesApi)
  },
  articleDetail: async ({ page, request }, use) => {
    const articleDetail = new ArticleDetailPage(page, request)
    await use(articleDetail)
  },
  articlesFeed: async ({ page }, use) => {
    const articleFeed = new ArticlesFeedPage(page)
    await use(articleFeed)
  },
  globalFeed: async ({ page }, use) => {
    const globalFeed = new GlobalFeedPage(page)
    await use(globalFeed)
  }
})
