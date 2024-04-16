import { userFixture as test, expect } from "./fixtures/main-fixture";
import Utils from "../utils/utils";
import { User, UserProfile, UserSettings } from "../types";
import { UserSettingsFields } from "../page-objects/user-settings-page";

// Each of these tests need a new user, so we need to discard the previous storage
// state and extraHTTPHeaders to start with a clean slate
test.use({ storageState: { cookies: [], origins: [] }, extraHTTPHeaders: {} });
test.describe.configure({ mode: 'serial' })
test.describe('User settings tests', { tag: '@user' }, () => {
  let fieldsToUpdate: UserSettings
  let newUserData: User

  test.beforeEach(async ({ userSettings, usersApi, loginPage }) => {
    newUserData = Utils.generateNewUserData()
    const user: UserProfile = await usersApi.registerNewUser(newUserData)
    fieldsToUpdate = Utils.generateUserSettingsData()
    await loginPage.login(newUserData.user.email, newUserData.user.password)
    await userSettings.visit()
  });

  test('Should update profile picture', async ({ userSettings }) => {
    // Act
    await userSettings.updateField(UserSettingsFields.image, fieldsToUpdate.image)
    await userSettings.submit()

    // Assert
    await expect(userSettings.userPic).toHaveAttribute('src', fieldsToUpdate.image)
  });

  test('Should update username', async ({ page, userSettings, usersApi }) => {
    // Arrange
    const userUpdate = page.waitForResponse('**/api/user')

    // Act
    await userSettings.updateField(UserSettingsFields.username, fieldsToUpdate.username)
    await userSettings.submit()
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
    await userSettings.updateField(UserSettingsFields.bio, fieldsToUpdate.bio)
    await userSettings.submit()
    await userUpdate

    // Assert
    await expect(page.getByTestId(UserSettingsFields.bio)).toHaveText(fieldsToUpdate.bio)

    const updatedUserData = await usersApi.getUser(newUserData)
    expect(updatedUserData.user.bio).toBe(fieldsToUpdate.bio)
  });

  test('Should update user email', { tag: "@sanity" }, async ({ page, userSettings, usersApi }) => {
    // Arrange
    const userUpdate = page.waitForResponse('**/api/user')
    const userWithNewEmail: User = {
      user: {
        email: fieldsToUpdate.email,
        password: newUserData.user.password,
        username: newUserData.user.username
      }
    }

    // Act
    await userSettings.updateField(UserSettingsFields.email, fieldsToUpdate.email)
    await userSettings.submit()
    await userUpdate

    // Assert
    await expect(page.getByTestId(UserSettingsFields.email)).toHaveValue(fieldsToUpdate.email)

    const updatedUserData = await usersApi.getUser(userWithNewEmail)
    expect(updatedUserData.user.email).toBe(fieldsToUpdate.email)
  });

  test('Should update user password', { tag: "@sanity" }, async ({ page, userSettings, usersApi }) => {
    // Arrange
    const userUpdate = page.waitForResponse('**/api/user')
    const userWithNewPassword: User = {
      user: {
        email: newUserData.user.email,
        password: fieldsToUpdate.password,
        username: newUserData.user.username
      }
    }

    // Act
    await userSettings.updateField(UserSettingsFields.password, fieldsToUpdate.password)
    await userSettings.submit()
    await userUpdate

    // Assert - If getUser request works, it means the user password was updated ok
    const updatedUserData = await usersApi.getUser(userWithNewPassword)
    expect(updatedUserData.user.email).toBe(newUserData.user.email)
    // If this assertion works ok in a real application, it would be a security risk
    await expect(page.getByTestId(UserSettingsFields.password)).toHaveValue(fieldsToUpdate.password)
  });

  test('Should update all fields at once', async ({ page, userSettings, usersApi }) => {
    // Arrange
    const userUpdate = page.waitForResponse('**/api/user')
    const userWithNewData: User = {
      user: {
        email: fieldsToUpdate.email,
        password: fieldsToUpdate.password,
        username: fieldsToUpdate.username
      }
    }

    // Act
    await userSettings.updateAllFields(fieldsToUpdate)
    await userSettings.submit()
    await userUpdate

    // Assert
    await expect(userSettings.userPic).toHaveAttribute('src', fieldsToUpdate.image)
    await expect(page.getByTestId(UserSettingsFields.username)).toHaveValue(fieldsToUpdate.username)
    await expect(page.getByTestId(UserSettingsFields.bio)).toHaveText(fieldsToUpdate.bio)
    await expect(page.getByTestId(UserSettingsFields.email)).toHaveValue(fieldsToUpdate.email)
    await expect(page.getByTestId(UserSettingsFields.password)).toHaveValue(fieldsToUpdate.password)

    const updatedUserData = await usersApi.getUser(userWithNewData)
    for (const field in fieldsToUpdate) {
      if (field === 'password') continue
      expect(updatedUserData.user[field]).toBe(fieldsToUpdate[field])
    }
  });
});
