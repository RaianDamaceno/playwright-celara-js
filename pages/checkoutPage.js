const {expect} = require("@playwright/test");
const {validUser} = require("../data/testData");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.fullNameField = page.locator('#fname');
        this.emailField = page.locator('#email');
        this.addressField = page.locator('#adr');
        this.cityField = page.locator('#city');
        this.stateField = page.locator('#state');
        this.zipField = page.locator('#zip');
        this.cardNameField = page.locator('#cname');
        this.cardNumberField = page.locator('#ccnum');
        this.expMonthDropdown = page.locator('#expmonth');
        this.expYearField = page.locator('#expyear');
        this.cvvField = page.locator('#cvv');
        this.continueToCheckoutButton = page.locator('button.btn')
        this.shippingAddressCheckbox = page.locator('input[name="sameadr"]')
        this.orderConfirmationMsg = page.locator('#order-confirmation h1')
        this.alert = page.locator('text="Shipping address same as billing checkbox must be selected."');
    }

    async enterFullName(fullName) {
        await this.fullNameField.fill(fullName);
    }

    async enterEmail(email) {
        await this.emailField.fill(email);
    }

    async enterAddress(address) {
        await this.addressField.fill(address);
    }

    async enterCity(city) {
        await this.cityField.fill(city);
    }

    async enterState(state) {
        await this.stateField.fill(state);
    }

    async enterZip(zip) {
        await this.zipField.fill(zip);
    }

    async enterCardName(cardName) {
        await this.cardNameField.fill(cardName);
    }

    async enterCardNumber(cardNumber) {
        await this.cardNumberField.fill(cardNumber);
    }

    async selectExpMonth(month) {
        await this.expMonthDropdown.selectOption({ label: month });
    }

    async enterExpYear(expYear){
        await this.expYearField.waitFor({ state: 'visible' });
        await this.expYearField.fill(expYear);
    }

    async enterCVV(cvv) {
        await this.cvvField.fill(cvv);
    }

    async clickCompleteCheckout() {
        await this.continueToCheckoutButton.click()
    }

    async clickCheckbox() {
        await this.shippingAddressCheckbox.click()
    }

    async setBillingAddress({ fullName, email, address, city, state, zip }) {
        await this.enterFullName(fullName);
        await this.enterEmail(email);
        await this.enterAddress(address);
        await this.enterCity(city);
        await this.enterState(state);
        await this.enterZip(zip);
    }

    async setPaymentDetails({ cardName, cardNumber, expMonth, expYear, cvv }, checkboxDecision) {
        await this.enterCardName(cardName);
        await this.enterCardNumber(cardNumber);
        await this.selectExpMonth(expMonth);
        await this.enterExpYear(expYear);
        await this.enterCVV(cvv);
        await this.verifyAndUncheckShippingCheckbox(checkboxDecision)
        await this.clickCompleteCheckout()
    }

    async completeCheckout(billingDetails, paymentDetails, checkboxDecision) {
        await this.setBillingAddress(billingDetails);
        await this.setPaymentDetails(paymentDetails, checkboxDecision);
    }

    async verifyAndUncheckShippingCheckbox(checkboxDecision) {
        const buttonChecked = await this.shippingAddressCheckbox.isChecked();
        if (checkboxDecision) {
            if (!buttonChecked) {
                await this.shippingAddressCheckbox.check();
            }
        } else {
            if (buttonChecked) {
                await this.shippingAddressCheckbox.uncheck();
            }
        }
    }

    async getText(locator) {
        return await locator.textContent();
    }
}

module.exports = { CheckoutPage };