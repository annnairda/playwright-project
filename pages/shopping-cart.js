import { expect } from "@playwright/test";

export class ShoppingCart {
    constructor(page) {
        this.page = page;
        this.url = 'products/p1.html';
    }
    async navigateTo() {
        await this.page.goto(this.url);
    }

    async () {
        
    }
}

module.exports = { ShoppingCart }