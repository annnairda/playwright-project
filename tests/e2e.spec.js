// @ts-check
import { test, expect } from '@playwright/test';
import { Main } from '../pages/main';
import { Product } from '../pages/product';
import { ShoppingCart } from '../pages/shopping-cart';

test.beforeEach(async ({ page }) => {
    const mainPage = new Main(page);
    await mainPage.navigateTo();
});

const allProducts = [
    { id: 1, name: 'Miecz Runiczny', desc: 'Elegancki model pokazowy z grawerunkiem runicznym. Idealny do ekspozycji lub testów UI z elementami 3D.', price: 199.99 },
    { id: 2, name: 'Eliksir Energii', desc: 'Produkt demonstracyjny — przykładowy napój energetyczny w celach testowych. Używany do symulacji koszyka.', price: 39.99 },
    { id: 3, name: 'Peleryna Maskująca', desc: 'Przykładowy produkt o dynamicznych atrybutach. Idealny do testowania widoczności elementów w DOM-ie.', price: 349 },
    { id: 4, name: 'Mysz Gamingowa', desc: 'Model demonstracyjny sprzętu peryferyjnego. Zawiera dane do testów interakcji i atrybutów dostępności.', price: 129 },
    { id: 5, name: 'Klawiatura Mechaniczna', desc: 'Testowy model urządzenia wejściowego. Używany w scenariuszach symulujących zdarzenia klawiatury.', price: 289 },
    { id: 6, name: 'Słuchawki Studyjne', desc: 'Produkt z kategorii audio — przykładowy element do testów list produktów i szczegółowych widoków.', price: 459 },
    { id: 7, name: 'Notes QA', desc: 'Przykładowy notatnik — idealny do testowania funkcji zapisu, filtrów lub wyszukiwania po nazwie.', price: 24.99 },
    { id: 8, name: 'Kubek Debuggera', desc: 'Klasyczny kubek promocyjny. Używany w scenariuszach zakupowych i walidacji cen produktów.', price: 49 }
];

allProducts.forEach(product => {
    test(`Kup produkt ${product.name}`, { tag: '@e2e' }, async ({ page }) => {
        const mainPage = new Main(page);
        const productPage = new Product(page);
        const shoppingCart = new ShoppingCart(page);

        const testedProduct = {
            id: product.id,
            name: product.name,
            description: product.desc,
            price: product.price
        };

        //STRONA GŁÓWNA
        await expect(page).toHaveTitle(mainPage.pageTitle);
        //sprawdź czy koszyk ma 0 produktów
        await expect(mainPage.shoppingCartButtonSelector).toHaveText(mainPage.emptyShoppingCartButtonText);


        ////////////////////////////////////////DODAĆ
        ////nazwa produktu

        // //opis produktu

        // //zdjęcie produktu

        // //cena produktu

        // //id produktu


        //kliknij na nazwę produktu, żeby przejść do strony priduktu
        await page.getByTestId(`${mainPage.partialProductTitleSelector}${testedProduct.id}`).click();


        //STRONA PRODUKTU
        //nazwa produktu
        await expect(page.locator('.title')).toHaveText(testedProduct.name);
        //opis produktu
        await expect(page.locator('.desc')).toHaveText(testedProduct.description);

        //zdjęcie produktu
        //POPRAWIĆ, ŻEBY ZACZĘŁO DZIAŁAĆ...
        //await expect(page.getByTestId(`product-image-${testedProduct.id}`)).toHaveAttribute('src', `images/p${testedProduct.id}.png`);

        //cena produktu
        await expect(page.locator('.price strong')).toHaveText(`${testedProduct.price.toFixed(2)} zł`); //('.price strong') i .toFixed(2) <= przy tym wspomogłam się AI
        console.log(`${testedProduct.price.toFixed(2)} zł`);
        //id produktu
        await expect(page.locator('.badge')).toHaveText(`ID produktu: p${testedProduct.id}`);

        //(nadal) pusty koszyk tuż przed kliknięciem Dodaj do koszyka na stronie p1.html
        await expect(mainPage.shoppingCartButtonSelector).toHaveText(mainPage.emptyShoppingCartButtonText);

        await page.getByTestId(`buy-btn-${testedProduct.id}`).click();

        await expect(page.locator('.toast-success')).toHaveText(`Dodano do koszyka: ${testedProduct.name}`);



        //sprawdź czy koszyk ma 1 produkt
        await expect(mainPage.viewShoppingCartButton).toHaveText('🧺 Koszyk (1)');
        await page.getByTestId('cart-button').click();

        //KOSZYK
        await expect(page.locator('.cart-header')).toHaveText('Twój koszyk');
        await expect(page.getByTestId('cart-list').locator('span')).toHaveText(`${testedProduct.name} (p${testedProduct.id})`);
        await expect(page.getByTestId('cart-list').getByRole('button')).toHaveText('🗑');
        await expect(page.getByTestId('cart-buy')).toHaveText('Kup');
        await page.getByTestId('cart-buy').click();
        // await expect(page.locator('.toast-success')).toHaveText('sukces');

        // await expect(page.getByTestId(`product-card-${testedProduct.id}`)).toHaveText(`ID: p${testedProduct.id}`);


    });
});



