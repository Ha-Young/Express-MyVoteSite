(function () {
  const currentDate = new Date();
  const votes = document.querySelector(".votes");
  const showChart = document.querySelector(".show-chart");
  const formContainer = document.querySelector(".form-container");

  for (let i = 0; i < votes.children.length; i++) {
    const expiredAt = votes.children[i].children[2].textContent;
    const voteState = votes.children[i].children[3];

    if (new Date(expiredAt) < currentDate) {
      voteState.textContent = "만료";
      if (formContainer) formContainer.className = "hidden";
    } else {
      voteState.textContent = "진행중";
      if (showChart) showChart.className = "hidden";
    }
  }
})();
