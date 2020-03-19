const closeButton = document.querySelector('#close-button');
const addButton = document.querySelector('.add-button');
const optionDiv = document.querySelector('.options > div');

closeButton.addEventListener('click', () => {
  location.assign(location.origin);
});

let counter = 3;

addButton.addEventListener('click', () => {
  const optionInputField = document.createElement('input');

  optionInputField.setAttribute('type', 'text');
  optionInputField.setAttribute('placeholder', '항목 입력');
  optionInputField.setAttribute('name', `option${counter}`);
  optionInputField.classList.add('option');

  counter++;

  optionDiv.appendChild(optionInputField);
});

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
  window.location.reload();
});