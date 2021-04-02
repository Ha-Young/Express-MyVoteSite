const $voteCards = document.getElementsByClassName("voteCard");
const $deleteButtons = document.getElementsByClassName("deleteButton");

for (let $voteCard of $voteCards) {
  $voteCard.addEventListener("click", () => {
    window.location.href = `/votings/${$voteCard.id}`;
  });
}

for (let $deleteButton of $deleteButtons) {
  $deleteButton.addEventListener("click", () => {
    const targetVoteId = $deleteButton.getAttribute("voteId");

    fetch(`/votings/${targetVoteId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/";
    }).catch(() => {
      alert("에러가 발생했습니다! 다시 시도해 주세요!");
      window.location.href = "/";
    });
  });
}
