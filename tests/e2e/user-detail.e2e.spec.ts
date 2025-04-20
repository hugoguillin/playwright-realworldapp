import { expect, globalFeedFixture as test } from "../fixtures/main-fixture";
import Utils from "../../utils/utils";
import _ from "lodash";
import { Article } from "../../types";

const username = process.env.RWAPP_USERNAME ?? ''

test.describe('User articles', () => {
  test.beforeAll(async ({ articlesApi }) => {
    // Let's make sure user has at least 5 articles
    for (let i = 0; i < 5; i++) {
      let newArticle = Utils.generateNewArticleData();
      await articlesApi.createNewArticle(newArticle);
    }
  })

  test.beforeEach(async ({ userDetails }) => {
    await userDetails.visit(username);
  })

  test("Should navigate to settings page", async ({ userDetails }) => {
    await expect(userDetails.settingsButton).toHaveAttribute('href', '#/settings')
  })

  test("Should display expected user articles", async ({ userDetails, articlesFeed, articlesApi }) => {
    // Arrange
    await expect(userDetails.myArticlesTab).toHaveClass(/active/)
    const articles = await articlesApi.getArticlesByAuthor(username)
    const articlesFront = await articlesFeed.articleTitle.allInnerTexts()

    // Assert
    expect(articlesFront, 'User articles').toEqual(articles.map((article) => article.title.trim()))
  })
})

test.describe('Favorited articles', () => {
  let favoritedArticles: Article[] = []
  test.beforeAll(async ({ articlesApi, favoritesApi }) => {
    // In order for the test to be deterministic, first we need to unfavorite all articles
    await favoritesApi.unfavoriteAllArticles()

    // Then, let's favorite 5 random articles
    const articles = await articlesApi.getArticles()
    favoritedArticles = _.sampleSize(articles, 5)
    favoritedArticles.sort((a, b) => a.title.localeCompare(b.title))
    favoritedArticles.forEach(async (article: Article) => {
      await favoritesApi.favoriteArticle(article.slug)
    })
  })

  test("Should display user favorited articles", async ({ page, userDetails, articlesFeed }) => {
    // Arrange
    await userDetails.visit(username)
    await userDetails.favoritedArticlesTab.click()
    await expect(articlesFeed.articleTitle).toHaveCount(favoritedArticles.length)
    const articlesFront = (await articlesFeed.articleTitle.allInnerTexts()).sort()

    // Assert
    expect(articlesFront, 'User favorited articles').toEqual(favoritedArticles.map((article) => article.title))
  })

})
