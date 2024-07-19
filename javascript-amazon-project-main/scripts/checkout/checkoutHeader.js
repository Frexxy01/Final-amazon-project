import {calculateCartQuantity} from '../../data/cart.js'
export function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} items`};
