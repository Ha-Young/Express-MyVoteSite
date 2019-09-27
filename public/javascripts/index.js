(function() {
  var optionBox = document.getElementById('options-box');

  function plusOption() {
    var createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('name', 'options');
    createInput.setAttribute('placeholder', '항목');
    createInput.setAttribute('required', '');
    optionBox.appendChild(createInput);
  }
  function deleteOption() {
    if (optionBox.children.length > 2) {
      optionBox.removeChild(optionBox.lastChild);
    }
  }
  document.getElementById('optionPlus').addEventListener('click', plusOption);

  document.getElementById('optionDel').addEventListener('click', deleteOption);
})();
