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

        //OPCJONALNE
        // await expect(page.getByTestId(`product-title-${testedProduct.id}`)).toHaveText(testedProduct.name);
        // await expect(page.getByTestId(`product-desc-${testedProduct.id}`)).toHaveText(testedProduct.description);
        // await expect(page.getByTestId(`product-image-${testedProduct.id}`)).toHaveAttribute('src', `images/p${testedProduct.id}.png`);
        // await expect(page.getByTestId(`product-price-${testedProduct.id}`)).toHaveText(`${testedProduct.price.toFixed(2)} zł`); //.toFixed(2) <= przy tym wspomogłam się AI
        // const productCard = page.getByTestId(`${mainPage.productCardPartialSelector}${testedProduct.id}`);
        // await expect(productCard.locator('.badge')).toHaveText(`ID: p${testedProduct.id}`);
        // console.log(`Id produktu na stronie głównej to ${testedProduct.id}.`);

        //kliknij na nazwę produktu, żeby przejść do strony produktu
        await mainPage.clickOnProductName(`${mainPage.partialProductTitleSelector}${testedProduct.id}`);

        //STRONA PRODUKTU
        await expect(page).toHaveTitle(`${testedProduct.name}${productPage.pagePartialTitle}`);

        await expect(productPage.productNameSelector).toHaveText(testedProduct.name);
        await expect(productPage.productDescSelector).toHaveText(testedProduct.description);
        await expect(page.getByAltText(testedProduct.name)).toHaveAttribute(`${productPage.imgAttributeName}`, `../images/p${testedProduct.id}.png`);

        const fixedProductPrice = testedProduct.price.toFixed(2)
        await expect(productPage.productPriceSelector).toHaveText(`${fixedProductPrice}${productPage.productPriceTextSuffix}`); //('.price strong') <= przy tym wspomogłam się AI
        console.log(fixedProductPrice);

        // // await expect(page.locator('.badge')).toHaveText(`ID produktu: p${testedProduct.id}`);
        // const productCard = page.getByTestId(`product-card-${testedProduct.id}`);
        // await expect(productCard.locator('.badge')).toHaveText(`ID: p${testedProduct.id}`);
        // console.log(`Id produktu na stronie głównej to ${testedProduct.id}.`);

        await page.getByTestId(`buy-btn-${testedProduct.id}`).click();

        await expect(productPage.successToastSelector).toHaveText(`${productPage.partialSuccessToastSelector}${testedProduct.name}`);
        // await expect(productPage.successToastSelector.filter({ hasText: `${productPage.partialSuccessToastSelector}${testedProduct.name}` })).toBeVisible();
        
        //sprawdź czy koszyk ma 1 produkt
        await expect(productPage.viewCartButton).toHaveText(productPage.cartTextAfterAddingProduct);
        
        await productPage.clickNavigateToCartButton();

        //KOSZYK
        await expect(shoppingCart.cartHeaderSelector).toHaveText(shoppingCart.cartHeaderText);
        await expect(shoppingCart.cartItemSelector).toHaveText(`${testedProduct.name} (p${testedProduct.id})`);
        await expect(shoppingCart.cartRemoveItemSelector).toHaveText(shoppingCart.cartRemoveItemText);

        await expect(shoppingCart.cartBuyButtonSelector).toHaveText(shoppingCart.cartBuyButtonText);
        await shoppingCart.clickBuyButton();        
        await expect(shoppingCart.successToastSelector.filter({ hasText: shoppingCart.successMessage })).toBeVisible();
    });
});



