import { expect, globalFeedFixture as test } from "./fixtures/main-fixture";
import Utils from "../utils/utils";

test.describe("Tags tests", { tag: "@tags" }, () => {

  test.beforeAll(async ({ articlesApi }) => {
    for (let i = 0; i < 10; i++) {
      let newArticle = Utils.generateNewArticleData();
      await articlesApi.createNewArticle(newArticle);
    }
  });

  test.beforeEach(async ({ globalFeed }) => {
    await globalFeed.visit();
  });

  test("Should display all popular tags", async ({ tagPage, tagsApi }) => {
    // Arrange
    const tagsFront = await tagPage.getPopularTags();
    let tagsBack = (await tagsApi.getPopularTags()).tags;
    // Only the first 50 tags are displayed on the page
    if (tagsBack.length > 50) {
      tagsBack = tagsBack.slice(0, 50);
    }

    // Assert
    expect(tagsFront, "Popular tags displayed").toEqual(tagsBack);
  });

  test("Should filter articles by tag", async ({ tagPage, page, articlesFeed, articlesApi }) => {
    // Arrange
    const getArticlesByTag = page.waitForResponse("**/articles?tag=*");
    const tag = await tagPage.getRandomTag();

    // Act
    await tagPage.filterByTag(tag);
    await getArticlesByTag;

    // Assert
    const currentTag = await tagPage.getTagTab();
    await expect(currentTag).toHaveText(tag);

    const articles = articlesFeed.articleTitle
    const titlesText = await articles.allInnerTexts()
    const articlesBack = await articlesApi.getArticlesByTag(tag);
    expect(titlesText, "Article titles").toEqual(articlesBack.map((article) => article.title.trim()));
  });
});
