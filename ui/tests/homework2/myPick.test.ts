import { test, expect } from '@Test';

test.describe('dsaf', async () => {
    test.beforeEach(async ({ page, baseURL }) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });

    test("Click 'My pick' in product card and check that button is clicked in sunglasses page", async ({
                                                                                                           page,
                                                                                                           baseURL,
                                                                                                           dataLayer,
                                                                                                       }) => {
        const button = await page.locator('//header//a[contains(., "Sunglasses")]');
        await button.click();
        await page.waitForLoadState('load');
        //
        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}sunglasses`);
        });
        const myPick = await page.locator('(//div[@data-testid="myPickWrapper"])[1]');
        const product = await page.locator('[data-test-name="product"]').first();
        const productId = await product.getAttribute('data-test-id');

        await myPick.scrollIntoViewIfNeeded();
        await myPick.click();
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
            const wishBtn = await page.locator('//div[@aria-label="View My Picks"]');
            await wishBtn.click();

            const itemId = await page
                .locator('//div[@data-productid]')
                .getAttribute('data-productid');

            expect(itemId).toStrictEqual(productId);
        });
    });
});
