const $voteCards = document.getElementsByClassName("voteCard");

for (let $voteCard of $voteCards) {
  $voteCard.addEventListener("click", (event) => {
    window.location.href = `/votings/${$voteCard.id}`;
  });
}
