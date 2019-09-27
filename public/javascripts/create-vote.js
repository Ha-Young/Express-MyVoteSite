const $removeOption = document.getElementById('remove-option');
const $endDate = document.getElementById('end-date');
const $addOption = document.getElementById('add-option');
const $optionsList = document.getElementById('options-wrapper');
let optionNumber = 2;

const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();
let hour = today.getHours() + 5;

if (month < 10) {
  month = `0${month}`;
}
if (day < 10) {
  day = `0${day}`;
}
if (hour > 23) {
  day = Number(day) + 1;
  hour -= 24;
}
if (hour < 10) {
  hour = `0${hour}`;
}

const minTime = `${year}-${month}-${day}T${hour}:00`;

$endDate.setAttribute('min', minTime);
$endDate.setAttribute('value', minTime);

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
