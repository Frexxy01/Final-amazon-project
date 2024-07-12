export const cart = []
export function addtoCart(productId, cart) {
  let matchingItem;
    
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId,
      quantity: selectedQuantity
    });
  }
}