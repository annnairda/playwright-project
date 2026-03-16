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
            "name": "Test product",
            "price": 119.99,
            "currency": "PLN"
        }
    });

    expect(responsePost.status()).toBe(201);

    console.log(await responsePost.text())
    //WORK IN PROGRESS
    expect(await responsePost.text()).toContain(api.apiPostResponse)//ADD ID at the end from the repsonse

});