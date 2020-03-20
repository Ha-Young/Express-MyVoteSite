const options = document.querySelector('.options');
const buttonAdd = document.querySelector('.button-add');
const buttonRemove = document.querySelector('.button-remove');

buttonAdd.addEventListener('click', () => {
  const input = document.createElement('input');

  input.type = 'text';
  input.name = 'options';
  input.className = 'input-style';

  const inputs = options.querySelectorAll('input');

  if (inputs.length < 5) options.appendChild(input);
});

buttonRemove.addEventListener('click', () => {
  const inputs = options.querySelectorAll('input');
  if (inputs.length > 2) options.removeChild(inputs[inputs.length - 1]);
});
