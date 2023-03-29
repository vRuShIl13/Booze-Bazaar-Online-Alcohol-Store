const urlParams = new URLSearchParams(window.location.search);
const total = urlParams.get('total');
document.querySelector('.total h2:nth-child(2)').innerText = `Total: $${total}`;