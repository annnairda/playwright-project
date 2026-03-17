// @ts-check
import { test, expect } from '@playwright/test';
import { Main } from '../pages/main';
//import { Product } from '../pages/product';


test.beforeEach(async ({ page }) => {
  const main = new Main(page);
  await main.navigateTo();
});


test('Sign in from main page - positive', async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(process.env.ADMIN_USERNAME);
    await main.fillPassword(process.env.ADMIN_PASSWORD);

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.welcomeMsgLocator).toHaveText(`${main.partialWelcomeMsg}${process.env.ADMIN_USERNAME}`);
});

test('Sign in from main page - negative - username', async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(main.invalidSignInValue);
    await main.fillPassword(process.env.ADMIN_PASSWORD)

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorLocator).toHaveText(main.loginErrorText);

});

test('Sign in from main page - negative - password', async ({ page }) => {
    const main = new Main(page);
    
    main.fillUsername(process.env.ADMIN_USERNAME);
    main.fillPassword(main.invalidSignInValue)

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorLocator).toHaveText(main.loginErrorText);

});

//planuję dodać logowanie z poziomu każdej strony i wtedy zakomentuję beforeEach i wrzucę navigate to do testów main page

