const optionBox = document.getElementById('options');
const options = document.getElementsByClassName('option');
const createButton = document.getElementById('create');
const resetButton = document.getElementById('reset');

function createOption() {
  const option = makeOption();

  optionBox.appendChild(option);
}

function resetOption() {
  optionBox.textContent = "";

  createOption();
  createOption();
}

function makeOption() {
  const input = document.createElement('input');

  input.type = 'option';
  input.className = 'option';
  input.placeholder = 'write option';
  input.required = true;

  return input;
}

function init() {
  createButton.addEventListener('click', createOption);
  resetButton.addEventListener('click', resetOption);
}

init();
