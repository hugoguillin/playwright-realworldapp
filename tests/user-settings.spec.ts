import { userFixture as test, expect } from "./fixtures/main-fixture";
import Utils from "../utils/utils";
import { NewUser, User, UserSettings } from "../types";
import { UserSettingsFields } from "../page-objects/user-settings-page";

// Each of these tests need a new user, so we need to discard the previous storage
// state and extraHTTPHeaders to start with a clean slate
test.use({ storageState: { cookies: [], origins: [] }, extraHTTPHeaders: {} });
test.describe('User settings tests', { tag: '@settings' }, () => {
  let fieldsToUpdate: UserSettings
  let newUserData: NewUser

  test.beforeEach(async ({ userSettings, usersApi, loginPage }) => {
    newUserData = Utils.generateNewUserData()
    const user: User = await usersApi.registerNewUser(newUserData)
    fieldsToUpdate = Utils.generateUserSettingsData()
    await loginPage.login(newUserData.user.email, newUserData.user.password)
    await userSettings.visit()
  });

  test('Should update profile picture', async ({ userSettings }) => {
    // Act
    userSettings.updateField(UserSettingsFields.image, fieldsToUpdate.image)
    userSettings.submit()

    // Assert
    await expect(userSettings.userPic).toHaveAttribute('src', fieldsToUpdate.image)
  });

  test('Should update username', async ({ page, userSettings, usersApi }) => {
    // Arrange
    const userUpdate = page.waitForResponse('**/api/user')

    // Act
    userSettings.updateField(UserSettingsFields.username, fieldsToUpdate.username)
    userSettings.submit()
    await userUpdate

    // Assert
    await expect(page.getByTestId(UserSettingsFields.username)).toHaveValue(fieldsToUpdate.username)
    // The parent element of the userPic locator is the one that contains the username
    await expect(userSettings.userPic.locator('..')).toHaveText(fieldsToUpdate.username)

    const updatedUserData = await usersApi.getUser(newUserData)
    expect(updatedUserData.user.username).toBe(fieldsToUpdate.username)
  });

  test('Should update user bio', async ({ page, userSettings, usersApi }) => {
    // Arrange
    const userUpdate = page.waitForResponse('**/api/user')

    // Act
    userSettings.updateField(UserSettingsFields.bio, fieldsToUpdate.bio)
    userSettings.submit()
    await userUpdate

    // Assert
    await expect(page.getByTestId(UserSettingsFields.bio)).toHaveText(fieldsToUpdate.bio)

    const updatedUserData = await usersApi.getUser(newUserData)
    expect(updatedUserData.user.bio).toBe(fieldsToUpdate.bio)
  });
});
