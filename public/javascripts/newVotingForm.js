const $optionsContainer = document.querySelector('.options-container');
const $optionBlock = document.querySelector('.option-block');
const $addButton = document.querySelector('.add-button');
const $subtractButton = document.querySelector('.subtract-button');
const $optionMessage = document.querySelector('.option-message');

$addButton.addEventListener('click', function () {
  $optionMessage.textContent = '';
  $optionsContainer.appendChild(generateOptionBlock());
});

$subtractButton.addEventListener('click', function () {
  $optionMessage.textContent = '';

  if ($optionsContainer.childElementCount <= 2) {
    $optionMessage.textContent = 'options should be exist at least 2'
    return;
  }

  $optionsContainer.removeChild($optionsContainer.lastElementChild);
});


function generateOptionBlock() {
  if ($optionsContainer.childElementCount >= 8) {
    $optionMessage.textContent = 'CANNOT make options over than 8'
    return;
  }

  const $list = document.createElement('li');
  const $label = document.createElement('label');
  const $input = document.createElement('input');

  $list.classList.add('option-block', 'form-input-material');
  $label.setAttribute('for', `option${$optionsContainer.childElementCount + 1}`);
  $label.textContent = 'Option';
  $input.classList.add('option', 'form-control-material')
  $input.setAttribute('type', 'text');
  $input.setAttribute('name', 'option');
  $input.setAttribute('id', `option${$optionsContainer.childElementCount + 1}`);
  $input.setAttribute('placeholder', ' ');
  $input.setAttribute('required', '');
  $list.appendChild($label);
  $list.appendChild($input);

  return $list;
}
