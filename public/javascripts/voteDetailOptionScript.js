/* eslint-disable no-undef */
const voteOptionElementList = document.querySelectorAll(".vote-option-checkbox");
const voteBtnElement = document.querySelector(".vote-submit-btn");

function selectOnlyThis(e) {
  const optionLength = voteOptionElementList.length;
  const targetOptionElement = e.target;
  const isAreadyCheck = !targetOptionElement.checked;

  for (let i = 0; i < optionLength; i++) {
    document.getElementById("checkbox-" + i).checked = false;
  }

  if (isAreadyCheck) {
    targetOptionElement.checked = false;
    voteBtnElement.classList.remove("visible");
  } else {
    targetOptionElement.checked = true;
    voteBtnElement.classList.add("visible");
  }
}

function setVoteOptionsClickEvent() {
  for (const voteOptionElement of voteOptionElementList) {
    voteOptionElement.addEventListener("click", selectOnlyThis);
  }
}

function voteDetailOptionInit() {
  setVoteOptionsClickEvent();
}

voteDetailOptionInit();
