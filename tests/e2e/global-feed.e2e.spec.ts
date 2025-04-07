import { expect, globalFeedFixture as test } from "../fixtures/main-fixture";

test.describe('Global feed tests', { tag: '@articles' }, () => {

  test('Should display expected articles', async ({ articlesApi, articlesFeed, globalFeed }) => {
    // Arrange
    await globalFeed.visit()

    // Act
    const expectedArticles = await articlesApi.getArticles()
    const actualArticles = articlesFeed.articleTitle
    const titlesText = await actualArticles.allInnerTexts()

    // Assert
    expect(titlesText, 'All expected articles are displayed').toEqual(expectedArticles.map(article => article.title))
  });

  test('Should like an article', async ({ favoritesApi, favoritesPage, globalFeed }) => {
    // Arrange
    await favoritesApi.unfavoriteArticle()
    await globalFeed.visit()
    const initialLikes = await favoritesPage.getAmountOfLikes()

    // Act
    await favoritesPage.likeArticle()

    // Assert
    const finalLikes = await favoritesPage.getAmountOfLikes()
    expect(finalLikes, 'Should have 1 more like').toBe(initialLikes + 1)
  });
});
