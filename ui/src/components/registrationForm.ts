import { Component } from '@Core/component';
import {faker} from '@faker-js/faker'

export class RegistrationForm extends Component {
    private LOCATORS = {
        emailInput: this.locator.locator('//input[@name="email"]'),
        firstNameInput: this.locator.locator('//input[@name="firstName"]'),
        lastNameInput: this.locator.locator('//input[@name="lastName"]'),
        passwordInput: this.locator.locator('//input[@name="password"]'),
        submitButton: this.locator.locator('//button[contains(., "Sign Up")]'),
    };

    public async submitForm(): Promise<void> {
        await this.LOCATORS.submitButton.click();
    }

    public async fillEmail(): Promise<void> {
        await this.LOCATORS.emailInput.fill(faker.internet.email());
    }

    public async fillForm(): Promise<void> {
        await this.LOCATORS.firstNameInput.fill(faker.internet.userName());
        await this.LOCATORS.lastNameInput.fill(faker.internet.userName());
        await this.LOCATORS.passwordInput.fill(faker.internet.password());
    }
}
