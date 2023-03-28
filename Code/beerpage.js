
const contain = document.querySelector('#cards-container');
const favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];

fetch('/Code/database.json')
  .then(response => response.json())
  .then(data => {
 
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

              <p class="beer-price">Price: ${item.price}</p>
              <p class="beer-quantity">Quantity: ${item.quantity}</p>
              <p class="beer-size">Size: ${item.size}</p>
              <p class="alcohol-content">Alc %: ${item.alc}</p>
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

    });
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
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }

  