// const { test, expect } = require('@playwright/test');

// test('Adding product in Square using Playwright', async ({ page }) => {
//   await page.goto("https://app.squareup.com/login?app=developer&return_to=https://developer.squareup.com/apps");

//   // Perform initial login steps
//   await page.fill('input[autocomplete="username"]', "rakshit.j@een.com");
//   await page.click('market-button-group.market-button-group >> market-button');
//   await page.fill('#password', "POSTest123");
//   await page.click('market-button[name="sign-in-button"]');
//   await page.click('text=Remind me next time');
//   await page.click('text=Continue to Square');
//   await page.click('text=Sandbox test accounts');

//   // Wait for the new page to open after clicking this link
//   const [newPage] = await Promise.all([
//     page.context().waitForEvent('page'), // Waits for a new page in the current context
//     page.click('[data-tracking-id="sandbox-test-account-dashboard-link"]') // Action that opens new page
//   ]);
// await page.pause();
//   // Start waiting for popup before clicking. Note no await.
// const popupPromise = page.waitForEvent('popup');
// const popup = await popupPromise;
//   await popup.getByTestId('quick-access-ORDERS-item-row').getByText('Orders').click();
//   await popup.locator('#ember80 button').click();
//   // ... other test actions on `newPage` ...
// });
const { test, expect } = require('@playwright/test');

test('Adding product in Square using Playwright', async ({ page }) => {
  await page.goto("https://app.squareup.com/login?app=developer&return_to=https://developer.squareup.com/apps");

  // Perform initial login steps
  await page.fill('input[autocomplete="username"]', "rakshit.j@een.com");
  await page.click('market-button-group.market-button-group >> market-button');
  await page.fill('#password', "POSTest123");
  await page.click('market-button[name="sign-in-button"]');
  await page.click('text=Remind me next time');
  await page.click('text=Continue to Square');
  await page.click('text=Sandbox test accounts');
  // Start waiting for the popup before clicking to trigger it
  const popupPromise = page.waitForEvent('popup');
  await page.waitForTimeout(4000)
  await page.click('[data-tracking-id="sandbox-test-account-dashboard-link"]'); // Trigger the popup

  // Wait for the popup to appear and assign it to `popup`
  const popup = await popupPromise;

  // Interact with elements within the popup
  await popup.waitForSelector('[data-testid="quick-access-ORDERS-item-row"]');
  await popup.getByTestId('quick-access-ORDERS-item-row').getByText('Orders').click();
  await page.waitForTimeout(3000)
  await popup.locator('#ember80 button').click();

  // Additional test actions
  // await page.pause(); // Pauses for manual inspection if needed
});
