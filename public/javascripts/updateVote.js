const options = document.querySelector(".vote-options");

function sendAjax(url, data) {
  data = JSON.stringify(data);
  console.log(url, data);
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", url);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(data);

  xhr.addEventListener("load", function () {

    console.log(xhr.responseText);
    debugger;
  });

}

function getUserOption() {
  const selectedOptionName = document.querySelector("input[name='option']:checked").value;
  const votingId = options.id;
  const url = "http://localhost:3000/votings/" + votingId;

  sendAjax(url, { name: selectedOptionName });
}

function init() {
  options.addEventListener("submit", getUserOption);
}

init();
