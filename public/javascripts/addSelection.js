
const $containerSelections = document.getElementById('selections');
const $addSelectionButton = document.getElementById('add-selection-button');

$addSelectionButton.addEventListener('click', () => {
  const newLabel = document.createElement('label');
  const newInput = document.createElement('input');

  const existingNumOfSelections = $containerSelections.childElementCount;

  newLabel.setAttribute('htmlFor', `selection${existingNumOfSelections + 1}`);
  const text = document.createTextNode(`Selection ${existingNumOfSelections + 1}`);

  newInput.setAttribute('type', 'text');
  newInput.setAttribute('id', `selection${existingNumOfSelections + 1}`);
  newInput.setAttribute('name', 'selections');
  newInput.setAttribute('placeholder', `selection ${existingNumOfSelections + 1}`);

  newLabel.appendChild(text);
  newLabel.appendChild(newInput);
  $containerSelections.appendChild(newLabel);
});
