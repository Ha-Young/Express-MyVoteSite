const items = document.querySelector('.items');
const addItem = document.querySelector('.addItem');
const removeItem = document.querySelector('.removeItem');

let itemCount = items.childElementCount;

addItem.addEventListener('click', event => {
  event.preventDefault();
  if (itemCount < 5) {
    ++itemCount;
    const item = document.createElement("input");
    item.setAttribute('type', 'text');
    item.setAttribute('name', 'items');
    items.appendChild(item);
  }
});

removeItem.addEventListener('click', event => {
  event.preventDefault(); 
  if (itemCount > 2) {
    --itemCount;
    items.removeChild(items.lastChild);
  }
});
