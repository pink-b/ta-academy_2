import { Component } from '@Core/component';
import type { Locator } from '@playwright/test';

export class Product extends Component {
    protected LOCATORS = {
        firstSunglass: this.page.locator('(//div[@data-testid="myPickWrapper"])[1]'),
        product: this.page.locator('[data-test-name="product"]')
    };

    protected ATTRIBUTES = {
        productId: 'data-test-id'
    }

    public async clickMyPick(): Promise<string> {
        const product = await this.LOCATORS.product.first();
        const productId = await product.getAttribute(this.ATTRIBUTES.productId);
        await this.LOCATORS.firstSunglass.scrollIntoViewIfNeeded()
        await this.LOCATORS.firstSunglass.click()
        
            return await productId || 'Error, no productId';
        
        
    }
}
