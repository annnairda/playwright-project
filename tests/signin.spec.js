// @ts-check
import { test, expect } from '@playwright/test';
import { Main } from '../pages/main';

test.beforeEach(async ({ page }) => {
    const main = new Main(page);
    await main.navigateTo();
});

test('Sign in from main page - positive - admin', { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(process.env.ADMIN_USERNAME);
    await main.fillPassword(process.env.ADMIN_PASSWORD);

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.welcomeMsgLocator).toHaveText(`${main.partialWelcomeMsg}${process.env.ADMIN_USERNAME}`);
});

test('Sign in from main page - positive - user', { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(process.env.USER_USERNAME);
    await main.fillPassword(process.env.USER_PASSWORD);

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.welcomeMsgLocator).toHaveText(`${main.partialWelcomeMsg}${process.env.USER_USERNAME}`);
});

test("Sign in from main page - negative - admin's username", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(main.invalidSignInValue);
    await main.fillPassword(process.env.ADMIN_PASSWORD)

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorLocator).toHaveText(main.loginErrorText);

});

test("Sign in from main page - negative - admin's password", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    main.fillUsername(process.env.ADMIN_USERNAME);
    main.fillPassword(main.invalidSignInValue)

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorLocator).toHaveText(main.loginErrorText);

});

test("Sign in from main page - negative - user's username", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(main.invalidSignInValue);
    await main.fillPassword(process.env.USER_PASSWORD)

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorLocator).toHaveText(main.loginErrorText);

});

test("Sign in from main page - negative - user's password", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    main.fillUsername(process.env.USER_USERNAME);
    main.fillPassword(main.invalidSignInValue)

    await expect(main.loginButtonLocator).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorLocator).toHaveText(main.loginErrorText);

});

