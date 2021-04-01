const myVotingList = document.querySelector(".my-voting-list");

function requestDelete(url) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", url);
  xhr.send(null);

  xhr.addEventListener("load", function () {
    console.log(xhr.responseText);
  });
}

function deleteVoting(e) {
  console.log("test");
  e.stopPropagation();

  const targetClassName = e.target.classList[0];
  if (targetClassName !== "delete-vote-button") {
    return;
  }

  const voteId = e.target.parentElement.id;
  const url = "http://localhost:3000/votings/" + voteId;

  requestDelete(url);
}

function init() {
  myVotingList.addEventListener("click", deleteVoting);
}

init();