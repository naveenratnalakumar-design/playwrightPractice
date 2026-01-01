const { excuteSteps } = require("../utilites/actions");
const data = require("../data/data.json");
const { expect } = require("@playwright/test");
exports.LoginPage = class LoginPage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.UserNameInput = page.locator("//input[@id='user-name']");
    this.passwordInput = page.locator("//input[@id='password']");
    this.loginButton = page.locator("//input[@id='login-button']");
    this.errorMessage = page.locator("//h3");
  }
  launchingApplication = async (baseUrl) => {
    await excuteSteps(
      this.test,
      await this.page,
      "navigate",
      `Open the SwagLab login page`,
      baseUrl
    );
  };
  fillingUsername = async (uname) => {
    await excuteSteps(
      this.test,
      this.UserNameInput,
      "fill",
      `Enter the username in the username field.`,
      uname
    );
  };
  fillingPassword = async (pwd) => {
    await excuteSteps(
      this.test,
      this.passwordInput,
      "fill",
      `Enter the username in the username field.`,
      pwd
    );
  };
  clickOnLoginbutton = async () => {
    await excuteSteps(
      this.test,
      this.loginButton,
      "click",
      `click on the login button`
    );
  };
  loginWithInvalidCredentials = async (uname, pwd) => {
    await this.fillingUsername(uname);
    await this.fillingPassword(pwd);
    await this.clickOnLoginbutton();
  };
  loginWithValidCredentials = async (uname, pwd) => {
    await this.fillingUsername(uname);
    await this.fillingPassword(pwd);
    await this.clickOnLoginbutton();
  };
};
