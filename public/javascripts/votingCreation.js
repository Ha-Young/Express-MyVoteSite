const plusButton = document.querySelector('.add-item-button');

plusButton.addEventListener('click', eventHandler);

function eventHandler() {
  const selectionInputsContainer = document.querySelector('.selection-input-container');
  const input = document.createElement('input');

  input.setAttribute('name', 'options');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'option-input');

  selectionInputsContainer.appendChild(input);
}
