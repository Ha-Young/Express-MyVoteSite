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

    $selectionList.appendChild($newSelection);
  });

  $removeButton.addEventListener('click', function(e) {
    e.preventDefault();
    //2개 이상 input으로 고정시키기
    var $selections = document.querySelectorAll('.selection');
    console.log($selections)
    console.log($selections.length);
    if ($selections.length < 2) {
      return;
    }
    $selectionList.removeChild($selectionList.lastChild);
  });

})();
