import { test, expect } from '@Test';
import { faker } from '@faker-js/faker';

test.describe('Sign up on home page test', async () => {
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

    test('Fill email and click Sign Up button on Home page', async ({page, baseURL, dataLayer, homePage}) => {
        const email = faker.internet.email();
        await page.waitForLoadState('load');
        const emailForm = await page.locator('//div[contains(@class, "subscribeForm")]//input[@name="email"]')
        await emailForm.scrollIntoViewIfNeeded()
        await emailForm.fill(email)
        const signInButton = await page.locator('//div[text()="Sign Up"]')
        await signInButton.click()
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
        });
    })


})