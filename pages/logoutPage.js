const { excuteSteps } = require("../utilites/actions");
const data = require("../data/data.json");
const { expect } = require("@playwright/test");
exports.LogoutPage = class LogoutPage{
    constructor(test,page){
        this.test = test;
        this.page = page;
        this.menuIcon = page.locator("//button[text()='Open Menu']");
        this.navigationHeadings = (txt)=>page.locator(`//a[text()='${txt}']`);
        this.logoutButton = page.locator("//a[@id='logout_sidebar_link']")
    }
    clickOnOpenMenuIcon = async () => {
        await excuteSteps(
          this.test,
          this.menuIcon,
          "click",
          `click on the menuIcon button`
        );
      };
      clickOnLogoutButton = async () => {
        await excuteSteps(
          this.test,
          this.logoutButton,
          "click",
          `click on the logout button`
        );
      };
      verifyingSideNavigationOptions = async () =>{
        await this.clickOnOpenMenuIcon();
        for (const element of data.navigationOptions) {
            await expect(this.navigationHeadings(element)).toHaveText(element);
        }
      }
      logoutApplication = async () =>{
        await this.clickOnOpenMenuIcon();
        await this.clickOnLogoutButton();
      }
}