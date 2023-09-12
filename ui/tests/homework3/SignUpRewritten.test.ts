import { test, expect } from '@Test';
import { faker } from '@faker-js/faker';

test.describe('Sign up in footer test', async () => {
    test('Fill email and click Sign Up button on Home page', async ({page, baseURL, dataLayer, homePage}) => {
        await homePage.open()
        await homePage.SignInForm.moveToSignUpForm()
        await homePage.SignInForm.fillFromAndSignIn()
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

