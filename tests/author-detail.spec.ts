import { authorDetailFixture as test, expect } from "./fixtures/main-fixture";
import fs from 'fs';

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

  test('Should display favorited articles', async ({ page, authorDetail, articlesApi }) => {
    // Arrange - Mocking the API response to return a fixed set of articles
    const mockedData = JSON.parse(fs.readFileSync('./mocks/mocked-articles.json', 'utf8'))
    await page.route('**/articles?favorited=**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedData)
      })
    })
    await authorDetail.visit()

    // Act
    await authorDetail.showFavoritedArticles()

    // Assert
    const articles = await authorDetail.getArticlesTitles()
    await expect(articles, 'Wait for favorited articles to be loaded').toHaveCount(mockedData.articles.length)
  });
});
