const newVotingForm = document.querySelector(".new-voting-form");
const expiration = document.querySelector(".expiration");
const warningBox = document.querySelector(".warning-box");
const newVotingButton = document.querySelector(".new-voting-button");

const optionContainer = document.querySelector(".option-container");
const option = document.querySelector(".option");
const addOptionButton = document.querySelector(".add-option-button");

const newOption = () => {
  const optionClone = option.cloneNode(true);
  optionClone.firstChild.value = "";

  return optionClone;
};

const handleRemoveOptionButton = () => {
  const optionList = document.querySelectorAll(".option");

  for (const option of optionList) {
    const removeOptionButton = option.lastChild;

    if (optionList.length > 2) {
      removeOptionButton.classList.remove("blind");
      removeOptionButton.classList.add("show");
    } else {
      removeOptionButton.classList.remove("show");
      removeOptionButton.classList.add("blind");
    }

    removeOptionButton.removeEventListener("click", handleremoveOptionButonClick);
    removeOptionButton.addEventListener("click", handleremoveOptionButonClick);
  }
};

const handleremoveOptionButonClick = (e) => {
  e.target.parentNode.remove();

  handleRemoveOptionButton();
};

const handleAddOptionButonClick = () => {
  optionContainer.appendChild(newOption());

  handleRemoveOptionButton();
};

const validateExpiration = (timeStamp) => {
  if (timeStamp.getTime() - Date.now() < 0) {
    return false;
  }

  return true;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const timeStamp = new Date(expiration.value);

  if (!validateExpiration(timeStamp)) {
    warningBox.textContent = "투표 만료 날짜 및 시간은 현재 날짜와 시간보다 과거일 수 없습니다.";
    return;
  } else {
    warningBox.textContent = "";
  }

  newVotingForm.submit();
  newVotingForm.removeEventListener("submit", handleSubmit);
};

const init = () => {
  newVotingForm.addEventListener("submit", handleSubmit);
  addOptionButton.addEventListener("click", handleAddOptionButonClick);
};

init();
