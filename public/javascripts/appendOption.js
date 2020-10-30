const plusPollButton = document.getElementById('plus-option');
const pollForm = document.getElementById('poll-selector');

plusPollButton.addEventListener('click', () => {
  const inputOption = document.createElement('input');

  inputOption.id = 'poll-option';
  inputOption.type = 'text';
  inputOption.name = 'option';
  inputOption.placeholder = '항목 입력';
  inputOption.autocomplete = 'off';

  pollForm.appendChild(inputOption);
});
