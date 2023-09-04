import { test, expect } from '@Test';
import { faker } from '@faker-js/faker'

test.describe('homework 2 tests', async () => {
    test.beforeEach(async ({page, baseURL}) => {
        await page.context().addCookies([
            {
                name: 'OptanonAlertBoxClosed',
                value: new Date().toISOString(),
                url: baseURL,
            },
        ]);
        await page.goto('/', { waitUntil: 'domcontentloaded' });
    });
   
    test('testing test', async ({page}) => {
        await page.goto('https://ta-0000-gusa-desktop.gusadev.com/')
    })

    test('Fill email and click Sign Up button on Home page', async ({page, baseURL, dataLayer}) => {
        const email = faker.internet.email();
        //how do you like this xpath below?
        const emailForm = page.locator('//div[contains(@class, "subscribeForm")]//input[@name="email"]')
        await emailForm.scrollIntoViewIfNeeded()
        expect(emailForm).toHaveAttribute("placeholder", "Enter your Email")
        await emailForm.fill(email)
        const signInButton = page.locator('//button//div[text()="Sign Up"]')
        await signInButton.click()
        const a = console.log(await page.evaluate(() => window.dataLayer));
        await test.step('event should fire after scroll to the section', async () => {
            const expectedEvent = {
                "event": "GeneralInteraction",
                "eventCategory": "Footer - D",
                "eventAction": "Newsletter Subscription",
                "eventLabel": "Success",
            };

            const [event] = await dataLayer.waitForDataLayer({
                "event": "GeneralInteraction",
                "eventCategory": "Footer - D",
                "eventAction": "Newsletter Subscription",
            });

            expect(event).toStrictEqual(expectedEvent);
            /**
             * To get all events in console
             */
            const a = console.log(await page.evaluate(() => window.dataLayer));
        });
    })

    test("Click 'My pick' in product card and check that button is clicked in sunglasses page", async ({page, baseURL, dataLayer}) => {
        
        //how do you like this xpath below?
        const button = await page.locator('//span[contains(@class, "menuItem")][text() = "Sunglasses"]')
        await button.click()
        await page.waitForLoadState('load');
        //
        await test.step('check url', () => {
            const url = page.url();
            expect(url).toBe(`${baseURL}sunglasses`);
        });
        
        
        //how do you like this xpath below?
        const myPick = await page.locator('(//div[@data-testid="myPickWrapper"])[1]//div[@aria-label="myPick"]//div');
        const product = await page.locator('[data-test-name="product"]').first();
        const productId = await product.getAttribute('data-test-id');
        //Может лучше использовать такой? [data-testid="myPickWrapper"]
        //Но проблема в том что он отмечает не 1 первый элемент который нам нужен
        // а несколько, вопрос: нужно всегда 
        await myPick.scrollIntoViewIfNeeded()
        await myPick.click();
        await test.step('event should fire after scroll to the section', async () => {
            const expectedEvent = {
                "event": "CategoryInteraction",
                "eventCategory": "Category - D",
                "eventAction": "Product",
                "eventLabel": "Add to Wishlist",
            }

            const [event] = await dataLayer.waitForDataLayer({
                "event": "CategoryInteraction",
                "eventCategory": "Category - D",
                "eventAction": "Product",
            });

            expect(event).toStrictEqual(expectedEvent);
            /**
             * To get all events in console
             */
            const a = console.log(await page.evaluate(() => window.dataLayer));
        });

        await test.step('click wishlist button and check the product list', async () => {
            const wishBtn = await page.locator('//div[@aria-label="View My Picks"]');
            await wishBtn.click();

            const itemId = await page
                //how do you like this xpath below?
                .locator('//ul//li//div[@data-productid]')
                .getAttribute('data-productid');

            expect(itemId).toStrictEqual(productId);
        });
    })
})

