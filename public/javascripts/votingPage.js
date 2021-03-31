const $votingName = document.querySelector(".voting-name");
const $voteButton = document.querySelector(".voting-vote-button");
const $voteOptions = document.querySelectorAll(".voting-option");
const $cancelVotingButton = document.querySelector(".voting-cancel");
const $deleteVotingButton = document.querySelector(".voting-delete");
const votingId = $votingName.id;

const submitVoting = (data) => {
  fetch(`/votings/${votingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => window.location.reload());
};

if ($voteButton) {
  $voteButton.addEventListener("click", () => {
    const data = {};

    $voteOptions.forEach((option, index) => {
      if (option.checked) {
        data.choice = option.value;
        data.number = index + 1;
      }
    });

    submitVoting(data);
  });
}

if ($cancelVotingButton) {
  $cancelVotingButton.addEventListener("click", () => {
    fetch(`/votings/${votingId}/cancel`, {
      method: "PATCH",
    }).then((res) => window.location.reload());
  });
}

if ($deleteVotingButton) {
  $deleteVotingButton.addEventListener("click", () => {
    fetch(`/votings/${votingId}`, {
      method: "DELETE",
    }).then((res) => window.location.replace("/"));
  });
}
