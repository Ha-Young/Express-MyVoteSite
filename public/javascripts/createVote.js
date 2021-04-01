const voteSubmitButton = document.querySelector(".create-voting-button");
const form = document.querySelector(".create-voting-form");

function sendAjax(url, data) {
  data = JSON.stringify(data);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(data);

  xhr.addEventListener("load", function () {
    console.log(xhr.responseText);
    window.location.href = "/";
  });
}

function getUserInputData(e) {
  e.preventDefault();
  const title = document.querySelector(".input-title").value;
  const date = document.querySelector(".input-date").value;
  const optionContainer = document.querySelector(".create-option-container").children;
  const options = [];

  for (let i = 0; i < optionContainer.length; i++) {
    options.push(optionContainer[i].value);
  }

  const inputData = {
    "title": title,
    "date": date,
    "options": options
  }

  sendAjax("http://localhost:3000/votings/new", inputData);
}

function init() {
  form.addEventListener("submit", getUserInputData);
}

init();
