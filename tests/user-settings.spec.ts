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

});
