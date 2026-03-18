import { expect } from "@playwright/test";

export class Main {
    constructor(page) {
        this.page = page;
        this.url = 'index.html';
        this.pageTitle = 'Testowy Sklep – Strona główna';
        this.shoppingCartButtonSelector = this.page.getByTestId('cart-button');
        this.emptyShoppingCartButtonText = '🧺 Koszyk (0)';
        this.partialProductTitleSelector = 'product-title-';
        //this.productCardPartialSelector = 'product-card-'

        this.loginUsernameField = this.page.getByTestId('login-username');
        this.loginPasswordField = this.page.getByTestId('login-password');
        this.loginButtonSelector = this.page.getByTestId('login-button');
        this.loginButtonText = 'Zaloguj';
        this.welcomeMsgSelector = this.page.getByTestId('welcome-msg');
        this.partialWelcomeMsg = 'Witaj: ';
        this.loginErrorSelector = this.page.getByTestId('login-error');
        this.loginErrorText = 'Złe dane logowania';
        this.invalidSignInValue = 'abc';

    }

    async navigateTo() {
        await this.page.goto(this.url);
    }

    //wykorzystane w signin.spec.js
    async fillUsername(username) {
        await this.loginUsernameField.fill(username);
    }

    async fillPassword(password) {
        await this.loginPasswordField.fill(password);
    }

    async clickSignInButton() {
        await this.loginButtonSelector.click();
    }

    //wykorzystane w e2e.spec.js
    async clickOnProductName(productId) {
        await this.page.getByTestId(`${this.partialProductTitleSelector}${productId}`).click();
    }
    
}

module.exports = { Main }