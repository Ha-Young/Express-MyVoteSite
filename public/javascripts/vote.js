const form = document.querySelector("form");
// form.addEventListener("submit", e => {
//   e.preventDefault();
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
    optionId:optionSelected.id
  };
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };
  fetch(window.location.pathname, option)
    .then(res => res.json())
    .then(result => {
      // if (result.message) {
      // } else {
      // }
    });
}

function linkLogin() {
  window.location.pathname = "/login";
}
