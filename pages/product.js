import { expect } from "@playwright/test";

export class Product {
    constructor(page) {
        this.page = page;
        this.url = 'products/p1.html';
    
        this.priceText = 'Cena: '
    }
    async navigateTo() {
        await this.page.goto(this.url);
    }

    async () {

    }
}

module.exports = { Product }