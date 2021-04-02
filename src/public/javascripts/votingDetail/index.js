const votingForm = document.querySelector(".voting-form");
const optionList = document.querySelectorAll(".option");
const warningBox = document.querySelector(".warning-box");
const voteButton = document.querySelector(".submit-voting-button");

const deleteVotingForm = document.querySelector(".delete-voting-form");
const deleteButton = document.querySelector(".delete-voting-button");

const checkOptions = () => {
  let checked = 0;

  for (const option of optionList) {
    if (option.checked) {
      checked += 1;
    }

    if (checked > 1) {
      return false;
    }
  }

  return checked ? true : false;
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!checkOptions()) {
    warningBox.textContent = "하나의 옵션을 선택하세요.";
    return;
  }

  warningBox.textContent = "";

  votingForm.submit();
  votingForm.removeEventListener("submit", handleSubmit);

  voteButton.disabled = "disabled";
  deleteButton.disabled = "disabled";
};

const handleDeleteButtonClick = () => {
  deleteVotingForm.removeEventListener("submit", handleDeleteButtonClick);

  voteButton.disabled = "disabled";
  deleteButton.disabled = "disabled";
};

const init = () => {
  votingForm.addEventListener("submit", handleSubmit);
  deleteVotingForm.addEventListener("submit", handleDeleteButtonClick);
};

init();
