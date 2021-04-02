const $optionsContainer = document.querySelector(".options-container");
const $addOptionBtn = document.querySelector(".add-option");
const $deleteOptionBtn = document.querySelector(".delete-option");

const addOption = () => {
  const newOption = document.createElement("input");

  newOption.setAttribute("type", "text");
  newOption.setAttribute("name", "options");
  newOption.setAttribute("placeholder", "항목을 입력하세요");
  newOption.setAttribute("class", "form__input");
  newOption.setAttribute("class", "createVoting-form__input");
  newOption.setAttribute("class", "input-options");

  $optionsContainer.appendChild(newOption);
};

const deleteOption = () => {
  const $allOptions = document.querySelectorAll(".input-options");

  if ($allOptions.length > 2) {
    const lastOption = $allOptions[$allOptions.length - 1];

    $optionsContainer.removeChild(lastOption);
  }
};

$addOptionBtn.addEventListener("click", addOption);
$deleteOptionBtn.addEventListener("click", deleteOption);
