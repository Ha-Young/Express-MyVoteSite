/* eslint-disable no-undef */
const optionAddBtnElement = document.querySelector(".vote-option-add-btn");
const optionListElement = document.querySelector(".vote-option-list");
const voteCreateFormElement = document.querySelector(".vote-create-form");

const TEMPLATES = window.templates;
const LIMIT_HOUR = 1;
let createFlag = false;

function handleOptionRemoveBtnClick(e) {
  const optionItemElement = e.currentTarget.parentNode;
  const optionListElement = optionItemElement.parentNode;

  optionListElement.removeChild(optionItemElement);
}

function handleOptionAddBtnClick() {
  const newOptionItemElement = document.createElement("li");
  newOptionItemElement.className = "vote-option-item";
  newOptionItemElement.innerHTML = TEMPLATES.voteOptionItemTemplate();

  const removeBtn = newOptionItemElement.querySelector("button");
  removeBtn.addEventListener("click", handleOptionRemoveBtnClick);

  optionListElement.appendChild(newOptionItemElement);
}

function handleVoteCreateSubmit(e) {
  e.preventDefault();

  if (createFlag) {
    return;
  }

  if (checkIsDateTimePast()) {
    alert(
      `만료 날짜를 확인해주세요. 현재 시간보다 ${LIMIT_HOUR}시간 이후의 시간이어야 합니다.`
    );
    return;
  }

  const form = e.target;

  const dummyVoteOptionElement = document.createElement("textarea");
  dummyVoteOptionElement.classList.add("invisible");
  dummyVoteOptionElement.value = JSON.stringify(getOptionObjectList());
  dummyVoteOptionElement.name = "vote_options";

  form.appendChild(dummyVoteOptionElement);

  form.submit();

  createFlag = true;
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

function checkIsDateTimePast() {
  const dateTimeElement = document.querySelector(
    "input[type='datetime-local']"
  );

  const limitDate = new Date();
  limitDate.setHours(limitDate.getHours() + LIMIT_HOUR);

  const dateDiff = new Date(dateTimeElement.value) - limitDate;

  return dateDiff < 0;
}

function voteCreatePageInit() {
  optionAddBtnElement.addEventListener("click", handleOptionAddBtnClick);
  voteCreateFormElement.addEventListener("submit", handleVoteCreateSubmit);
}

voteCreatePageInit();
