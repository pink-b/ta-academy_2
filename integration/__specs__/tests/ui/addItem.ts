import { Mock } from '@Core/mock';
import { CartPage } from '@Components/cartPage/cartPage';
import { GetCartItemsMock } from '@Mocks/api/mockio/v1/id/get';
import { faker } from '@faker-js/faker';

describe('Check adding a new item to cart', () => {
    const mock = Mock.getInstance();
    let cartPage: CartPage;

    beforeAll(() => {
        cartPage = new CartPage();
        mock.addMocks(new GetCartItemsMock());
    });

    afterAll(() => {
        cartPage.destroy();
        mock.close();
    });

    test('Item should be added', async () => {
        await cartPage.fulfill();

        const cartList = await cartPage.getCartList();
        const cartItemsLength = await cartList.getCartItemsCount();

        await cartPage.clickAddCartItemBtn();

        const cartModal = await cartPage.getModal();
        const cartForm = cartModal.getForm();


        const productName = faker.commerce.productName();
        const productPrice = faker.commerce.price({ min: 0.01 });
        const productQuantity = faker.number.int({ min: 1, max: 100 }).toString();

        cartForm.fillForm(productName, productPrice, productQuantity);
        await cartForm.submitForm();

        const updatedCartItemsLength = await cartList.getCartItemsCount();

        reporter.startStep('Item quantity should be increased by one');
        expect(updatedCartItemsLength).toBe(cartItemsLength + 1);
        reporter.endStep();

        const [item] = await cartList.getCartItems();
        const itemName = await item.getName();
        const itemPrice = await item.getPrice();
        const itemQuantity = await item.getQuantity();

        reporter.startStep('Item name should be correct');
        expect(itemName).toBe(productName);
        reporter.endStep();

        reporter.startStep('Item price should be correct');
        expect(itemPrice).toBe(parseInt(productPrice));
        reporter.endStep();

        reporter.startStep('Item quantity should be correct');
        expect(itemQuantity).toBe(parseInt(productQuantity));
        reporter.endStep();

        await item.deleteItem();

        const finalCartItemsLength = await cartList.getCartItemsCount();

        reporter.startStep('Cart items length should be back to original');
        expect(finalCartItemsLength).toBe(cartItemsLength);
        reporter.endStep();
    });
});