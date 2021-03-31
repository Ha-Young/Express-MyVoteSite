(function () {
  const currentDate = new Date();
  const votes = document.querySelector(".votes");

  for (let i = 0; i < votes.children.length; i++) {
    const expiredAt = votes.children[i].children[2].textContent;
    const voteState = votes.children[i].children[3];

    if (new Date(expiredAt) < currentDate) {
      voteState.textContent = "만료";
    } else {
      voteState.textContent = "진행중";
    }
  }
})()
