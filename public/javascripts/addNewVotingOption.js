const addOptionButton = document.getElementById('add-option');

addOptionButton.addEventListener('click', createOptionField);

function createOptionField() {
  const newOptionField = document.createElement('input');
  const br = document.createElement('br');
  const optionsDiv = document.getElementById('options');

  newOptionField.setAttribute('type', 'text');
  newOptionField.setAttribute('name', 'options');
  newOptionField.setAttribute('autocomplete', 'off');

  optionsDiv.appendChild(newOptionField);
  optionsDiv.appendChild(br);
}
