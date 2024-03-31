import { test, expect } from '@playwright/test';
import ArticlesApi from '../api/articles-api';
import FavoritesApi from '../api/favorites-api';
import ArticleDetailPage from '../page-objects/article-detail-page';
import FavoritesPage from '../page-objects/favorites-page';

test.describe('Check fav feature', () => {
  test('Should like an article', async ({ page, request }) => {
    const articleDetail = new ArticleDetailPage(page, request)
    const favoritesPage = new FavoritesPage(page)
    const favoritesApi = new FavoritesApi(request)
    await favoritesApi.unfavoriteArticle()
    await articleDetail.visit()

    const postFavorite = page.waitForResponse('**/articles/*/favorite')
    const initialLikes = await favoritesPage.getAmountOfLikes()
    await favoritesPage.likeArticle()
    await postFavorite
    const finalLikes = await favoritesPage.getAmountOfLikes()
    expect(finalLikes).toBe(initialLikes + 1)
  });
});

test.describe('Article Detail Page', () => {
  test.beforeEach(async ({ page, request }) => {
    const articleDetail = new ArticleDetailPage(page, request)
    await articleDetail.visit()
  });

  test('Should follow an author', async ({ page, request }) => {
    const articleDetail = new ArticleDetailPage(page, request)
    await expect(await articleDetail.getCommentText()).toBeVisible()
  });

});
