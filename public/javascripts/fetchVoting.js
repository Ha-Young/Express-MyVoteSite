const deleteButton = document.getElementById("deleteButton");
const submitButton = document.getElementById("submitButton");
const alertMessageBox = document.getElementById("message");

const deleteVoting = async (votingId) => {
  await fetch(`http://localhost:3000/voting/votings/${votingId}`, {
    method: "DELETE",
  });

  location.replace("/");
};

const patchVotedResult = async (votingId, checkedOption) => {
  fetch(`http://localhost:3000/voting/votings/${votingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      checkedOption,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
  }).then(res => res.json())
    .then(data => {
      switch (data.status) {
        case 200:
          alertMessageBox.textContent = data.message;
          break;

        case 400:
          alertMessageBox.textContent = data.message;
          break;

        case 403:
          window.location.href = "/auth/login";
          break;

        default:
          break;
      }
    });
};

submitButton.addEventListener("click", (event) => {
  const votingId = event.target.name;
  const checkedOption = document.querySelector('input[name="option"]:checked').value;

  event.preventDefault();
  patchVotedResult(votingId, checkedOption);
});

deleteButton.addEventListener("click", (event) => {
  const votingId = event.target.name;

  event.preventDefault();
  deleteVoting(votingId);
});
