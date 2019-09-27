let buttonAddOption = document.querySelector('#add-options-button')
let buttonDeleteOption = document.querySelectorAll('.delete-option');

buttonAddOption.addEventListener('click', addOptions);
buttonDeleteOption.forEach((deleteOptionElement) => {
  deleteOptionElement.addEventListener('click', deleteOption);
})

setMinimumDateAndTime();

function addOptions() {
  var newOption = document.createElement('li');
  newOption.classList.add('options-list-item');
  newOption.innerHTML = '<input type="text" name="optionElements" required> <i class="far fa-trash-alt" onclick=deleteOption(event)></i>';
  document.querySelector('.options-list').appendChild(newOption);
}

function deleteOption(e) {
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
}

function setMinimumDateAndTime() {
  let today = new Date(),
    day = today.getDate(),
    month = today.getMonth() + 1,
    year = today.getFullYear()
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  today = year + '-' + month + '-' + day;
  document.querySelector('#date-input').setAttribute('min', today);
}