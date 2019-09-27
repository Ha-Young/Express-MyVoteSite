const addOptionButton = document.querySelector('.add-option-button');
let count = 2;

addOptionButton.addEventListener('click', () => {
  const optionDiv = document.createElement('div');
  const optionInput = document.createElement('input');
  const deleteButton = document.createElement('button');
  const options = document.querySelectorAll('.option-input');

  if (options.length > 2) {
    alert('5개까지 입력 가능합니다.');
  } else {
    optionDiv.setAttribute('class', 'option-div');
    optionInput.setAttribute('class', 'option-input');
    optionInput.setAttribute('name', 'options');
    optionInput.setAttribute('placeholder', '항목을 입력해주세요 :D');
    deleteButton.setAttribute('class', 'option-delete-button');
    deleteButton.textContent = 'X';
    optionDiv.appendChild(optionInput);
    optionDiv.appendChild(deleteButton);
    document.getElementById('option-list').appendChild(optionDiv);
    deleteButton.addEventListener('click', ev => {
      ev.currentTarget.parentNode.remove();
    });
    count++;
  }
});
