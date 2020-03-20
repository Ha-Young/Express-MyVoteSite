const form = document.forms[0];
const errorAlert = document.getElementsByClassName('errorAlert')[0];
const inputs = document.querySelectorAll('input');

form.addEventListener("submit", ev => {
  ev.preventDefault();
  const title = inputs[0].value;
  const endDate = inputs[1].value;
  const endTime = inputs[2].value;
  let options = [];

  for (let i = 3; i < inputs.length - 2; i++) {
    options.push({
      option: inputs[i].value
    });
  }

  fetch('/votings/new', {
    method: "POST",
		headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({ title, endDate, endTime, options })
  }).then(response => {
    if (!response.ok) return response.json();
    location.href='/';
  }).then(data => {
    errorAlert.innerText = data;
  }).catch(err => {
    console.log('catch error' + err);
  });
});
