import { userFixture as test, expect } from "./fixtures/main-fixture";

test.describe('Logout tests', { tag: '@user' }, () => {
  test('Should logout user', async ({ page, userSettings }) => {
    // Arrange
    await userSettings.visit()

    // Act
    await userSettings.logout()

    // Assert
    await expect(page).toHaveURL('/#/')
    expect(await userSettings.userPic.count()).toBe(0)
  });
});
