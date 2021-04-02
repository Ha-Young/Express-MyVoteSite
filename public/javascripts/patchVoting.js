const submitButton = document.getElementById("submitButton");
const alertMessageBox = document.getElementById("message");

const patchVotedResult = async (votingId, checkedOption) => {
  const data = await fetch(`http://localhost:3000/voting/votings/${votingId}`, {
    method: "PATCH",
    body: JSON.stringify({
      checkedOption,
    }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    },
  });

  const parseData = await data.json();

  switch (data.status) {
    case 200:
      alertMessageBox.classList.add("success");
      alertMessageBox.textContent = parseData.message;
      break;

    case 400:
      alertMessageBox.classList.add("failure");
      alertMessageBox.textContent = parseData.message;
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
