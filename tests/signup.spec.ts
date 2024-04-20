import { userFixture as test, expect } from "./fixtures/main-fixture";
import Utils from "../utils/utils";

test.use({ storageState: { cookies: [], origins: [] }, extraHTTPHeaders: {} });
// test.describe.configure({ mode: 'serial' })
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

  test('Should display error message when registering with existing email', async ({ signUpPage, usersApi }) => {
    // Arrange
    const userData = Utils.generateNewUserData()
    const registeredUser = await usersApi.registerNewUser(userData)
    const userWithExistingEmail = {
      user: {
        username: 'existingUser',
        email: registeredUser.user.email,
        password: 'password'
      }
    }

    // Act
    await signUpPage.signUp(userWithExistingEmail)

    // Assert
    await expect(signUpPage.errorMessage, 'Error message').toHaveText('Email already exists.. try logging in')
  });

});
