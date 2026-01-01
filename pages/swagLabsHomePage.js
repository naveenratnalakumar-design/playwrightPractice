const { excuteSteps } = require("../utilites/actions");
const data = require("../data/data.json");
const { expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
let userFirstName = faker.person
  .firstName()
  .replace("-", " ")
  .replace("_", " ")
  .replace(".", " ")
  .replace(" ", " ");
let userLastName = faker.person
  .lastName()
  .replace("-", " ")
  .replace("_", " ")
  .replace(".", " ")
  .replace(" ", " ");
let postalCode = faker.location
  .zipCode()
  .replace("-", " ")
  .replace("_", " ")
  .replace(".", " ")
  .replace(" ", " ");
exports.HomePage = class HomePage {
  constructor(test, page) {
    this.test = test;
    this.page = page;
    this.addToCartButton = page.locator(
      "//a[@id='item_4_title_link']/../..//button"
    );
    this.cartIcon = page.locator(
      "//div[@id='shopping_cart_container']//*[name()='svg']"
    );
    this.checkoutButton = page.locator("//a[text()='CHECKOUT']");
    this.firstNameInput = page.locator("//input[@id='first-name']");
    this.lastNameInput = page.locator("//input[@id='last-name']");
    this.zipCodeInput = page.locator("//input[@id='postal-code']");
    this.continueButton = page.locator("//input[@type='submit']");
    this.finishButton = page.locator("//a[text()='FINISH']");
    this.checkoutPageInputErroralert = page.locator("//h3");
    this.productPrice = page.locator(
      "(//div[@class='inventory_item_price'])[1]"
    );
    this.productFillteringDropdown = page.locator(
      "//select[@class='product_sort_container']"
    );
    this.removeCartButton = page.locator("//button[text()='REMOVE']");
    this.continueShoppingButton = page.locator("//a[text()='Continue Shopping']")
  }
  clickOnAddToCartButton = async () => {
    await excuteSteps(
      this.test,
      this.addToCartButton,
      "click",
      `click on the addToCart button`
    );
  };
  clickOnCartIcon = async () => {
    await excuteSteps(
      this.test,
      this.cartIcon,
      "click",
      `click on the cartIcon button`
    );
  };
  clickOnCheckoutButton = async () => {
    await excuteSteps(
      this.test,
      this.checkoutButton,
      "click",
      `click on the checkout button`
    );
  };
  fillingFirstName = async (Fname) => {
    await excuteSteps(
      this.test,
      this.firstNameInput,
      "fill",
      `filling firstName`,
      Fname
    );
  };
  fillingLastName = async (Lname) => {
    await excuteSteps(
      this.test,
      this.lastNameInput,
      "fill",
      `filling lastName`,
      Lname
    );
  };
  fillingZipcode = async (Zcode) => {
    await excuteSteps(
      this.test,
      this.zipCodeInput,
      "fill",
      `filling lastName`,
      Zcode
    );
  };
  clickOnContinueButton = async () => {
    await excuteSteps(
      this.test,
      this.continueButton,
      "click",
      `click on the continue button`
    );
  };
  clickOnFinishButton = async () => {
    await excuteSteps(
      this.test,
      this.finishButton,
      "click",
      `click on the finish button`
    );
  };
  clickOnRemoveButton = async () => {
    await excuteSteps(
      this.test,
      this.removeCartButton,
      "click",
      `click on the removeCart button`
    );
  };
  clickOnContinueShoppingButton = async () => {
    await excuteSteps(
      this.test,
      this.continueShoppingButton,
      "click",
      `click on the continue Shopping button`
    );
  };
  checkingCheckoutPageInputs = async () => {
    await this.clickOnAddToCartButton();
    await this.clickOnCartIcon();
    await this.clickOnCheckoutButton();
    await this.fillingLastName([userLastName]);
    await this.fillingZipcode([postalCode]);
    await this.clickOnContinueButton();
    await expect(
      this.checkoutPageInputErroralert,
      "First Name is required error message should have text"
    ).toHaveText(data.checkOutPageErrors.firstNameError);
    await this.lastNameInput.clear();
    await this.fillingFirstName([userFirstName]);
    await this.fillingZipcode([postalCode]);
    await this.clickOnContinueButton();
    await expect(
      this.checkoutPageInputErroralert,
      "Last Name is required error message should have text"
    ).toHaveText(data.checkOutPageErrors.lasrNameError);
    await this.fillingFirstName([userFirstName]);
    await this.fillingLastName([userLastName]);
    await this.zipCodeInput.clear();
    await this.clickOnContinueButton();
    await expect(
      this.checkoutPageInputErroralert,
      "zipcode is required error message should have text"
    ).toHaveText(data.checkOutPageErrors.zipcodeErrors);
  };
  orderProduct = async () => {
    await this.clickOnAddToCartButton();
    await this.clickOnCartIcon();
    await this.clickOnCheckoutButton();
    await this.fillingFirstName([userFirstName]);
    await this.fillingLastName([userLastName]);
    await this.fillingZipcode([postalCode]);
    await this.clickOnContinueButton();
    await this.clickOnFinishButton();
  };
  fillteringByProduct = async () => {
    for (const element of data.fillteringProducts) {
      await this.page.waitForTimeout(parseInt(process.env.small_Wait));
      await this.productFillteringDropdown.selectOption(element);
    }
  };
  removeCartItem = async () =>{
    await this.clickOnAddToCartButton();
    await this.clickOnCartIcon();
    await this.clickOnRemoveButton();
    await this.clickOnContinueShoppingButton();
  }
};
