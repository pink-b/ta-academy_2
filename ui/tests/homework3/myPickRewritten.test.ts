import { test, expect } from '@Test';
import { faker } from '@faker-js/faker';

test.describe('My pick test scenario', async () => {
    test("Click 'My pick' in product card and check that button is clicked in sunglasses page", async ({
        page,
        baseURL,
        dataLayer,
        categoryPage,
    }) => {
        await categoryPage.open('sunglasses');
        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}sunglasses`);
        });
        const productId = await categoryPage.Product.clickMyPick();
        await test.step('event should fire after scroll to the section', async () => {
            const expectedEvent = {
                event: 'CategoryInteraction',
                eventCategory: 'Category - D',
                eventAction: 'Product',
                eventLabel: 'Add to Wishlist',
            };

            const [event] = await dataLayer.waitForDataLayer({
                event: 'CategoryInteraction',
                eventCategory: 'Category - D',
                eventAction: 'Product',
            });

            expect(event).toStrictEqual(expectedEvent);

            const a = console.log(await page.evaluate(() => window.dataLayer));
        });

        await test.step('click wishlist button and check the product list', async () => {
            const itemId = await categoryPage.WishList.getProductIdInWishList();

            expect(itemId).toStrictEqual(productId);
        });
    });
});
