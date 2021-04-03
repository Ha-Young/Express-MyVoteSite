const $optionBox = document.getElementById('options');
const $options = document.getElementsByClassName('option');
const $resetButton = document.getElementById('form-reset');
const $createButton = document.getElementById('option-create');
const $deleteButton = document.getElementById('option-delete');
const $messageBox = document.getElementById('form-message');

function createOption() {
  const length = $options.length;

  if (length === 5) {
    $messageBox.textContent = 'Option is full.';

    return;
  }

  const option = makeOption();

  $optionBox.appendChild(option);
  $messageBox.textContent = '';
}

function deleteOption() {
  const leng = $options.length;

  if (leng === 2) {
    $messageBox.textContent = 'Option least 2.';

    return;
  }

  $optionBox.removeChild($optionBox.lastElementChild);
  $messageBox.textContent = '';
}

function resetOption() {
  $optionBox.textContent = '';

  createOption();
  createOption();
}

function makeOption() {
  const input = document.createElement('input');

  input.type = 'option';
  input.name = 'option';
  input.className = 'option';
  input.placeholder = 'write option';
  input.required = true;

  return input;
}

function init() {
  $createButton.addEventListener('click', createOption);
  $deleteButton.addEventListener('click', deleteOption);
  $resetButton.addEventListener('click', resetOption);
}

init();
