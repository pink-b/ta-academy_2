import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class SignUpInput extends Component {
    protected LOCATORS = {
        signUpButton: this.page.locator('//div[text()="Sign Up"]/parent::button')
    };

    public async moveToSignUpForm() {
        await this.page.waitForLoadState('load');
        await this.locator.scrollIntoViewIfNeeded()
    }
    
    public async fillFromAndSignIn() {
        await this.locator.fill(faker.internet.email())
        await this.LOCATORS.signUpButton.click()
    }
}
