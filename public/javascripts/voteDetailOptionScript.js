/* eslint-disable no-undef */
const voteOptionElementList = document.querySelectorAll(".vote-option-checkbox");
const voteBtnElement = document.querySelector(".vote-submit-btn");

const API_VOTE = window.api.vote;
const LOGIN_UTIL = window.myLoginController;
const PATH_UTIL = window.myPathController;

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

function getCheckedOptionId() {
  const optionLength = voteOptionElementList.length;

  for (let i = 0; i < optionLength; i++) {
    const voteOptionCheckboxElement = document.getElementById("checkbox-" + i);
    if (voteOptionCheckboxElement.checked) {
      return voteOptionCheckboxElement.dataset.optionid;
    }
  }
}

function setVoteOptionsClickEvent() {
  for (const voteOptionElement of voteOptionElementList) {
    voteOptionElement.addEventListener("click", selectOnlyThis);
  }
}

function goToLoginPage() {
  const loginPageURL = PATH_UTIL.getRootPath() + "/login";
  window.location.href = loginPageURL;
}

async function voteToOption() {
  const optionId = getCheckedOptionId();

  const voteId = window.location.pathname.split("/votings/")[1];

  const { result, error, areadyVoted } = await API_VOTE.voteToOption({ voteId, optionId });

  if (result) {
    return alert("투표 성공!");
  }

  if (areadyVoted) {
    return alert("이미 투표하셨습니다.");
  }

  if (error) {
    return alert(error);
  }
}

function handleVoteBtnElementClick() {
  if (!LOGIN_UTIL.checkLogin()) {
    return goToLoginPage();
  }

  voteToOption();
}

function voteDetailOptionInit() {
  setVoteOptionsClickEvent();
  voteBtnElement.addEventListener("click", handleVoteBtnElementClick);
}

voteDetailOptionInit();
