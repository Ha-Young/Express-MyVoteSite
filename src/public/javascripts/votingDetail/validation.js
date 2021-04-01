const votingForm = document.querySelector(".voting-form");
const optionList = document.querySelectorAll(".option");
const warningBox = document.querySelector(".warning-box");

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
};

const validator = () => {
  votingForm.addEventListener("submit", handleSubmit);
};

validator();
