const deleteVotingButton = document.querySelector(".delete-voting-button");

function requestDelete(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", url);
  xhr.send(null);

  xhr.addEventListener("load", function () {
    console.log(xhr.responseText);
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
