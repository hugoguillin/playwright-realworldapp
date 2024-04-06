import { mergeTests } from "@playwright/test";
import { test as articleFixture } from "./article-fixture";
import { test as favoritesFixture } from "./favorites-fixture";
import { test as authorFixture } from "./author-fixture";
import { test as commentsFixture } from "./comments-fixture";

export const articleDetailFixture = mergeTests(articleFixture, favoritesFixture, authorFixture, commentsFixture);
export { expect } from "@playwright/test";
