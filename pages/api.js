import { expect } from "@playwright/test";

export class Api {
    constructor(page) {
        this.page = page;
        this.url = 'docs';
        this.responseGetProductId3 = '{"id":3,"name":"Peleryna Maskująca","price":349,"currency":"PLN","display_price":"349.00 zł"}';
        this.apiPostResponse = '{\"message\":\"created (mock)\",\"product\":{\"name\":\"Test product\",\"price\":119.99,\"currency\":\"PLN\",\"id\":';
    }

    async navigateTo() {
        await this.page.goto(this.url);
    }
}

module.exports = { Api }