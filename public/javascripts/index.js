const optionContainer = document.querySelector('.new-option-container');
const optionAdder = document.querySelector('.add-option');

const newOption = () => {
  const div = document.createElement('div');
  const input = document.createElement('input');
  
  input.type = 'text';
  input.placeholder = '투표 선택사항';
  input.name = 'selections';
  input.className = 'textbox';

  div.appendChild(input);
  return div;
};

optionAdder.addEventListener('click', () => {
  optionContainer.appendChild(newOption());
});
