export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option
    }
  });

  return deliveryOption || deliveryOptions[0];
};

export function calculateDeliveryOption(deliveryOption, today) {
  let deliveryDate = today;
  let remainingDays = deliveryOption.deliveryDays;
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');
    if (deliveryDate.format('dddd') !== 'Saturday' && deliveryDate.format('dddd') !== 'Sunday') {
      remainingDays--;
    }
  }
  return deliveryDate;
}