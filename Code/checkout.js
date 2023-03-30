const urlParams = new URLSearchParams(window.location.search);
const total = urlParams.get('total');
document.querySelector('.total h2:nth-child(2)').innerText = `Total: $${total}`;

console.log(total);

document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();
    window.location.href=`orderConfirmation.html?total=${total}`;

 });



 const form = document.getElementById('checkout-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiryDate = document.getElementById('card-expiry').value;
  const cvv = document.getElementById('card-cvv').value;

  const orderData = {
    name,
    address,
    cardNumber,
    expiryDate,
    cvv
  };

  localStorage.setItem('orderData', JSON.stringify(orderData)); 
});

