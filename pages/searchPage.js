const {expect} = require("@playwright/test");

class SearchPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.locator('input[name="searchWord"]');
        this.searchButton = page.locator('button[type="submit"]');
        this.resultText = page.locator('#result');
    }

    async search(query) {
        await this.searchInput.fill(query);
        await this.searchButton.click();
    }

    async getResultText(text) {
        const element = this.page.locator(`text=${text}`);
        await element.waitFor({ state: 'visible' });
        return await this.resultText.textContent();
    }
}

module.exports = { SearchPage };