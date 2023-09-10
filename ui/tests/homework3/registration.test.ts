import { test, expect } from '@Test';
import { faker } from '@faker-js/faker';

test.use({ trace: 'on' });

test.describe('Check registration', () => {
    const testData = {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
    };
    test('create account and check user data', async ({
        baseURL,
        homePage,
        accountPage,
        page,
        dataLayer,
    }) => {
        await homePage.open();
        await page.waitForLoadState('load');
        await homePage.Header.clickCreateAccount();
        await homePage.RegistrationForm.fillEmail();
        await homePage.RegistrationForm.submitForm();
        await homePage.RegistrationForm.fillForm();
        await homePage.RegistrationForm.submitForm();
        await test.step('event should fire after form submit', async () => {
            const expectedEvent = {
                event: 'GeneralNonInteraction',
                eventCategory: 'Login',
                eventAction: 'Login Status',
                eventLabel: 'Registered - Email',
            };

            await expect(async () => {
                const [event] = await dataLayer.waitForDataLayer({
                    event: 'GeneralNonInteraction',
                    eventCategory: 'Login',
                    eventAction: 'Login Status',
                });

                expect(event).toStrictEqual(expectedEvent);
            }).toPass();
        });
        await homePage.Header.clickWelcomeBtn();
        await homePage.Header.clickAccountLink();
        const url = page.url();
        expect(url).toBe(`${baseURL}customer/account`);
        await accountPage.profileSideBar.myAccountDetailButtonClick();
        await accountPage.myAccountDetails.clickEditInformation();
        await accountPage.myDetailsForm.fillFirstName(testData.firstName);
        await accountPage.myDetailsForm.fillLastName(testData.lastName);
        await accountPage.myDetailsForm.clickSaveBtn();
        await test.step('check updated values in My Details form', async () => {
            const updateValues = {
                firstName: await accountPage.myDetailsForm.getValueFirstName(),
                lastName: await accountPage.myDetailsForm.getValueLastName(),
            };

            expect(testData).toEqual(updateValues);

            await accountPage.myDetailsForm.clickCloseBtn();
        });

        await test.step('check updated values in My Details section', async () => {
            await accountPage.profileSideBar.myAccountDetailButtonClick();

            const detailValues = {
                firstName: await accountPage.myAccountDetails.getFirstName(),
                lastName: await accountPage.myAccountDetails.getLastName(),
            };
            console.log(JSON.stringify(testData) + ' and ' + JSON.stringify(detailValues));
            expect(testData).toEqual(detailValues);
        });
    });
});
