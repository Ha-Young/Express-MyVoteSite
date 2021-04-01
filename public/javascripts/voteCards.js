const $voteCards = document.getElementsByClassName("voteCard");

for (let $voteCard of $voteCards) {
  $voteCard.addEventListener("click", (event) => {
    window.location.href = `/votings/${$voteCard.id}`;
  });
}

// TODO: creator인 사용자의 card에는 특별한 버튼을 추가해준다.
