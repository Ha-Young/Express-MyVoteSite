const voteSubmitButton = document.querySelector(".create-voting-button");
const form = document.querySelector(".create-voting-form");

function sendNewVoting(url, data) {
  fetch(
    url,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }
  ).then(() => window.location.href = "/");
}

function getUserInputData(e) {
  e.preventDefault();

  const title = document.querySelector(".input-title").value;
  const date = document.querySelector(".input-date").value;
  const time = document.querySelector(".input-time").value;
  const optionContainer = document.querySelector(".create-option-container").children;
  const options = [];

  for (let i = 0; i < optionContainer.length; i++) {
    options.push(optionContainer[i].value);
  }

  const inputData = {
    "title": title,
    "date": date,
    "time": time,
    "options": options
  }

  sendNewVoting("http://localhost:3000/votings/new", inputData);
}

function init() {
  form.addEventListener("submit", getUserInputData);
}

init();
