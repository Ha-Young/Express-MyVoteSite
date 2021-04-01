const newVotingForm = document.querySelector(".new-voting-form");
const expiration = document.querySelector(".expiration");
const warningBox = document.querySelector(".warning-box");

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
  }

  warningBox.textContent = "";

  newVotingForm.submit();
  newVotingForm.removeEventListener("submit", handleSubmit);
};

const validator = () => {
  newVotingForm.addEventListener("submit", handleSubmit);
};

validator();
