const submitButton = document.getElementById('login-butto');
const email = document.getElementsByName('email')[0].value;
const password = document.getElementsByName('password')[0].value;

const xhr = new XMLHttpRequest();
const url = "http://localhost:8080/login";

const METHOD = {
  POST: "POST",
};

function postLogin() {
  xhr.open(METHOD.POST, url);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(JSON.stringify({
    email,
    password,
  }));

  xhr.onload = () => {
    console.log(xhr.response);
  }
}

submitButton.addEventListener('click', postLogin);


console.log(window.history);