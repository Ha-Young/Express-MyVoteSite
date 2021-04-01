/* eslint-disable no-undef */
const pageBackBtnElement = document.querySelector(".vote-info-back-btn");

function handlePageBackBtnClick(e) {
  window.history.back();
}

function voteDetailPageInit() {
  pageBackBtnElement.addEventListener("click", handlePageBackBtnClick);
}

voteDetailPageInit();
