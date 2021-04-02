const $votingName = document.querySelector(".votingPage-name");
const $voteButton = document.querySelector(".votingPage-vote-button");
const $voteOptions = document.querySelectorAll(".votingPage-option");
const $cancelVotingButton = document.querySelector(".votingPage-cancel");
const $deleteVotingButton = document.querySelector(".votingPage-delete");
const votingId = $votingName.id;

const submitVoting = (data) => {
  fetch(`/votings/${votingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === "already voted") {
        window.location.replace("/votings/alreadyVoted");
      } else if (res.message === "success voting") {
        window.location.replace("/votings/successVoting");
      }
    });
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
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          // alert
          window.location.replace(window.location.origin);
        }
      });
  });
}

if ($deleteVotingButton) {
  $deleteVotingButton.addEventListener("click", () => {
    fetch(`/votings/${votingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "success") {
          // alert
          window.location.replace(window.location.origin);
        }
      });
  });
}
