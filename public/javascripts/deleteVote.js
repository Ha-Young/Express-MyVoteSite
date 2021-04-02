const deleteVotingButton = document.querySelector(".delete-voting-button");

function requestDelete(url) {
  fetch(url, {
    method: "DELETE",
    body: null
  });
}

function deleteVoting(e) {
  e.stopPropagation();

  const voteId = e.target.id;
  const url = "http://localhost:3000/votings/" + voteId;

  requestDelete(url);
}

function init() {
  deleteVotingButton.addEventListener("click", deleteVoting);
}

init();
