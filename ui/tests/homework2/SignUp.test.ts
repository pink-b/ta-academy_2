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

    test('Fill email and click Sign Up button on Home page', async ({page, baseURL, dataLayer}) => {
        const email = faker.internet.email();
        //how do you like this xpath below?
        const emailForm = page.locator('//div[contains(@class, "subscribeForm")]//input[@name="email"]')
        await emailForm.scrollIntoViewIfNeeded()
       
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
      
            const a = console.log(await page.evaluate(() => window.dataLayer));
        });
    })

    
})

