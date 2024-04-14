import { articleDetailFixture as test, expect } from './fixtures/main-fixture';
import { faker } from "@faker-js/faker";

const articleIndex = 0
const username: string = process.env.RWAPP_USERNAME ?? ""

// These tests must run in serial mode to avoid conflicts while adding and deleting comments
test.describe.configure({ mode: 'serial' })

test.describe('Article comments tests', { tag: ['@sanity', '@comments'] }, () => {
  test('Should add a comment to an article', async ({ articleDetail, commentsApi }) => {
    // Arrange
    await commentsApi.deleteArticleComments(articleIndex)
    await articleDetail.visit()
    const message = faker.lorem.sentence();

    // Act
    await articleDetail.sendComment(message)

    // Assert
    const commentText = articleDetail.commentText
    await expect(commentText, 'Comment content').toHaveText(message)
    const commentAuthor = articleDetail.commentAuthor
    await expect(commentAuthor, 'Comment author').toHaveText(username)
  });

  test('Should delete a comment from an article', async ({ articleDetail, commentsApi }) => {
    // Arrange
    const comment = faker.lorem.sentence();
    await commentsApi.addCommentToArticle(articleIndex, comment)
    await articleDetail.visit()
    const commentText = articleDetail.commentText
    expect(await commentText.count(), 'Number of comments for the article').toBeGreaterThan(0)

    // Act
    const commentDeleted = await articleDetail.deleteComment(comment)

    // Assert
    await expect(commentDeleted, 'Comment deleted').toHaveCount(0)
  });

});
