const cont = document.querySelector('#search-container');

function search(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  const query = document.querySelector('input[name="query"]').value; // Get the value of the search input

  // Redirect to the search results page with the query parameter
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;

}


const query = decodeURIComponent(new URLSearchParams(window.location.search).get('q'));



function searchItems(searchTerm) {
  fetch('/Code/database.json')
    .then(response => response.json())
    .then(data => {

      const matchingItems = [];

      if (searchTerm.toLowerCase() === "beer") {
        data.beers.forEach(item => {
          matchingItems.push(item);
        });

      } else if (searchTerm.toLowerCase() === "rum") {
        data.rum.forEach(item => {
          matchingItems.push(item);
        });
      } else if (searchTerm.toLowerCase() === "whiskey") {
        data.whiskey.forEach(item => {
          matchingItems.push(item);
        });
      } else if (searchTerm.toLowerCase() === "vodka") {
        data.vodka.forEach(item => {
          matchingItems.push(item);
        });
      } else if (searchTerm.toLowerCase() === "wine") {
        data.wine.forEach(item => {
          matchingItems.push(item);
        });
      } else if (searchTerm.toLowerCase() === "coolers") {
        data.coolers.forEach(item => {
          matchingItems.push(item);
        });
      }
      else {

        data.beers.forEach(item => {
          if (item.name.includes(searchTerm) || item.description.includes(searchTerm)) {
            matchingItems.push(item);
          }
        });
        data.whiskey.forEach(item => {
          if (item.name.includes(searchTerm) || item.description.includes(searchTerm)) {
            matchingItems.push(item);
          }
        });
        data.rum.forEach(item => {
          if (item.name.includes(searchTerm) || item.description.includes(searchTerm)) {
            matchingItems.push(item);
          }
        });
        data.coolers.forEach(item => {
          if (item.name.includes(searchTerm) || item.description.includes(searchTerm)) {
            matchingItems.push(item);
          }
        });
        data.vodka.forEach(item => {
          if (item.name.includes(searchTerm) || item.description.includes(searchTerm)) {
            matchingItems.push(item);
          }
        });
        data.wine.forEach(item => {
          if (item.name.includes(searchTerm) || item.description.includes(searchTerm)) {
            matchingItems.push(item);
          }
        });
      }

      if(matchingItems.size === 0){
        console.log("EDFASF");
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.maxWidth = '540px';
        card.innerHTML = `
          <div class="handy">
            <h1>Nothing to show here, SORRY</h1>
          </div>
        `
    
      }else{
        renderItems(matchingItems);
      }
      const sortSelect = document.querySelector('.sort-select');
      sortSelect.addEventListener('change', (event) => {
        const sortOption = event.target.value;
        items = sortItems(items, sortOption);
        renderItems(items);
      });


    })
    .catch(error => console.error(error));
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


function renderItems(items) {
  cont.innerHTML = '';
  items.forEach(item => {

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

    cont.appendChild(card);

    const addToFavoritesBtn = card.querySelector(".add-to-favorites");
    addToFavoritesBtn.addEventListener("click", () => addToFavorites(item));

    const addToCartBtn = card.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", () => addToCart(item));

  });
}


searchItems(query);