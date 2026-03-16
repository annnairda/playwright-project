import { expect } from "@playwright/test";

export class Main {
    constructor(page) {
        this.page = page;
        this.url = 'index.html';
        this.productTitlePartialLocator = this.page.getByTestId(`product-title-${this.id}`);
        this.productTitleText1 = 'Miecz Runiczny';
        this.productDescLocator1 = this.page.getByTestId('product-desc-1');
        this.productDescText1 = 'Elegancki model pokazowy z grawerunkiem runicznym. Idealny do ekspozycji lub testów UI z elementami 3D.';
        this.productPriceLocator1 = this.page.getByTestId('product-price-1');
        this.productPriceText1 = '199.99 zł';
        this.buyButtonLocator1 = this.page.getByTestId('buy-btn-1');
        this.buyButtonText1 = 'Dodaj do koszyka';
        this.productId1 = this.page.getByTestId('product-card-1');
        this.productIdText = 'ID: p1';
        this.loginUsernameField = this.page.getByTestId('login-username');
        this.loginPasswordField = this.page.getByTestId('login-password');
        this.loginButtonLocator = this.page.getByTestId('login-button');
        this.loginButtonText = 'Zaloguj';
        this.welcomeMsgLocator = this.page.getByTestId('welcome-msg');
        this.partialWelcomeMsg = 'Witaj: ';
        this.invalidUsername = 'abc';
        this.loginErrorLocator = this.page.getByTestId('login-error') ;
        this.loginErrorText = 'Złe dane logowania';
        // this.invalidUsername = 'abc'
        // this.invalidPassword = 'abc';
        this.invalidSignInValue = 'abc';
    }
    
    async navigateTo() {
        await this.page.goto(this.url);
    }

    async clickProductTitle(productTitleLocator) {
        await this.productTitlePartialLocator.click();
    }

    async productWithPartialSelector(option) {

        await this.page.getByTestId(`${this.radioOptionPartialSelector}${optionToLowerCase}`).click();
    }


    async fillUsername(username) {
        await this.loginUsernameField.fill(username);
    }

    async fillPassword(password) {
        await this.loginPasswordField.fill(password);
    }

    async clickSignInButton() {
        await this.loginButtonLocator.click();
    }
}

module.exports = { Main }