import { userFixture as test, expect } from "../fixtures/main-fixture";
import Utils from "../../utils/utils";
import { User, UserProfile, UserSettings } from "../../types";

test.describe('Logout tests', { tag: '@user' }, () => {
  let fieldsToUpdate: UserSettings
  let newUserData: User

  test.beforeEach(async ({ userSettings, usersApi, loginPage }) => {
    newUserData = Utils.generateNewUserData()
    const user: UserProfile = await usersApi.registerNewUser(newUserData)
    fieldsToUpdate = Utils.generateUserSettingsData()
    await loginPage.login(newUserData.user.email, newUserData.user.password)
    await userSettings.visit()
  });

  test('Should logout user', async ({ page, userSettings }) => {
    // Act
    await userSettings.logout()

    // Assert
    await expect(page).toHaveURL('/#/')
    expect(await userSettings.userPic.count()).toBe(0)

  });
});
