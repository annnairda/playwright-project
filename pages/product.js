import { expect } from "@playwright/test";

export class Product {
    constructor(page) {
        this.page = page;
        this.url = 'index.html';
    }


}

module.exports = { Product }