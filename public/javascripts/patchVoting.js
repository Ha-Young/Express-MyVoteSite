const submitButton = document.getElementById("submitButton");
const alertMessageBox = document.getElementById("message");

const patchVotedResult = async (votingId, checkedOption) => {
  const patchResult = await fetch(`/voting/votings/${votingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      checkedOption,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
  });

  const parsePatchResult = await patchResult.json();

  switch (patchResult.status) {
    case 200:
      alertMessageBox.classList.add("success");
      alertMessageBox.textContent = parsePatchResult.message;
      break;

    case 400:
      alertMessageBox.classList.add("failure");
      alertMessageBox.textContent = parsePatchResult.message;
      break;

    case 401:
      window.location.href = "/auth/login";
      break;

    default:
      window.location.href = "/votings/error";
      break;
  }
};

submitButton.addEventListener("click", (event) => {
  const votingId = event.target.name;
  const checkedOption = document.querySelector('input[name="option"]:checked').value;

  event.preventDefault();
  patchVotedResult(votingId, checkedOption);
});
