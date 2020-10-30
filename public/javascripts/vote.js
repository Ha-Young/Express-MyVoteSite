const $addButton = document.getElementById('option-add-btn');
const $optionsList = document.getElementById('options-list');

$addButton.addEventListener('click', e => {
  const input = document.createElement('input');
  const button = document.createElement('button');
  const deleteMessage = document.createTextNode('-');

  e.preventDefault();

  $optionsList.appendChild(input);
  input.className = 'created-option';
  input.setAttribute('name', 'options');
  $optionsList.appendChild(button);
  button.className = 'option-delete-btn';
  button.setAttribute('type', 'button');
  button.appendChild(deleteMessage);
});
