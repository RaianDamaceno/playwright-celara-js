import {test, expect} from '@playwright/test';
import {GridPage} from "../pages/gridPage";

test('grid', async ({page}) => {
    const gridPage = new GridPage(page);

    await page.goto('/grid');

    const itemName = await gridPage.getItemNameByProductNumber('7');
    expect(itemName).toBe('Super Pepperoni');
    const itemPrice = await gridPage.getItemPriceByProductNumber('7')
    expect(itemPrice).toBe('$10');
});

test('grid check all items', async ({page}) => {
    const gridPage = new GridPage(page);

    await page.goto('/grid');
    await gridPage.getAllItems();
});