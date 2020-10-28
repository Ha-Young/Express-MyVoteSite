const addOptionButton = document.querySelector('.addOptionButton');
const optionValue = document.getElementsByClassName('optionValue');

addOptionButton.addEventListener('click', event => {
  event.preventDefault();

  const node = document.createElement('input');

  node.setAttribute('name', 'options');
  document.querySelector('.option-container').appendChild(node);
});
