const container = document.querySelector('#carts-container');

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
let subtotal = 0;
function removeItem(name) {
  console.log(name);
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  console.log(cart);
  showItems(cart);

}

function showItems(cart){

  container.innerHTML = "";

  cart.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.style.maxWidth = '540px';
    card.innerHTML = `
      <div class="row g-0 mt-2">
        <div class="col-md-4">
          <img src="${item.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-bod">
            <h1 class="beer-name">Name: ${item.name}</h1>

            <p class="beer-price">Price per Item: ${item.price}</p>
            <p class="beer-quantity">
            Quantity: ${item.howMany} 
            <input type="number" class = "quantity" placeHolder = "Enter a number"
            min="1">

            <p class="beer-total">
              Total: $ ${item.price * (item.howMany || 1)}
            </p>
            <p class="beer-size">Size: ${item.size}</p>
            <p class="alcohol-content">Alc %: ${item.alc}%</p>

            <button class="remove-btn" onclick="removeItem(${item.name})">Remove item</button>

          </div>
        </div>
      </div>
    `;
    
    container.appendChild(card);

    const rmv = card.querySelector(".remove-btn");
    rmv.addEventListener("click", () => removeItem(item.name));

    const qty = card.querySelector(".quantity");
    qty.addEventListener("change", (event) => {
      updateQuantity(item, parseInt(event.target.value));
    });

  });

  const total = cart.reduce((acc, item) => {
    return acc + item.price * (item.howMany || 1);
  }, 0);

  container.insertAdjacentHTML("beforeend", `
    <div class="total">
    <h2>Sub Total: $ ${total}</h2>
      <button type="button" class = "bbt" onclick="window.location.href='checkout.html?total=${total}'">Proceed to Checkout</button>
      
    </div>
  `);


}

showItems(cart);

function updateQuantity(item, quantity) {
  item.howMany = quantity;
  localStorage.setItem("cartItems", JSON.stringify(cart));
  showItems(cart);
}