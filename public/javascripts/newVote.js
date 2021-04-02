const addOptionButton = document.querySelector('.add-option-btn');
const optionText = document.querySelector('.add-option-text');
const optionsList = document.querySelector('.options');
const submitButton = document.querySelector('.submit-button');

const MAX_INPUT = 10;
let inputCount = 0;

function handleClick() {
  if (inputCount >= MAX_INPUT) {
    return;
  }

  const list = document.createElement('li');
  const input = document.createElement('input');

  input.setAttribute('name', 'options');
  input.setAttribute('type', 'text');
  input.setAttribute('value', optionText.value);

  list.appendChild(input);

  optionsList.appendChild(list);
  optionText.value = '';
  inputCount++;

  if (inputCount > 1) {
    submitButton.disabled = false;
  }
}

addOptionButton.addEventListener('click', handleClick);

const addOptionInput = document.querySelector('.add-option');
