import { expect } from "@playwright/test";

export class ShoppingCart {
    constructor(page) {
        this.page = page;
        this.cartHeaderSelector = this.page.locator('.cart-header');
        this.cartHeaderText = 'Twój koszyk';
        this.cartItemSelector = this.page.getByTestId('cart-list').locator('span');
        this.cartRemoveItemSelector = this.page.getByTitle('Usuń');
        this.cartRemoveItemText = '🗑';
        this.cartBuyButtonSelector = this.page.getByTestId('cart-buy');
        this.cartBuyButtonText = 'Kup';
        this.successToastSelector = this.page.locator('.toast-success');
        this.successMessage = 'sukces';
    }

    async clickBuyButton() {
        await this.cartBuyButtonSelector.click();
    }

}

module.exports = { ShoppingCart }