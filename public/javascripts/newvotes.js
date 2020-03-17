const closeButton = document.querySelector('.title > span');
const addButton = document.querySelector('.add-button');
const optionDiv = document.querySelector('.options > div');

closeButton.addEventListener('click', () => {
  history.back();
});

let counter = 2;

addButton.addEventListener('click', () => {
  const optionInputField = document.createElement('input');

  optionInputField.setAttribute('type', 'text');
  optionInputField.setAttribute('placeholder', '항목 입력');
  optionInputField.setAttribute('name', `option${counter}`);
  optionInputField.classList.add('option');

  counter++;

  optionDiv.appendChild(optionInputField);
});
