const $options = document.querySelector(".option-wrap");
const $optionContainer = document.querySelector(".option-container");
const $optionInput = document.querySelector(".option");
const $optionAddingBtn = document.querySelector(".option-adding-btn");
const $optionDeleteBtns = document.getElementsByClassName("option-delete-btn");
const $optionDeleteBtnList = Array.from($optionDeleteBtns);

$optionAddingBtn.addEventListener("click", handleOptionAddingBtnClick);
$optionDeleteBtnList.forEach(btn => btn.addEventListener("click", handleOptionDeleteBtnClick));

function setAttributes(element, attrs) {
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
}

function handleOptionAddingBtnClick(e) {
  e.preventDefault();

  const newOptionContainer = document.createElement("div");
  const newOptionInput = document.createElement("input");
  const newDeleteBtn = document.createElement("button");

  setAttributes(
    newOptionInput,
    { "class": "option",
      "type": "text",
      "name": "votingOption",
      "placeholder": "New Option",
    }
  );

  newOptionContainer.classList.add("option-container");
  newDeleteBtn.classList.add("option-delete-btn");
  newDeleteBtn.textContent = "X";
  newDeleteBtn.addEventListener("click", handleOptionDeleteBtnClick);

  newOptionContainer.appendChild(newOptionInput);
  newOptionContainer.appendChild(newDeleteBtn);
  $options.appendChild(newOptionContainer);
}

function handleOptionDeleteBtnClick(e) {
  e.preventDefault();

  e.currentTarget.parentNode.remove();
  return;
}
