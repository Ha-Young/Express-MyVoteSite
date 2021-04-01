const $voteCards = document.getElementsByClassName("voteCard");
const $deleteButtons = document.getElementsByClassName("deleteButton");

for (let $voteCard of $voteCards) {
  $voteCard.addEventListener("click", (event) => {
    window.location.href = `/votings/${$voteCard.id}`;
  });
}

for (let $deleteButton of $deleteButtons) {
  $deleteButton.addEventListener("click", (event) => {
    const targetVoteId = $deleteButton.getAttribute("voteId");
    fetch(`/votings/${targetVoteId}`, {
      method: "DELETE",
    }).then(result => {
      console.log(result);
      window.location.href = "/";
    }).catch((err) => {
      console.error(err);
    });
  });
}

// TODO: creator인 사용자의 card에는 특별한 버튼을 추가해준다.
