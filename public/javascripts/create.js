const form = document.querySelector('.voting > form');
const options = form.querySelector('.options');
const addOptionButton = form.querySelector('.add-option');

const MAX_ADDITIONAL_OPTION_COUNT = 3;
let additionalOptionCount = 0;

function setExpirationTime() {
  const date = form.querySelector('input[name=expiration-date]');
  const time = form.querySelector('input[name=expiration-time]');
  const now = new Date();

  const year = '' + now.getFullYear();
  const month = '' + (now.getMonth() + 1);
  const day = '' + now.getDate();
  const hour = '' + now.getHours();
  const minute = '' + now.getMinutes();

  const twoDigits = num => (num.length < 2 ? '0' + num : num);

  const currentDate = [year, twoDigits(month), twoDigits(day)].join('-');
  const currentTime = [twoDigits(hour), twoDigits(minute)].join(':');

  date.setAttribute('value', currentDate);
  date.setAttribute('min', currentDate);

  date.addEventListener('input', ev => {
    const { value } = ev.target;

    if (value !== currentDate) {
      time.removeAttribute('min');
    } else {
      time.setAttribute('min', currentTime);
    }
  });

  time.setAttribute('value', currentTime);
  time.setAttribute('min', currentTime);
}

function createNewOption() {
  const newOption = document.createElement('div');
  newOption.classList.add('additional-option');

  const newInput = document.createElement('input');
  newInput.setAttribute('id', 'option');
  newInput.setAttribute('name', 'option');
  newInput.setAttribute('type', 'text');

  const newDeleteButton = document.createElement('i');
  newDeleteButton.classList.add('far', 'fa-trash-alt');

  newOption.append(newInput, newDeleteButton);

  newDeleteButton.addEventListener('click', ev => {
    const currentOption = ev.target.parentNode;
    options.removeChild(currentOption);
    if (--additionalOptionCount < MAX_ADDITIONAL_OPTION_COUNT) {
      addOptionButton.classList.remove('invisible');
    }
  });

  return newOption;
}

addOptionButton.addEventListener('click', () => {
  options.appendChild(createNewOption());
  if (++additionalOptionCount >= MAX_ADDITIONAL_OPTION_COUNT) {
    addOptionButton.classList.add('invisible');
  }
});

setExpirationTime();
