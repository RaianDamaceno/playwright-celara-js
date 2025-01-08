import {test, expect} from '@playwright/test';
import {SearchPage} from "../pages/searchPage";

test('Successful search scenario.', async ({page}) => {
    const searchPage = new SearchPage(page);
    await page.goto('/search');

    await searchPage.search('Pepperoni');

    const resultText = await searchPage.getResultText('Found one result for Pepperoni');
    expect(resultText).toBe('Found one result for Pepperoni');
});

test('Search scenario without sending parameters.', async ({page}) => {
    const searchPage = new SearchPage(page);
    await page.goto('/search');

    await searchPage.search('');

    const resultText = await searchPage.getResultText('Please provide a search word');
    expect(resultText).toBe('Please provide a search word.');
});