const $optionsContainer = document.querySelector(".options-container");

const $optionAddButton = document.querySelector(".option-add-btn");
const $optionRemoveButton = document.querySelector(".option-remove-btn");

function handleOptionAdd() {
  const $input = document.createElement("input");
  $input.type = "text";
  $input.name = "option";

  $optionsContainer.appendChild($input);
}

function handleOptionRemove() {
  const $input = $optionsContainer.querySelector("input");
  $optionsContainer.removeChild($input);
}

$optionAddButton.addEventListener("click", handleOptionAdd);
$optionRemoveButton.addEventListener("click", handleOptionRemove);
