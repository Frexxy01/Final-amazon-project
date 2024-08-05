import { getProduct, loadProducts, products } from "../data/products.js";
import {orders, getOrder} from "../data/orders.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let trackingHTML = '';
loadProducts(renderTrackingHTML)

function renderTrackingHTML() {
  const url = new URL(window.location.href);
  const orderId =  url.searchParams.get('orderId')
  const productId = url.searchParams.get('productId')
  const product = getProduct(productId)
  const order = getOrder(orderId)
  let productInsideOrder; 
  (order.products).forEach((product) => {
    if (product.productId = productId) {
      productInsideOrder = product
    }
  })
  console.log(order)
  const datestring = dayjs(productInsideOrder.estimatedDeliveryTime).format('dddd, MMMM D')
  const deliveryProgress = calculateDeliveryTime(order.orderTime, productInsideOrder.estimatedDeliveryTime)
  console.log(deliveryProgress)
  

  trackingHTML += `
  <a class="back-to-orders-link link-primary" href="orders.html">
  View all orders
</a>

<div class="delivery-date">
  Arriving on ${datestring}
</div>

<div class="product-info">
  ${product.name}
</div>

<div class="product-info">
  Quantity: ${productInsideOrder.quantity}
</div>

<img class="product-image" src=${product.image}>

<div class="progress-labels-container">
  <div class="progress-label">
    Preparing
  </div>
  <div class="progress-label current-status">
    Shipped
  </div>
  <div class="progress-label">
    Delivered
  </div>
</div>

<div class="progress-bar-container">
  <div style="width:${deliveryProgress + 5}%" class="progress-bar"></div>
</div>
  `
  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

function calculateDeliveryTime(orderTime, deliveryTime) {
  const currentTime = dayjs()
  let differenceOne = dayjs(currentTime).diff(orderTime, 'day')
  let differenceTwo = dayjs(deliveryTime).diff(orderTime, 'day')
  return ((differenceOne) / (differenceTwo)) * 100
}

