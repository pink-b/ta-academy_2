import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Header extends Component {
    protected LOCATORS = {
        myAccountDropDownMenu: this.page.locator('//li[contains(., "My Account")]'),
        myAccountBtn: this.locator.locator('//button[contains (., "My Account")]'),
        createAccountButton: this.locator.locator('//a[contains(., "Create Account")]'),
        welcomeBtn: this.locator.locator('//button[contains (., "Welcome")]'),
        accountLink: this.locator.locator(
            '//a[contains(@href, "/customer/account")][text()="My Account"]'
        ),
        myPicksIconCount: this.locator.locator(
            '//button[@type="button"]/div[@aria-label="View My Picks"]/span'
        ),
        wishListBtn: this.locator.locator('//button[div[contains(@aria-label, "View My Picks")]]'),
    };

    public async clickToCreateAccountButton(): Promise<void> {
        await this.LOCATORS.createAccountButton.click();
    }

    public async clickToMyAccountButton(): Promise<void> {
        await this.LOCATORS.myAccountDropDownMenu.click();
    }

    public async moveToSunglassesPage(): Promise<void> {
        // await this.LOCATORS.
    }

    public async clickCreateAccount(): Promise<void> {
        await this.LOCATORS.myAccountBtn.click();
        await this.LOCATORS.createAccountButton.waitFor({ state: 'visible' });
        await this.LOCATORS.createAccountButton.click();
    }

    public async clickWelcomeBtn(): Promise<void> {
        await this.LOCATORS.welcomeBtn.click();
    }

    public async clickAccountLink(): Promise<void> {
        await this.LOCATORS.accountLink.waitFor({ state: 'visible' });
        await this.LOCATORS.accountLink.click();
    }

    public async myPicksIconCountIsVisible(): Promise<boolean> {
        return await this.LOCATORS.myPicksIconCount.isVisible();
    }

    public async clickWishListBtn(): Promise<void> {
        await this.LOCATORS.wishListBtn.waitFor({ state: 'visible' });
        await this.LOCATORS.wishListBtn.click();
    }

    public async clickToCreateAccountButton(): Promise<void> {
        //await this.page.waitForSelector('a[class="sc-kgoiZj iEmPZC accountDropdown__authButton___1Qa_j bordered"]')
        await this.LOCATORS.createAccountButton.waitFor({ state: 'visible' });
        await this.LOCATORS.createAccountButton.click();
    }

    public async clickToMyAccountButton(): Promise<void> {
        await this.locator.click();
    }
}
