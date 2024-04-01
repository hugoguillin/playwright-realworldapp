import { articleDetailFixture as test, expect } from './fixtures/main-fixture';

test.describe('Check fav feature', () => {
  test('Should like an article', async ({ page, articleDetail, favoritesApi, favoritesPage }) => {
    // Arrange
    await favoritesApi.unfavoriteArticle()
    await articleDetail.visit()
    const postFavorite = page.waitForResponse('**/articles/*/favorite')
    const initialLikes = await favoritesPage.getAmountOfLikes()

    // Act
    await favoritesPage.likeArticle()
    await postFavorite

    // Assert
    const finalLikes = await favoritesPage.getAmountOfLikes()
    expect(finalLikes).toBe(initialLikes + 1)
  });
});

test.describe('Check follow feature', () => {
  test.beforeEach(async ({ articleDetail }) => {
    await articleDetail.visit()
  });

  test('Should follow an author', async ({ articleDetail }) => {
    await expect(await articleDetail.getCommentText()).toBeVisible()
  });

});
