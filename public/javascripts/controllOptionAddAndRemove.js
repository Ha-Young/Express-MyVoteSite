const $optionsContainer = document.querySelector(".options-container");

const $optionAddButton = document.querySelector(".option-add-btn");
const $optionRemoveButton = document.querySelector(".option-remove-btn");

function handleOptionAdd() {
  const optionCount = $optionsContainer.childElementCount;

  if (optionCount > 9) {
    return;
  }

  const $input = document.createElement("input");
  $input.type = "text";
  $input.name = "options";

  $optionsContainer.appendChild($input);
}

function handleOptionRemove() {
  const optionCount = $optionsContainer.childElementCount;
  const $lastInput = $optionsContainer.lastChild;

  if (optionCount < 3) {
    return;
  }

  $optionsContainer.removeChild($lastInput);
}

$optionAddButton.addEventListener("click", handleOptionAdd);
$optionRemoveButton.addEventListener("click", handleOptionRemove);
