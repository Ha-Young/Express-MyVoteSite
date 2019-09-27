var $addListButtonWrapper = document.querySelector('#add-list-button-wrapper');
var $optionList = document.querySelector('#option-list');

function addList() {
  var $li = document.querySelector('#list-model');
  var clonedLi = $li.cloneNode(true);
  clonedLi.id = '';
  clonedLi.querySelector('input').name = 'option';

  $optionList
    .insertBefore(clonedLi, $addListButtonWrapper)
    .classList.replace('hide', 'show');
}
$addListButtonWrapper.addEventListener('click', addList);
