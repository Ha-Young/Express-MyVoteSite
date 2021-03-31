const $voteCards = document.getElementsByClassName("voteCard");

for (let $voteCard of $voteCards) {
  $voteCard.addEventListener("click", (event) => {
    window.location.href = `/voting/${$voteCard.id}`;
  });
}
