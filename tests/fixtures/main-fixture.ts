import { mergeTests } from "@playwright/test";
import { test as articleFixture } from "./article-fixture";
import { test as favoritesFixture } from "./favorites-fixture";

export const articleDetailFixture = mergeTests(articleFixture, favoritesFixture);
export { expect } from "@playwright/test";
