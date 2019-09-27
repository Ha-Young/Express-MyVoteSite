(function () {
  var $selectionList = document.querySelector('.selection-list');
  var $addButton = document.querySelector('.selection-add-btn');
  var $removeButton = document.querySelector('.selection-remove-btn');

  $addButton.addEventListener('click', function(e) {
    e.preventDefault();

    var $newSelection = document.createElement('div');
    var $newInput = document.createElement('input');

    $newInput.setAttribute('type', 'text');
    $newInput.setAttribute('name', 'selections');
    $newInput.setAttribute('autocomplete', 'off');

    $newSelection.appendChild($newInput);
    $newSelection.classList.add('selection');

    $selectionList.appendChild($newSelection);
  });

  $removeButton.addEventListener('click', function(e) {
    e.preventDefault();
    var $selections = document.querySelectorAll('.selection');
    if ($selections.length < 3) {
      return;
    }
    $selectionList.removeChild($selectionList.lastChild);
  });

})();
