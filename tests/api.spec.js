// @ts-check
import { test, expect } from '@playwright/test';
import { Api } from '../pages/api';


test.beforeEach(async ({ page }) => {
    const api = new Api(page);
    await api.navigateTo();
});

test('Test API - GET method - Item with id=3', async ({ request }) => {
    const api = new Api();
    const responseGet3 = await request.get('/api/index.php?endpoint=products&id=3');
    expect(responseGet3.status()).toBe(200);
    expect(await responseGet3.text()).toContain(api.responseGetProductId3);
});

test('Test API - POST method', async ({ request }) => {
    const api = new Api();
    const responsePost = await request.post('/api/index.php?endpoint=products', {
        data: {
            name: 'Test product',
            price: 119.99,
            currency: 'PLN'
        }
    });

    expect(responsePost.status()).toBe(201);


    const bodyToJson = await responsePost.json();
    const productId = bodyToJson.product.id;
    console.log(`Product ID: ${productId}`);

    expect(bodyToJson).toMatchObject({
        message: 'created (mock)',
        product: {
            name: 'Test product',
            price: 119.99,
            currency: 'PLN',
            id: productId,
        },
    });

});