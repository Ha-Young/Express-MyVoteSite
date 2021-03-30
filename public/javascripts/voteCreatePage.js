/* eslint-disable no-undef */
const optionAddBtnElement = document.querySelector(".vote-option-add-btn");
const optionListElement = document.querySelector(".vote-option-list");
const voteCreateFormElement = document.querySelector(".vote-create-form");

function handleOptionRemoveBtnClick(e) {
  const optionItemElement = e.currentTarget.parentNode;
  const optionListElement = optionItemElement.parentNode;

  optionListElement.removeChild(optionItemElement);
}

function handleOptionAddBtnClick() {
  const newOptionItemElement = document.createElement("li");
  newOptionItemElement.className = "vote-option-item";
  newOptionItemElement.innerHTML = voteOptionItemTemplate();

  const removeBtn = newOptionItemElement.querySelector("button");
  removeBtn.addEventListener("click", handleOptionRemoveBtnClick);

  optionListElement.appendChild(newOptionItemElement);
}

function handleVoteCreateSubmit(e) {
  e.preventDefault();

  const form = e.target;

  const dummyVoteOptionElement = document.createElement('textarea');
  dummyVoteOptionElement.value = JSON.stringify(getOptionObjectList());
  dummyVoteOptionElement.name = "vote_options";

  form.appendChild(dummyVoteOptionElement);

  form.submit();
}

function getOptionObjectList() {
  const optionItemList = Array.from(optionListElement.querySelectorAll("li"));

  return optionItemList.map(optionItem => {
    const optionInputElement = optionItem.querySelector("input");
    return {
      title: optionInputElement.value,
    };
  });
}

function voteCreateInit() {
  optionAddBtnElement.addEventListener("click", handleOptionAddBtnClick);
  voteCreateFormElement.addEventListener("submit", handleVoteCreateSubmit);
}

voteCreateInit();
