const {expect} = require("@playwright/test");
const {validUser} = require("../data/testData");

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.signInButton = page.locator('#signin-button');
        this.welcomeMsg = page.locator('#welcome-message h2')
        this.welcomeUsernameMsg = page.locator('[data-id="username"]')
        this.errorMsg = page.locator('#message')
    }

    async enterUsername(username) {
        await this.usernameField.fill(username);
    }

    async enterPassword(password) {
        await this.passwordField.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSignIn();
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async checkErrorMessage(expectedText) {
        const element = this.page.locator(`text=${expectedText}`);
        await element.waitFor({ state: 'visible' });
        const actualErrorMsg = await this.errorMsg.textContent();
        expect(actualErrorMsg.trim()).toBe(expectedText);
    }
}

module.exports = { LoginPage };