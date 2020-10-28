const addOptionButton = document.querySelector('.addOptionButton');

addOptionButton.addEventListener('click', (event) => {
  event.preventDefault();
  
  const newInput = document.createElement('input');
  const existInput = document.getElementsByName('options')[1];
  newInput.setAttribute('name', 'options');

  existInput.parentNode.insertBefore(newInput, existInput);
});
