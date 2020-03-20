const form = document.querySelector("form");
form.addEventListener("submit", e => {
  e.preventDefault();
});
//   const data = {
//     // radio button input 값
//     //option: ,
//   };
//   const option = {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   };
//   fetch(window.location.pathname, option)
//     .then(res => res.json())
//     .then(result => {
//       // if (result.message) {
//       // } else {
//       // }
//     });
// });

function getOptionSelected() {
  let options = document.getElementsByName("option");
  let optionSelected = null;
  for (let option of options) {
    if (option.checked) {
      optionSelected = option;
      return optionSelected;
    }
  }
}
function fetchVote() {
  alert("투표내용 전송! ");
  const optionSelected = getOptionSelected();
  const data = {
    optionId: optionSelected.id
  };
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
  fetch(window.location.pathname, option)
    .then(res => res.json())
    .then(result => {
      switch (result.message) {
        case "UPDATE_SUCCESS":
          alert("투표완료 되었습니다");
          break;
        case "UNAUTHORIZED":
          alert("로그인이 필요합니다");
          break;
        case "USER_DONE":
          alert("이미 참여한 투표입니다");
          break;
        default:
          alert("알수없는 오류");
      }
    });
}

function linkLogin() {
  window.location.pathname = "/login";
}
function alertDone() {
  alert("중복투표는 불가능 합니다");
}

function fetchDeleteVote() {
  alert("투표 삭제하기");
}

function toggleResult() {
  const optionsResult = document.querySelector(".options-result");
  optionsResult.style.display === "block"
    ? (optionsResult.style.display = "none")
    : (optionsResult.style.display = "block");

  const options = document.querySelector(".options");
  options.style.display === "none"
    ? (options.style.display = "block")
    : (options.style.display = "none");

  const resultButton = document.querySelector(".btn-result");
  resultButton.textContent === "투표보기"
    ? (resultButton.textContent = "결과보기")
    : (resultButton.textContent = "투표보기");
}
