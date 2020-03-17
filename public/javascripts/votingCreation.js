const plusButton = document.querySelector('.add-item-button');

plusButton.addEventListener('click', eventHandler);

function eventHandler() {
  const selectionInputs = document.querySelectorAll('.selection-input');
  const selectionInputsContainer = document.querySelector('.selection-input-container');
  const input = document.createElement('input');

  input.setAttribute('name', 'selection');
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'selection-input');

  selectionInputsContainer.appendChild(input);
}
