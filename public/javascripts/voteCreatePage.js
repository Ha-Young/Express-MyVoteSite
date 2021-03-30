/* eslint-disable no-undef */
const optionAddBtnElement = document.querySelector(".vote-option-add-btn");
const optionListElement = document.querySelector(".vote-option-list");

function handleOptionRemoveBtnClick(e) {
  const optionItemElement = e.currentTarget.parentNode;
  const optionListElement = optionItemElement.parentNode;

  optionListElement.removeChild(optionItemElement);
}

function handleOptionAddBtnClick(e) {
  const newOptionItemElement = document.createElement("li");
  newOptionItemElement.className = "vote-option-item";
  newOptionItemElement.innerHTML = voteOptionItemTemplate();

  const removeBtn = newOptionItemElement.querySelector("button");
  removeBtn.addEventListener("click", handleOptionRemoveBtnClick);

  optionListElement.appendChild(newOptionItemElement);
}

function voteCreateInit() {
  optionAddBtnElement.addEventListener("click", handleOptionAddBtnClick);
}

voteCreateInit();
