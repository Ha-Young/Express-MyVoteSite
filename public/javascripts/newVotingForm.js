const optionsContainer = document.querySelector('.options-container');
const option = document.querySelector('.option');
const addButton = document.querySelector('.add-button');

addButton.addEventListener('click', function () {
  const clone = option.cloneNode(true);
  let name = clone.lastElementChild.id;
  name = name.sub
  clone.lastElementChild.id = clone.lastElementChild.id.substring(0,)
  optionsContainer.appendChild(clone);
});
