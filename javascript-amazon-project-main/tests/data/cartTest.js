import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js"
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

describe('test suite: addToCart', () => {
  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'setItem')

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',  
      quantity: 1,
      deliveryOptionId: '1'
        }]);
    });
    loadFromStorage(); 

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',  
        quantity: 2,
        deliveryOptionId: '1'
          }
    ]))
  });
  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'setItem')

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  }); 
});
describe('test suite: removeFromCart', () => {
  
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
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
  
})
  it('it removes the correct productId', () => {
    loadFromStorage();
    removeFromCart(productId1);
    expect(cart.length).toEqual(1);
    removeFromCart('random');
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
  });

});

describe('test suite: updateDeliveryOption', () => {
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
  });
  it('Basic test case: update the 1st product to the 2nd option.', () => {
    updateDeliveryOption(productId1, '2');
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it('handles non existent productIds', () => {
    updateDeliveryOption('incorrect', '1')
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});