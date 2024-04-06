import { authorDetailFixture as test, expect } from "./fixtures/main-fixture";

test.describe('Author detail tests', { tag: '@author' }, () => {

  test('Should display author articles', async ({ authorDetail, articlesApi }) => {
    // Arrange
    const authorName = await authorDetail.visit()
    const authorArticles = await articlesApi.getArticlesByAuthor(authorName)
    const titlesDisplayed = await authorDetail.getArticlesTitles()
    await expect(titlesDisplayed, 'Wait for articles to be loaded').toHaveCount(authorArticles.length)

    // Act
    const titlesText = await titlesDisplayed.allInnerTexts()

    // Assert
    expect(titlesText, 'All author articles are displayed').toEqual(authorArticles.map(article => article.title))
  });
});
