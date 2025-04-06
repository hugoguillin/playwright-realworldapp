import { test as base } from '@playwright/test';
import FavoritesApi from '../../api-clients/favorites-api';
import FavoritesPage from '../../page-objects/common/favorites-page';

type FavoritesFixture = {
  favoritesApi: FavoritesApi
  favoritesPage: FavoritesPage
}

export const test = base.extend<FavoritesFixture>({
  favoritesApi: async ({ request }, use) => {
    const favoritesApi = new FavoritesApi(request)
    await use(favoritesApi)
  },
  favoritesPage: async ({ page }, use) => {
    const favoritesPage = new FavoritesPage(page)
    await use(favoritesPage)
  }
})
