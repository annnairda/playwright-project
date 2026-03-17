// @ts-check
import { test, expect } from '@playwright/test';
import { Main } from '../pages/main';

test.beforeEach(async ({ page }) => {
    const main = new Main(page);
    await main.navigateTo();
});

test('Sign in - positive - admin', { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(process.env.ADMIN_USERNAME);
    await main.fillPassword(process.env.ADMIN_PASSWORD);

    await expect(main.loginButtonSelector).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.welcomeMsgSelector).toHaveText(`${main.partialWelcomeMsg}${process.env.ADMIN_USERNAME}`);
});

test('Sign in - positive - user', { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(process.env.USER_USERNAME);
    await main.fillPassword(process.env.USER_PASSWORD);

    await expect(main.loginButtonSelector).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.welcomeMsgSelector).toHaveText(`${main.partialWelcomeMsg}${process.env.USER_USERNAME}`);
});

test("Sign in - negative - admin's username", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(main.invalidSignInValue);
    await main.fillPassword(process.env.ADMIN_PASSWORD)

    await expect(main.loginButtonSelector).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorSelector).toHaveText(main.loginErrorText);

});

test("Sign in - negative - admin's password", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(process.env.ADMIN_USERNAME);
    await main.fillPassword(main.invalidSignInValue)

    await expect(main.loginButtonSelector).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorSelector).toHaveText(main.loginErrorText);

});

test("Sign in - negative - user's username", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    await main.fillUsername(main.invalidSignInValue);
    await main.fillPassword(process.env.USER_PASSWORD)

    await expect(main.loginButtonSelector).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorSelector).toHaveText(main.loginErrorText);

});

test("Sign in - negative - user's password", { tag: '@regression' }, async ({ page }) => {
    const main = new Main(page);

    main.fillUsername(process.env.USER_USERNAME);
    main.fillPassword(main.invalidSignInValue)

    await expect(main.loginButtonSelector).toContainText(main.loginButtonText);
    main.clickSignInButton();
    await expect(main.loginErrorSelector).toHaveText(main.loginErrorText);

});

