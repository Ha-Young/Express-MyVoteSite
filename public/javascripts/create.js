const form = document.querySelector('.voting > form');
const options = form.querySelector('.options');
const dateInput = form.querySelector('input[name=expirationDate]');
const timeInput = form.querySelector('input[name=expirationTime]');
const addOptionButton = form.querySelector('.add-option');
const shortCutButton = form.querySelector('.short-cut');

const MAX_ADDITIONAL_OPTION_COUNT = 3;
const SHORTCUT_TIME = 60 * 60 * 1000;

let additionalOptionCount = 0;

function parseDate(dateObj) {
  const year = '' + dateObj.getFullYear();
  const month = '' + (dateObj.getMonth() + 1);
  const day = '' + dateObj.getDate();
  const hour = '' + dateObj.getHours();
  const minute = '' + dateObj.getMinutes();

  function twoDigits(num) {
    return num.length < 2 ? '0' + num : num;
  }

  return {
    date: [year, twoDigits(month), twoDigits(day)].join('-'),
    time: [twoDigits(hour), twoDigits(minute)].join(':'),
  };
}

function setExpirationTime() {
  const { date: currentDate, time: currentTime } = parseDate(new Date());

  dateInput.setAttribute('value', currentDate);
  dateInput.setAttribute('min', currentDate);

  dateInput.addEventListener('input', function (ev) {
    const { value } = ev.target;

    if (value !== currentDate) {
      timeInput.removeAttribute('min');
    } else {
      timeInput.setAttribute('min', currentTime);
    }
  });

  timeInput.setAttribute('value', currentTime);
  timeInput.setAttribute('min', currentTime);
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

  newDeleteButton.addEventListener('click', function (ev) {
    const currentOption = ev.target.parentNode;
    options.removeChild(currentOption);
    if (--additionalOptionCount < MAX_ADDITIONAL_OPTION_COUNT) {
      addOptionButton.classList.remove('invisible');
    }
  });

  return newOption;
}

addOptionButton.addEventListener('click', function () {
  options.appendChild(createNewOption());
  if (++additionalOptionCount >= MAX_ADDITIONAL_OPTION_COUNT) {
    addOptionButton.classList.add('invisible');
  }
});

shortCutButton.addEventListener('click', function (ev) {
  const now = new Date().getTime();
  const { date, time } = parseDate(new Date(now + SHORTCUT_TIME));

  dateInput.setAttribute('value', date);
  timeInput.setAttribute('value', time);
});

setExpirationTime();
