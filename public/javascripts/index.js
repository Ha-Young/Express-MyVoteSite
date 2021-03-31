const createVotingButton = document.querySelector(".create-voting-button");

const handleCreateVotingButton = (e) => {
  window.location.href = "/votings/new";
};

createVotingButton.addEventListener("click", handleCreateVotingButton);
