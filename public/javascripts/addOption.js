const addOptionButton = document.querySelector('.option-add-button');
addOptionButton.addEventListener('click', handleClick);

function handleClick () {
  const optionsWrapper = document.querySelector('.options-wrapper');
  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.name = "userOptions"

  optionsWrapper.appendChild(newInput);
}
