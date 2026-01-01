const { test, expect } = require("@playwright/test");
const sections = require("../pages/pageIndex");
const data = require("../data/data.json");
require("dotenv").config();
test("TC_01_Login with Invalid credentials", async ({ page }) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.BASE_URL]);
  await loginPage.loginWithInvalidCredentials(
    [process.env.InvalidUserName],
    [process.env.InvalidPassword]
  );
  await page.waitForTimeout(parseInt(process.env.small_Wait));
  await expect(
    loginPage.errorMessage,
    "Username and password do not match should be visible"
  ).toHaveText(data.LoginPageErrorMessages.error);
});
test("TC_02_Login with valid credentials", async ({ page }) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.BASE_URL]);
  await loginPage.loginWithInvalidCredentials(
    [process.env.USER_NAME],
    [process.env.PASSWORD]
  );
});
// test("TC_03_Checking Checkout page Inputs", async ({ page }) => {
//   const loginPage = new sections.LoginPage(test, page);
//   await loginPage.launchingApplication([process.env.BASE_URL]);
//   await loginPage.loginWithInvalidCredentials(
//     [process.env.USER_NAME],
//     [process.env.PASSWORD]
//   );
//   const homePage = new sections.HomePage(test, page);
//   await homePage.checkingCheckoutPageInputs();
// });
// test("TC_04_user order require product in the application", async ({
//   page,
// }) => {
//   const loginPage = new sections.LoginPage(test, page);
//   await loginPage.launchingApplication([process.env.BASE_URL]);
//   await loginPage.loginWithInvalidCredentials(
//     [process.env.USER_NAME],
//     [process.env.PASSWORD]
//   );
//   const homePage = new sections.HomePage(test, page);
//   await homePage.orderProduct();
// });
// test("TC_05_Remove cart Item", async ({ page }) => {
//   const loginPage = new sections.LoginPage(test, page);
//   await loginPage.launchingApplication([process.env.BASE_URL]);
//   await loginPage.loginWithInvalidCredentials(
//     [process.env.USER_NAME],
//     [process.env.PASSWORD]
//   );
//   const homePage = new sections.HomePage(test, page);
//   await homePage.removeCartItem();
// });
test("TC_06_Filtering by product", async ({ page }) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.BASE_URL]);
  await loginPage.loginWithInvalidCredentials(
    [process.env.USER_NAME],
    [process.env.PASSWORD]
  );
  const homePage = new sections.HomePage(test, page);
  await homePage.fillteringByProduct();
});
test("TC_07_Verifying navbar options in swagLabs home page", async ({
  page,
}) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.BASE_URL]);
  await loginPage.loginWithInvalidCredentials(
    [process.env.USER_NAME],
    [process.env.PASSWORD]
  );
  const logoutPage = new sections.LogoutPage(test, page);
  await logoutPage.verifyingSideNavigationOptions();
});

test("TC_08_Logout SwagLabs Application", async ({ page }) => {
  const loginPage = new sections.LoginPage(test, page);
  await loginPage.launchingApplication([process.env.BASE_URL]);
  await loginPage.loginWithInvalidCredentials(
    [process.env.USER_NAME],
    [process.env.PASSWORD]
  );
  const logoutPage = new sections.LogoutPage(test, page);
  await logoutPage.logoutApplication();
});
