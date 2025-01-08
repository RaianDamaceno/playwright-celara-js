import {test, expect} from '@playwright/test';
import {CheckoutPage} from "../pages/checkoutPage";
import {validUser} from "../data/testData";
const { billingDetails, paymentDetails } = require('../data/testData');

test('Successful Checkout Scenario', async ({page}) => {
    const checkoutPage = new CheckoutPage(page);
    await page.goto('/checkout');

    await checkoutPage.completeCheckout(billingDetails, paymentDetails, true)
    const checkCheckoutSuccessMsg = await checkoutPage.getText(checkoutPage.orderConfirmationMsg)
    expect(checkCheckoutSuccessMsg).toBe('Order Confirmed!');
});

test('Checkout scenario without checking at the shipping address checkbox', async ({page}) => {
    const checkoutPage = new CheckoutPage(page);
    await page.goto('/checkout');

    await checkoutPage.completeCheckout(billingDetails, paymentDetails, false)
    page.on('dialog', async dialog => {
        expect(dialog.message()).toBe('Shipping address same as billing checkbox must be selected.');
    });
});

test('get all price in cart', async ({ page }) => {
    await page.goto('/checkout');
    const priceElements = await page.locator('span.price');
    const priceTexts = await priceElements.allTextContents();
    let firstItem = parseInt(priceTexts[0].trim())
    // console.log(firstItem)
    priceTexts.shift()

    const priceNumbers = priceTexts.map(price => parseFloat(price.replace('$', '')));
    const lastItem = priceNumbers[priceNumbers.length -1]
    let itens = priceNumbers.slice(0, -1)

    expect(itens.length).toBe(firstItem);
    let result = 0
    for (let i = 0; i < itens.length; i++) {
        result = itens[i] + result
        // console.log('test' + result)
    }

    expect(result).toBe(lastItem);
});