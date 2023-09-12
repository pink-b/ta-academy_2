import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class MyAccountDropDownMenuComponent extends Component {
    protected LOCATORS = {
        createAccountButton: this.locator.locator('//a[contains(., "Create Account")]'),
    };

    public async clickToCreateAccountButton(): Promise<void> {
        //await this.page.waitForSelector('a[class="sc-kgoiZj iEmPZC accountDropdown__authButton___1Qa_j bordered"]')
        await this.LOCATORS.createAccountButton.waitFor({ state: 'visible' });
        await this.LOCATORS.createAccountButton.click();
    }

    public async clickToMyAccountButton(): Promise<void> {
        await this.locator.click();
    }
}
