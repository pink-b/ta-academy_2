import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Footer extends Component {
    protected LOCATORS = {
        createAccountButton: this.locator.locator('a', { hasText: 'Create Account' }),
        myAccountDropDownMenu : this.page.locator('//li[contains(., "My Account")]'),
        sunglassesNavEl: this.page.locator('//header//a[contains(., "Sunglasses")]')
    }

    public async clickToCreateAccountButton(): Promise<void> {
        await this.LOCATORS.createAccountButton.click()
    }

    public async clickToMyAccountButton(): Promise<void> {
        await this.LOCATORS.myAccountDropDownMenu.click()
    }

    public async moveToSunglassesPage(): Promise<void> {
        await this.LOCATORS.sunglassesNavEl.click()
        await this.page.waitForLoadState('load');
    }
}