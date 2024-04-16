import { userFixture as test, expect } from "./fixtures/main-fixture";
import Utils from "../utils/utils";

test.use({ storageState: { cookies: [], origins: [] }, extraHTTPHeaders: {} });
test.describe('Signup tests', { tag: '@user' }, () => {
  test.beforeEach(async ({ signUpPage }) => {
    await signUpPage.visit()
  });

  test('Should register valid new user', async ({ page, signUpPage, userSettings, usersApi }) => {
    // Arrange
    const newUser = Utils.generateNewUserData()
    const signupRequest = page.waitForResponse('**/api/user')

    // Act
    await signUpPage.signUp(newUser)
    await signupRequest
    const user = await usersApi.getUser(newUser)

    // Assert
    await expect(userSettings.userPic.locator('..'), 'Username in options menu').toHaveText(newUser.user.username)
    expect(user.user.username, 'Current user yield from backend').toBe(newUser.user.username)
  });

});
