const $voteButton = document.querySelector(".voting-vote-button");
const $voteOptions = document.querySelectorAll(".voting-option");
const votingId = $voteButton.id;

const submitVoting = async (data) => {
  try {
    await fetch(`/votings/${votingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};

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
