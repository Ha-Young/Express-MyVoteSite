const $options = document.querySelector(".option-wrap");
const $optionContainer = document.querySelector(".option-container");
const $optionInput = document.querySelector(".option");

const $optionAddingBtn = document.querySelector(".option-adding-btn");
const $optionDeleteBtns = document.getElementsByClassName("option-delete-btn");
const $optionDeleteBtnList = Array.from($optionDeleteBtns);

$optionAddingBtn.addEventListener("click", handleOptionAddingBtnClick);

function setAttributes(el, attrs) {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

$optionDeleteBtnList.forEach(btn => btn.addEventListener("click", handleOptionDeleteBtnClick));

function handleOptionAddingBtnClick(e) {
  e.preventDefault();
  const newOptionContainer = document.createElement("div");
  const newOptionInput = document.createElement("input");
  const newDeleteBtn = document.createElement("button");

  setAttributes(newOptionInput,
    { "class": "option", "type": "text", "name": "votingOption", "placeholder": "New Option" });
  newOptionContainer.classList.add("option-container");
  newDeleteBtn.classList.add("option-delete-btn");
  newDeleteBtn.textContent = "X";
  newDeleteBtn.addEventListener("click", handleOptionDeleteBtnClick)
  newOptionContainer.appendChild(newOptionInput);
  newOptionContainer.appendChild(newDeleteBtn);
  $options.appendChild(newOptionContainer);
}

// delete 하나만 지우는거.. 왜 e.currentTarget 안먹음?
function handleOptionDeleteBtnClick(e) {
    e.preventDefault();
    console.log(e.currentTarget, "~~~~~~~")
    e.currentTarget.parentNode.remove();
    return
}

