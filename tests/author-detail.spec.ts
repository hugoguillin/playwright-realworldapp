import { authorDetailFixture as test, expect } from "./fixtures/main-fixture";
import fs from 'fs';
import _ from 'lodash'

test.describe('Author detail tests', { tag: '@author' }, () => {
  let articleIndex: number
  test.beforeEach(async () => {
    articleIndex = _.random(0, 50) // Let's pick a random article to test
  })

  test('Should display author articles', async ({ authorDetail, articlesApi, articlesFeed }) => {
    // Arrange
    const authorName = await authorDetail.visit(articleIndex)
    const authorArticles = await articlesApi.getArticlesByAuthor(authorName)
    const titlesDisplayed = await articlesFeed.articleTitle

    // Act
    const titlesText = await titlesDisplayed.allInnerTexts()

    // Assert
    expect(titlesText, 'All author articles are displayed').toEqual(authorArticles.map(article => article.title))
  });

  test('Should display favorited articles', async ({ page, authorDetail, articlesFeed }) => {
    // Arrange - Mocking the API response to return a fixed set of articles
    const mockedData = JSON.parse(fs.readFileSync('./mocks/mocked-articles.json', 'utf8'))
    await page.route('**/articles?favorited=**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedData)
      })
    })
    await authorDetail.visit(articleIndex)

    // Act
    await authorDetail.showFavoritedArticles()

    // Assert
    const articles = articlesFeed.articleTitle
    await expect(articles, 'Wait for favorited articles to be loaded').toHaveCount(mockedData.articles.length)
  });

  test('Should follow author', async ({ authorDetail, authorApi, followAuthor }) => {
    // Arrange
    await authorApi.unfollowAuthor(articleIndex)
    await authorDetail.visit(articleIndex)

    // Act
    let button = await followAuthor.clickAndGetButton()

    // Assert
    await expect(button, 'Follow author button').toHaveText(/\bUnfollow\b/)
  });
});
