import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption, calculateDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from "./paymentSummary.js";
import {updateCartQuantity} from "./checkoutHeader.js";


export function renderOrderSummary() {

  let cartSummaryHTML = '';


  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);
    
    updateCartQuantity();

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);


    const today = dayjs();


    const noWeekend = calculateDeliveryOption(deliveryOption, today);
    const dateString = noWeekend.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML +=
    `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label">${cartItem.quantity}</span>
            </span>
  
            <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input">
            <span class="save-quantity-input link-primary js-save-quantity-input" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link js-delete-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = ''

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = calculateDeliveryOption(deliveryOption, today);
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );
      const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)}  -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId

      html += `
      <div class="delivery-option js-delivery-options"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}- Shipping
          </div>
        </div>
      </div>
    `
    });
    return html;
  };

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productID = link.dataset.productId;
      removeFromCart(productID);
      renderOrderSummary();
      renderPaymentSummary();
      updateCartQuantity();
    });
  });

  document.querySelectorAll('.js-update-quantity').forEach((link) => {
    const productID = link.dataset.productId;
    link.addEventListener('click',() => {

      const container = document.querySelector(`.js-cart-item-container-${productID}`);
      container.classList.add('is-editing-quantity')
    })
  });

  document.querySelectorAll('.js-save-quantity-input').forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener('click', () => {
      const savedQuantity =(document.querySelector('.js-quantity-input')).value;

      const finalSavedQuantity = parseInt(savedQuantity, 10)
      console.log(typeof finalSavedQuantity)
      if (finalSavedQuantity >= 0 && finalSavedQuantity <= 1000) {

        document.querySelector('.js-quantity-label').
        innerHTML = finalSavedQuantity;

        console.log(productId);

        console.log(finalSavedQuantity);

        updateQuantity(productId, finalSavedQuantity);

        
        renderOrderSummary();
        renderPaymentSummary();
        

      } else {
        alert('Enter a valid quantity!') 
      }
    });
  });

  document.querySelectorAll('.js-delivery-options').forEach((element) => {
    element.addEventListener('click', () => {
      console.log('Yes')
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

