
const contain = document.querySelector('#cards-container');
let favoriteItems = JSON.parse(localStorage.getItem("favoriteItem")) || [];
let cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];

fetch('/Code/database.json')
  .then(response => response.json())
  .then(data => {

    let items = data.beers;
    renderItems(items);

    const sortSelect = document.querySelector('.sort-select');
    sortSelect.addEventListener('change', (event) => {
      const sortOption = event.target.value;
      items = sortItems(items, sortOption);
      renderItems(items);
    });

    function renderItems(items) {
      contain.innerHTML = '';
      data.beers.forEach(item => {

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

              <p class="beer-price">Price: $${item.price}</p>
              <p class="beer-quantity">Quantity: ${item.quantity}</p>
              <p class="beer-size">Size: ${item.size}</p>
              <p class="alcohol-content">Alc %: ${item.alc}%</p>
              <p class="beer-description">${item.description}</p>
              <div class = "buttons">
                <button class="btn btn-outline-primary hover  add-to-favorites btn-sm">Add to Favorites</button>
                <button class="btn btn-outline-success add-to-cart btn-sm">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      `

        contain.appendChild(card);

        const addToFavoritesBtn = card.querySelector(".add-to-favorites");
        addToFavoritesBtn.addEventListener("click", () => addToFavorites(item));

        const addToCartBtn = card.querySelector(".add-to-cart");
        addToCartBtn.addEventListener("click", () => addToCart(item));

      });
    }
    function sortItems(items, sortOption) {
      switch (sortOption) {
        case 'price-asc':
          return items.sort((a, b) => a.price - b.price);
        case 'price-desc':
          return items.sort((a, b) => b.price - a.price);
        case 'name-asc':
          return items.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
          return items.sort((a, b) => b.name.localeCompare(a.name));
        case 'alc-asc':
          return items.sort((a, b) => a.alc - b.alc);
        case 'alc-desc':
          return items.sort((a, b) => b.alc - a.alc);
        case 'size-asc':
          return items.sort((a, b) => a.size - b.size);
        case 'size-desc':
          return items.sort((a, b) => b.size - a.size);
        default:
          return items;
      }
    }

  })
  .catch(error => console.error(error));



function addToFavorites(item) {
  let isItemExists = false;

  favoriteItems.forEach(favoriteItem => {
    if (favoriteItem.name === item.name) {
      isItemExists = true;
    }
  });

  if (!isItemExists) {
    favoriteItems.push(item);
  }

  console.log(favoriteItems);
  localStorage.setItem("favoriteItem", JSON.stringify(favoriteItems));
}



function addToCart(item) {
  let isItemExists = false;

  cartItems.forEach(cartItem => {
    if (cartItem.name === item.name) {
      isItemExists = true;
    }
  });

  if (!isItemExists) {
    cartItems.push(item);
  }

  console.log(cartItems);
  localStorage.setItem("cartItem", JSON.stringify(cartItems));
}

