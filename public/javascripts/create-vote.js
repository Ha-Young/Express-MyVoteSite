const $removeOption = document.getElementById('remove-option');
const $addOption = document.getElementById('add-option');
const $optionsList = document.getElementById('options-wrapper');
let optionNumber = 2;

$addOption.addEventListener('click', () => {
  const div = document.createElement('div');
  const input = document.createElement('input');

  div.setAttribute('id', `option${optionNumber}`);
  input.setAttribute('type', 'text');
  input.setAttribute('name', `options`);
  input.setAttribute('required', 'true');
  input.setAttribute('placeholder', 'option');
  input.setAttribute('class', 'option-radio');

  if (optionNumber < 5) {
    div.appendChild(input);
    $optionsList.appendChild(div);
    optionNumber++;
  }
});

$removeOption.addEventListener('click', () => {
  if (optionNumber > 2) {
    optionNumber--;

    const child = document.getElementById(`option${optionNumber}`);
    $optionsList.removeChild(child);
  }
});
