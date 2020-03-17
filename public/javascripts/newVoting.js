const items = document.querySelector('.items');
const addItem = document.querySelector('.addItem');
const removeItem = document.querySelector('.removeItem');

let itemNum = items.childElementCount;

addItem.addEventListener('click', () => {
  const item = document.createElement("input");
  
  item.setAttribute('type', 'text'); 
  item.setAttribute('name', `name${itemNum + 1}`); 
  items.appendChild(item);
});
