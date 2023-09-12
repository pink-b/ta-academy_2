import { Component } from '@Core/component';

export class ProfileSideBar extends Component {
    protected LOCATORS = {
        myDetailButton: this.locator.locator('[data-id="myDetails"]'),
    };

    public async myAccountDetailButtonClick(): Promise<void> {
        await this.LOCATORS.myDetailButton.waitFor({ state: 'visible' });
        await this.LOCATORS.myDetailButton.click();
    }
}
