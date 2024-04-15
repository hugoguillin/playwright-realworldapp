import { articleDetailFixture as test, expect } from './fixtures/main-fixture';
import Utils from '../utils/utils';
import { NewArticle } from '../types';
import _ from 'lodash';

test.describe('New article tests', { tag: ['@articles', '@sanity'] }, () => {
  let article: NewArticle

  test.beforeEach(async ({ newArticle }) => {
    article = Utils.generateNewArticleData()
    await newArticle.visit()
  });

  test('Should create a new article', async ({ page, newArticle, articleDetail }) => {
    // Act
    await newArticle.fillForm(article)

    // Assert
    const titleSlug = _.kebabCase(article.article.title)
    await expect(page).toHaveURL(`/#/article/${titleSlug}`)
    expect(articleDetail.articleBody).toHaveText(article.article.body)
    expect(await articleDetail.getTags()).toEqual(expect.arrayContaining(article.article.tagList));
  });

  test('Should update an existing article', async ({ page, newArticle, articleDetail, articlesApi }) => {
    // Arrange
    const editedData = {
      title: " edited title",
      description: "Edited description",
      body: "Edited body",
      tagList: [],
    };
    const articleToUpdate = await articlesApi.createNewArticle(article)
    await page.goto(`/#/article/${articleToUpdate.slug}`)
    // For some reason app freezes when going directly to article edit url, so we need to click the edit button
    await articleDetail.editArticleButton.click()
    await expect(newArticle.articleTitle).toHaveValue(articleToUpdate.title)

    // Act
    await newArticle.fillForm({ article: editedData })

    // Assert
    const titleSlug = _.kebabCase(editedData.title)
    await expect(page).toHaveURL(`/#/article/${titleSlug}`)
    expect(articleDetail.articleBody).toHaveText(editedData.body)
  });
});
