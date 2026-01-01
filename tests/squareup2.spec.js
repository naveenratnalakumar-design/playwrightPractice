const {test,expect} = require('@playwright/test');
test.only('Squareup test', async ({ page }) => {

    await page.goto('https://app.squareup.com/login?lang_code=en-us');

    // Login Flow
    await page.locator("//label[text()='Email or phone number']").fill("een_pos@een.com");
    await page.locator("//market-button[text()='Continue']").click();
    await page.locator("input#password").fill("POSTest123");
    await page.locator("market-button[data-testid='login-password-submit-button']").click();
    await page.locator("//market-button[text()='Remind me next time']").click();
    await page.locator("//market-button[text()='Continue to Square']").click();
    await expect(page).toHaveTitle('Square Dashboard');
    await page.locator("//span[text()='Take a payment']").click();
    for (let i = 1; i <= 300; i++) {
        
        console.log(`Transaction #${i}`);

        // Start new transaction
        await page.locator("//div[contains(@class,'checkout-segmented-control__inner')]/market-button[2]").click();
        await page.locator("market-input-text[name='searchable-dropdown']").click();
        
       // await page.waitForTimeout(3000); // Wait for dropdown to appear

        // Generate a random number between 1 and 7
        let randomChoice = Math.floor(Math.random() * 10) + 1;
        console.log(`Random choice: ${randomChoice}`);

        // Switch case to select different dropdown options
        switch (randomChoice) {
            case 1:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[8]").click();
                break;
            case 2:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[4]").click();
                await page.locator("market-input-text[name='searchable-dropdown']").click();
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[5]").click();
                break;
            case 3:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[13]").click();
                break;
            case 4:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[5]").click();
                await page.locator("market-input-text[name='searchable-dropdown']").click();
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[7]").click();
                await page.locator("market-input-text[name='searchable-dropdown']").click();
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[13]").click();
                await page.locator("market-input-text[name='searchable-dropdown']").click();
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[4]").click();
                break;
            case 5:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[4]").click();
                await page.locator("market-input-text[name='searchable-dropdown']").click();
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[7]").click();
                break; 
            case 6:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[3]").click();
                await page.locator("market-input-text[name='searchable-dropdown']").click();
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[3]").click();
                break; 
            case 7:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[3]").click();
                // await page.locator("//div[contains(@class,'oce-line-item__qty')]/market-input-text").clear();
                // await page.locator("//div[contains(@class,'oce-line-item__qty')]/market-input-text").fill(5);
                break;    
            case 8:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[7]").click();
                break;    
            case 9:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[4]").click();
                break; 
            case 10:
                await page.locator("//market-list[@class='market-searchable-dropdown__list']/market-row[5]").click();
                break;

        }

        // Charge and validate payment
        await page.locator("//market-link/strong[text()='Add discount']").click();
        await page.locator("//label[text()='branch -discount']/following-sibling::market-radio").click();
        await page.locator("//market-button[text()='Add']").click();
        await page.waitForTimeout(3000);
        await page.locator("//market-button[text()='Charge']").click();
        await page.waitForTimeout(2000);
        //await expect(page.locator("//div[@class='d-block']/div/h2")).toHaveText("Payment recorded");
       //await page.locator("//market-button[text()='Charge']").click();
        console.log(`Transaction #${i} completed.`);
        await page.locator("div.single-column-layout__content-secondary market-button").first().click();
        
    }
});
