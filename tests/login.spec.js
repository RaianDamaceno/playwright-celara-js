import {test, expect} from '@playwright/test';
const {LoginPage} = require('../pages/loginPage')
const { validUser, urls, invalidUser } = require('../data/testData');

test('login.spec.js', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(validUser.username, validUser.password);

    const welcomeMessageText = await loginPage.getText(loginPage.welcomeMsg);
    const welcomeUsernameText = await loginPage.getText(loginPage.welcomeUsernameMsg);
    expect(welcomeMessageText).toBe('Welcome!');
    expect(welcomeUsernameText).toBe(validUser.username);
});

test('login.spec.js3', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(invalidUser.username, invalidUser.password);

    await loginPage.checkErrorMessage('Wrong credentials')
});

test('login.spec.js311', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await loginPage.login(invalidUser.username, invalidUser.password);

    await loginPage.checkErrorMessage('Fields can not be empty')
});