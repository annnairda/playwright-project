export class Product {
    constructor(page) {
        this.page = page;
        this.pagePartialTitle = ' – Testowy Sklep';
        this.productNameSelector = this.page.locator('.title');
        this.productDescSelector = this.page.locator('.desc');
        this.imgAttributeName = 'src';
        this.productPriceSelector = this.page.locator('.price strong');
        this.productPriceTextSuffix = ' zł';
        this.successToastSelector = this.page.locator('.toast-success');
        this.partialSuccessToastSelector = 'Dodano do koszyka: ';
        this.viewCartButton = this.page.getByTestId('cart-button');
        this.cartTextAfterAddingProduct = '🧺 Koszyk (1)';
        this.navigateToCartBtnSelector = this.page.getByTestId('cart-button');
    }

    async clickNavigateToCartButton() {
        await this.navigateToCartBtnSelector.click();
    }
}

module.exports = { Product }