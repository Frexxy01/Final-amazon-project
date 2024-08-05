import {orders} from "../data/orders.js"
import {formatCurrency} from '../scripts/utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { products, loadProducts, getProduct } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";



loadProducts(renderYourOrders)
let ordersHTML = '';
console.log(orders)
function renderYourOrders() {
orders.forEach((order) => {
  let productsHTML = '';
  (order.products).forEach((product) => {
    console.log('order')
    let productId = product.productId
    let productDetails = getProduct(productId)
    
    productsHTML += `
    <div class="product-image-container">
      <img src="${productDetails.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${productDetails.name}
      </div>
      <div class="product-delivery-date">
        ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-quantity">
        Quantity: 1
      </div>
      <button class="buy-again-button button-primary js-buy-again-button"
      data-product-id="${productDetails.id}">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button> 
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=${order.id}&productId=${productDetails.id}">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
    `
  })
  let datestring = dayjs(order.orderTime).format('MMMM D')

  ordersHTML += `
  <div class="order-container">
    
  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${datestring}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${formatCurrency(order.totalCostCents)}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${order.id}</div>
    </div>
  </div>

  <div class="order-details-grid">
    ${productsHTML}
  </div>
</div>
  `

})
document.querySelector('.js-orders-grid').innerHTML = ordersHTML
document.querySelectorAll('.js-buy-again-button').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId
    addToCart(productId);
    updateCartQuantity();
  })
})
}
