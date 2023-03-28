const container = document.querySelector('#favorites-container');

let fav = JSON.parse(localStorage.getItem("favoriteItems")) || [];

function removeItem(name) {
  console.log(name);
  fav = fav.filter(item => item.name !== name);
  localStorage.setItem("favoriteItems", JSON.stringify(fav));
  console.log(fav);
  showItems(fav);

}

function showItems(fav){

  container.innerHTML = ""

  fav.forEach(item => {
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
            <button class="remove-btn" onclick="removeItem(${item.name})">Remove item</button>
      
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);

    const rmv = card.querySelector(".remove-btn");
    rmv.addEventListener("click", () => removeItem(item.name));

  });
}

showItems(fav);










