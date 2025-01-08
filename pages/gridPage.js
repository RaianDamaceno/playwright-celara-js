const {expect} = require("@playwright/test");
const {validUser} = require("../data/testData");

class GridPage {
    constructor(page) {
        this.page = page;
        this.gridItem = page.locator('.item');
        this.gridCard = 'label[data-test-id="card-number"]';
        this.gridTitle = 'h4[data-test-id="item-name"]';
        this.gridPrice = 'p[id="item-price"]';
        this.gridProductButton = 'button[data-test-id="add-to-order"]'
        this.gridProductImage = 'img'
    }

    async getItemNameByProductNumber(productNumber) {
        const productsCount = await this.gridItem.count();

        for (let i = 0; i < productsCount; i++) {
            const item = this.gridItem.nth(i);
            const productText = await item.locator(this.gridCard).textContent();
            // console.log(productText)
            if (productText === productNumber) {
                const itemName = await item.locator(this.gridTitle).textContent();
                return itemName;
            }
        }
        return null;
    }

    async getItemPriceByProductNumber(productNumber) {
        const productsCount = await this.gridItem.count();

        for (let i = 0; i < productsCount; i++) {
            const item = this.gridItem.nth(i);
            const productText = await item.locator(this.gridCard).textContent();

            if (productText === productNumber) {
                const itemPrice = await item.locator(this.gridPrice).textContent();
                return itemPrice;
            }
        }

        return null;
    }

    async getAllItems() {
        const productsCount = await this.gridItem.count();
        for (let i = 0; i < productsCount; i++) {
            const item = this.gridItem.nth(i);
            const productText = await item.locator(this.gridCard).textContent();
            expect(productText.trim()).not.toBe('');

            const productImagem = await item.locator(this.gridProductImage);
            const imgSrc = await productImagem.getAttribute('src');
            expect(imgSrc).not.toBe('');

            const itemPrice = await item.locator(this.gridPrice).textContent();
            expect(itemPrice.trim()).not.toBe('');

            const productButton = await item.locator(this.gridProductButton);
            expect(await productButton.isVisible()).toBe(true);
        }
    }
}

module.exports = { GridPage };