import formatCurrency from "../scripts/utils/money.js";
console.log('test suite: FormatCurrency');


console.log('Convert cents into dollars')

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Handles 0')
if (formatCurrency(0) ==='0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Handling rounding up:')

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}