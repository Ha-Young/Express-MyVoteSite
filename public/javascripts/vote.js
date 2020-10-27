const $addButton = document.getElementById('option-add-btn');
const $optionsList = document.getElementById('options-list');
// const $optionInput = document.getElementById('option-field');
// const $deleteButton = document.querySelectorAll('.option-delete-btn');
// const $options = document.querySelectorAll('.created-option');


$addButton.addEventListener('click', (e) => {
  const input = document.createElement('input');
  const button = document.createElement('button');
  const deleteMessage = document.createTextNode('Delete');

  e.preventDefault();

  $optionsList.appendChild(input);
  input.className = 'created-option';
  input.setAttribute('name', 'options');
  $optionsList.appendChild(button);
  button.className = 'option-delete-btn';
  button.appendChild(deleteMessage);

  // $optionInput.value = '';
});

// FIXME: delete button 처리....
// for(let i = 0; i < $options.length; i++) {
//   $deleteButton[i].addEventListener('click', (e) => {
//     e.preventDefault();
//     $optionsList.removeChild($options[i]);
//   });
// }
