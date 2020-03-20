const dateInput = document.querySelector("input[type='datetime-local']");
const MESSAGE = {
  SAVE_ERROR: "VOTE_SAVE_ERROR",
  CREATE_SUCCESS: "CREATE_SUCCESS"
};
let now = new Date();

const minDate = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000 + 10 * 60 * 1000);
const minDateForm = minDate
  .toISOString()
  .split(":")
  .slice(0, 2)
  .join(":");
dateInput.min = minDateForm;
dateInput.value = minDateForm;

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 90);
dateInput.max = maxDate
  .toISOString()
  .split(":")
  .slice(0, 2)
  .join(":");

var optionNum = 2;
function addOption() {
  if (optionNum < 5) {
    optionNum++;
    const optionWrapper = document.querySelector(".option-wrapper");
    const option = document.createElement("input");
    option.type = "text";
    option.placeholder = "선택지" + optionNum;
    option.className = "option";
    optionWrapper.appendChild(option);
  } else {
  }
}

function processData() {
  const title = document.querySelector(".title").value;
  const due = document.querySelector(".due").value;
  let optionEls = document.querySelectorAll(".option");
  const options = [];
  optionEls.forEach(option => {
    options.push(option.value.trim());
  });
  function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length;
  }
  return {
    title,
    due,
    options
  };
}

const form = document.querySelector(".vote-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  const VOTE_CREATE_RESULT = {
    SUCCESS: "SUCCESS",
    CREATE_ERROR: "CREATE_ERROR"
  };
  const errorMessage = document.querySelector(".error");

  const data = processData();
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
  fetch("/votings/new", option)
    .then(res => res.json())
    .then(result => {
      switch (result.message) {
        case MESSAGE.SAVE_ERROR:
          errorMessage.textContent = "저장 오류가 발생했습니다. 다시 시도해 주세요";
          break;
        case MESSAGE.CREATE_SUCCESS:
          alert("투표가 생성되었습니다");
          window.location.pathname = "/";
          break;
        default:
          errorMessage.textContent = "알수 없는오류";
      }
    });
});
