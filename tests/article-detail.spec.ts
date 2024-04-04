import { articleDetailFixture as test, expect } from './fixtures/main-fixture';
import { faker } from "@faker-js/faker";

const articleIndex = 0
const username: string = process.env.RWAPP_USERNAME ?? ""

test.describe('Check features in article detail page', () => {
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

  test('Should follow an author', async ({ articleDetail, authorApi, followAuthor }) => {
    // Arrange
    await authorApi.unfollowAuthor()
    await articleDetail.visit()

    // Act - Assert
    let button = await followAuthor.clickAndGetButton()
    await expect(button).toHaveText(/\bUnfollow\b/)
    button = await followAuthor.clickAndGetButton()
    await expect(button).toHaveText(/\bFollow\b/)
  });

  test('Should add a comment to an article', async ({ articleDetail, commentsApi }) => {
    // Arrange
    await commentsApi.deleteArticleComments(articleIndex)
    await articleDetail.visit()
    const message = faker.lorem.sentence();

    // Act
    await articleDetail.sendComment(message)

    // Assert
    const commentText = await articleDetail.getCommentText()
    await expect(commentText).toHaveText(message)
    const commentAuthor = await articleDetail.getCommentAuthor()
    await expect(commentAuthor).toHaveText(username)
  });
});
