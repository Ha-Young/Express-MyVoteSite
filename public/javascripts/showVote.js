const voteList = document.querySelector(".vote-list");

function getVoteId(e) {
  const target = e.target.id;
}

function init() {
  voteList.addEventListener("click", getVoteId);
}

init();