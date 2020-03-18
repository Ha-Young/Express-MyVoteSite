//date limit
const dateInput = document.querySelector("input[type='datetime-local']");

let now = new Date();
// console.log(now);
// let dateISO=new Date(now);
// console.log(dateISO);
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
  console.log("옵션추가");
  //TODO : 선택지 삭제도 가능하게 하기
  if (optionNum < 5) {
    optionNum++;
    const optionWrapper = document.querySelector(".option-wrapper");
    const option = document.createElement("input");
    option.type = "text";
    option.placeholder = "선택지" + optionNum;
    option.className = "option";
    console.log(option);
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
  console.log("중복검사결과:", checkIfDuplicateExists(options), options);
  return {
    title,
    due,
    options
  };
}

const form = document.querySelector(".vote-form");
form.addEventListener("submit", e => {
  e.preventDefault();
  console.log("submit");
  const VOTE_CREATE_RESULT = {
    SUCCESS: "SUCCESS",
    CREATE_ERROR: "CREATE_ERROR"
  };
  const errorMessage = document.querySelector(".error");

  const data = processData();
  console.log(data);
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
  fetch("/votings/new", option)
    .then(res => res.json())
    .then(result => {
      console.log();
      switch (result.message) {
        case LOGIN_RESULT.SUCCESS:
          window.location.pathname = "/";
          break;
        case LOGIN_RESULT.NO_ACCOUNT:
          errorMessage.textContent = "존재하지않는 계정입니다.";
          break;
        case LOGIN_RESULT.WRONG_PASSWORD:
          errorMessage.textContent = "잘못된 비밀번호입니다";
          break;
        default:
          errorMessage.textContent = "서버오류";
      }
    });
});
