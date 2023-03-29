const orderData = JSON.parse(localStorage.getItem('orderData'));

const nameElement = document.getElementById('name');
const addressElement = document.getElementById('address');
const cardNumberElement = document.getElementById('card-number');
const expiryDateElement = document.getElementById('expiry-date');
const cvvElement = document.getElementById('cvv');

nameElement.textContent = "Name: "+ orderData.name;
addressElement.textContent = "Address: "+orderData.address;
cardNumberElement.textContent = "Card Number: "+orderData.cardNumber;
expiryDateElement.textContent = "Expiry Date: "+orderData.expiryDate;
cvvElement.textContent = "CVV: ***" ;
