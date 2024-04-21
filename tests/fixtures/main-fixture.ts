import { mergeTests } from "@playwright/test";
import { test as articleFixture } from "./article-fixture";
import { test as favoritesFixture } from "./favorites-fixture";
import { test as authorFixture } from "./author-fixture";
import { test as commentsFixture } from "./comments-fixture";
import { test as usersFixture } from "./users-fixture";
import { test as loginFixture } from "./login-fixture";
import { test as newArticleFixture } from "./new-article-fixture";
import { test as signUpFixture } from "./signup-fixture";
import { test as tagsFixture } from "./tags-fixture";

export const articleDetailFixture = mergeTests(articleFixture, favoritesFixture, authorFixture, commentsFixture, newArticleFixture);
export const authorDetailFixture = mergeTests(authorFixture, articleFixture)
export const globalFeedFixture = mergeTests(articleFixture, favoritesFixture, tagsFixture)
export const userFixture = mergeTests(usersFixture, loginFixture, signUpFixture)
export { expect } from "@playwright/test";
