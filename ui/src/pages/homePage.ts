import { FeaturedIn } from '@Components/featuredIn';
import { Header } from '@Components/header';
import { MyAccountDropDownMenuComponent } from '@Components/myAccountDropDownMenu';
import { Container } from '@Core/container';
import { SignUpInput } from '@Components/signUpInput';
import {RegistrationForm} from "@Components/registrationForm";

export class HomePage extends Container {
    protected LOCATORS = {
        featuredIn: this.page.locator('//section[contains(., "As featured in.")]'),
        myAccountEl: this.page.locator('//div[contains(@class, "myAccountAndOrders")]'),
        myAccountDropDownMenu : this.page.locator('//span[text()="My Account"]'),
        emailForm: this.page.locator('//input[@name="email"]'),
        registrationForm: this.page.locator('[id="form-popup-register"]'),
        header: this.page.locator('//header'),
        footer: this.page.locator('//footer'),
    };

    public FeaturedIn = new FeaturedIn(this.LOCATORS.featuredIn, this.page);
    public myAccountDropDownMenu = new MyAccountDropDownMenuComponent(this.LOCATORS.myAccountDropDownMenu, this.page);
    public Header = new Header(this.LOCATORS.myAccountDropDownMenu, this.page)
    public SignInForm = new SignUpInput(this.LOCATORS.emailForm, this.page)
    public RegistrationForm = new RegistrationForm(this.LOCATORS.registrationForm, this.page)

    public async open(): Promise<void> {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }

}
