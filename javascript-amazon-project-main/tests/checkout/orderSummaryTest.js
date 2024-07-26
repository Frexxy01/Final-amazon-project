import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage} from "../../data/cart.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";


describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    `;

  spyOn(localStorage, 'getItem').and.callFake(() => {
    return JSON.stringify(
      [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]
    );
  });
  loadFromStorage(); 
  renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
    document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain('Quantity: 1');
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText).toContain('Socks');
    expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText).toContain('Basketball')
    expect((document.querySelector(`.js-product-price`)).innerText).toContain('$')
  });
    it('removes a product', () => {
     

    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(
      cart.length
    ).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

   
    });
  it('updates the deliveryoption correctly', () => {
    const deliveryOptions = document.querySelectorAll(`.js-delivery-option-input-${productId1}`)

    const thirdDeliveryOption = deliveryOptions[2]

    thirdDeliveryOption.click();

    expect(thirdDeliveryOption.checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart[0].productId).toEqual(productId1);
    expect((document.querySelector('.js-total-money')).innerText).toEqual('$63.50')
    expect((document.querySelector('.js-shipping-money')).innerText).toEqual('$14.98')
  });
});