import { articleDetailFixture as test, expect } from './fixtures/main-fixture';
import Utils from '../utils/utils';

const username: string = process.env.RWAPP_USERNAME ?? ""

test.describe('Article detail tests', { tag: '@articles' }, () => {

  test('Should like an article', async ({ articleDetail, favoritesApi, favoritesPage }) => {
    // Arrange
    await favoritesApi.unfavoriteArticle()
    await articleDetail.visit()
    const initialLikes = await favoritesPage.getAmountOfLikes()

    // Act
    await favoritesPage.likeArticle()

    // Assert
    const finalLikes = await favoritesPage.getAmountOfLikes()
    expect(finalLikes, 'Likes count').toBe(initialLikes + 1)
  });

  test('Should follow an author', async ({ articleDetail, authorApi, followAuthor }) => {
    // Arrange
    await authorApi.unfollowAuthor()
    await articleDetail.visit()

    // Act - Assert
    let button = await followAuthor.clickAndGetButton()
    await expect(button, 'Follow author button').toHaveText(/\bUnfollow\b/)
    button = await followAuthor.clickAndGetButton()
    await expect(button, 'Follow author button').toHaveText(/\bFollow\b/)
  });

  test('Should delete an article', { tag: '@sanity' }, async ({ page, baseURL, articleDetail, articlesApi }) => {
    // Arrange
    let newArticle = Utils.generateNewArticleData(false);
    const articleToDelete = await articlesApi.createNewArticle(newArticle)
    await articleDetail.goToArticle(articleToDelete.slug)

    // Act
    await articleDetail.deleteArticle()

    // Assert
    await expect(page, 'Should go to home page').toHaveURL(baseURL + '#/')
    const authorArticles = await articlesApi.getArticlesByAuthor(username, 1000)
    expect(authorArticles, 'Author articles').not.toContain(articleToDelete)
  });

});
