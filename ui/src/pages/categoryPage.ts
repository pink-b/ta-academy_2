import { Container } from '@Core/container';
import type { Locator } from '@playwright/test';
import { Product } from '@Components/product';
import { WishList } from '@Components/wishList';

export class CategoryPage extends Container {
    protected LOCATORS = {
        product: this.page.locator('[data-test-name="product"]'),
        footer: this.page.locator('//footer[contains(., "Live Chat" )]'),
        firstSunglasses: this.page.locator('(//div[@data-testid="myPickWrapper"])[1]')
    };

    public Product = new Product(this.LOCATORS.firstSunglasses, this.page)
    public WishList = new WishList(this.page.locator(''), this.page)

    public async open(
        url: 'contact-lenses' | 'sunglasses' | 'eyeglasses-collection'
    ): Promise<void> {
        await this.page.goto(`/${url}`, { waitUntil: 'domcontentloaded' });
    }

    public async scrollProducts(): Promise<void> {
        await this.LOCATORS.footer.scrollIntoViewIfNeeded();
    }

    public async getProducts(): Promise<Locator[]> {
        return await this.LOCATORS.product.all();
    }
}
