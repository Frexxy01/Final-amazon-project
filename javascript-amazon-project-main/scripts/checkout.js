import { cart, removeFromCart, calculateCartQuantity, updateQuantity, saveToStorage} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productID = cartItem.productId;

  let matchingProduct;
  
  products.forEach((productItem) => {
    if (productItem.id === productID) {
      matchingProduct = productItem;
    }
  });
  updateCartQuantity();
  cartSummaryHTML +=
  `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
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
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productID = link.dataset.productId;
    removeFromCart(productID);
    const container = document.querySelector(`.js-cart-item-container-${productID}`)
    container.remove();
    updateCartQuantity();
  });
});
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} items`;}

document.querySelectorAll('.js-update-quantity').forEach((link) => {
  const productID = link.dataset.productId;
  link.addEventListener('click',() => {
    console.log(productID);
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

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      updateCartQuantity();
      container.classList.remove('is-editing-quantity');
    } else {
      alert('Enter a valid quantity!')
    }
  });
});