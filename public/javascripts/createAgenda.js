const addOptionButton = document.querySelector('.optionAdd');
let count = -1;

addOptionButton.addEventListener('click', function(event) {
  event.preventDefault();
  const optionInput = document.querySelector('.optionInput').value;

  if (optionInput.length < 1) return alert('내용을 입력해주세요');

  addElement(optionInput);
  document.querySelector('.optionInput').value = '';
});

function addElement(text) {
  count++;
  const optionList = document.querySelector('.optionList');
  const newDiv = document.createElement('div');
  const newInput = document.createElement('input');
  newDiv.classList.add('option' + count);
  newInput.value = text;
  newInput.name = 'option';

  const newButton = document.createElement('button');
  newButton.textContent = 'delete';
  newButton.classList.add('option' + count);

  newButton.addEventListener('click', function(event) {
    event.preventDefault();
    const target = document.querySelector('.'+ event.target.className);
    optionList.removeChild(target);
  });

  newDiv.appendChild(newInput);
  newDiv.appendChild(newButton);
  optionList.appendChild(newDiv);
}
