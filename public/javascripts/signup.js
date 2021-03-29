import emailValidator from "./libs/email-validator/index.js";

const $email = document.getElementById("email");
const $userName = document.getElementById("user-name");
const $password = document.getElementById("password");
const $passwordConfirm = document.getElementById("password-confirm");
const $submit = document.getElementById("submit");

const userData = {
  email: "",
  userName: "",
  password: "",
  passwordConfirm: "",
};

$email.addEventListener("input", event => {
  if (emailValidator(event.target.value)) {
    userData.email = event.target.value;
    $email.className = "valid";
  } else {
    userData.email = "";
    $email.className = "invalid";
  }
});

$userName.addEventListener("input", event => {
  const value = event.target.value;

  if (value.includes(" ")) {
    $userName.className = "invalid";
    event.target.value = event.target.value.trim();
  } else {
    userData.userName = event.target.value;
    $userName.className = "valid";
  }
});

$password.addEventListener("input", event => {
  const validator =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

  if (event.target.value.match(validator)) {
    userData.password = event.target.value;
    $password.className = "valid";
  } else {
    userData.password = "";
    $password.className = "invalid";
  }
});

$passwordConfirm.addEventListener("input", event => {
  const value = event.target.value;
  if (value === userData.password) {
    userData.passwordConfirm = event.target.value;
    $passwordConfirm.className = "valid";
  } else {
    userData.passwordConfirm = "";
    $passwordConfirm.className = "invalid";
  }
});

$submit.addEventListener("click", event => {
  const TRANSLATIONS = {
    email: "email",
    userName: "별명",
    password: "비밀번호",
    passwordConfirm: "비밀번호 확인",
  };

  for (const key in userData) {
    if (!userData[key].length) {
      return alert(`${TRANSLATIONS[key]}이/가 유효하지 않습니다. 😥`);
    }
  }
  delete userData.passwordConfirm;
  const stringUserData = JSON.stringify(userData);

  const xhr = new XMLHttpRequest();
  xhr.open("post", "/signup");
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.send(stringUserData);

  xhr.onload = e => {
    debugger;
    if (xhr.status === 302) {
      window.location.replace(window.location.origin + xhr.responseText);
    } else {
      alert(xhr.responseText);
    }
  };
});
