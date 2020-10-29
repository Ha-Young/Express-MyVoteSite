const $addButton = document.getElementById('option-add-btn');
const $optionsList = document.getElementById('options-list');
// const $optionInput = document.getElementById('option-field');
// const $deleteButton = document.querySelectorAll('.option-delete-btn');
// const $options = document.querySelectorAll('.created-option');


$addButton.addEventListener('click', (e) => {
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

// FIXME: delete button 처리 완료시키기

// $deleteButton.addEventListener('click', () => {
//   for(let i = 0; i < $options.length; i++) {
//     console.log($options[i])
//     $optionsList.removeChild($options[i]);
//   }
// });

