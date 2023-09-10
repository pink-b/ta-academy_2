import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class WishList extends Component {
    protected LOCATORS = {
        firstSunglass: this.page.locator('(//div[@data-testid="myPickWrapper"])[1]'),
        product: this.page.locator('[data-test-name="product"]'),
        wishBtn: this.page.locator('//div[@aria-label="View My Picks"]'),
        productId: this.page.locator('//div[@data-productid]')
    };

    protected ATTRIBUTES = {
        itemAttribute: 'data-productid'
    }

    public async getProductIdInWishList(): Promise<string> {
        await this.LOCATORS.wishBtn.click()
        const itemId = await this.LOCATORS.productId.getAttribute(this.ATTRIBUTES.itemAttribute)
        return await itemId || 'Error, no itemId';
    }
}
