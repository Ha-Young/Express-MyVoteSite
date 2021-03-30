/* eslint-disable no-undef */
const optionAddBtnElement = document.querySelector(".vote-option-add-btn");
const optionListElement = document.querySelector(".vote-option-list");
const voteCreateFormElement = document.querySelector(".vote-create-form");

const LIMIT_HOUR = 1;

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

  if (checkIsDateTimePast()) {
    alert(`만료 날짜를 확인해주세요. 현재 시간보다 ${LIMIT_HOUR}시간 이후의 시간이어야 합니다.`);
    return;
  }

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

function checkIsDateTimePast() {
  const dateTimeElement = document.querySelector("input[type='datetime-local']");

  console.log('checking time...', dateTimeElement.value);
  const limitDate = new Date();
  limitDate.setHours(limitDate.getHours() + LIMIT_HOUR);

  console.log(limitDate);

  const dateDiff = new Date(dateTimeElement.value) - limitDate;
  console.log('dateDiff', dateDiff);

  return dateDiff < 0;
}

function voteCreateInit() {
  optionAddBtnElement.addEventListener("click", handleOptionAddBtnClick);
  voteCreateFormElement.addEventListener("submit", handleVoteCreateSubmit);
}

voteCreateInit();
