import emailValidator from "../lib/email-validator/index.js";

const $email = document.getElementById("email");
const $userName = document.getElementById("user-name");
const $password = document.getElementById("password");
const $passwordConfirm = document.getElementById("password-confirm");
const $signupForm = document.getElementById("signup-form");

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
    event.target.value = event.target.value.trim();
    $userName.className = "invalid";
  } else {
    userData.userName = event.target.value;
    $userName.className = "valid";
  }
});

$password.addEventListener("input", event => {
  const validator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,20}$/;

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

(function () {
  let isInvalidClick = false;

  $signupForm.addEventListener("submit", event => {
    event.preventDefault();

    if (isInvalidClick) return;

    const TRANSLATIONS = {
      email: "email",
      userName: "별명",
      password: "비밀번호",
      passwordConfirm: "비밀번호 확인",
    };

    for (const key in userData) {
      if (!userData[key].length) {
        const $warningBox = document.createElement("div");
        $warningBox.className = "warning-box";
        $warningBox.innerText = `${TRANSLATIONS[key]}이(가) 유효하지 않아요🙄`;
        document.body.appendChild($warningBox);
        setTimeout(() => {
          document.body.removeChild($warningBox);
        }, 2000);

        return;
      }
    }

    delete userData.passwordConfirm;
    const userDataForm = JSON.stringify(userData);

    const xhr = new XMLHttpRequest();
    xhr.open("post", "/signup");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(userDataForm);

    isInvalidClick = true;

    xhr.onload = () => {
      const { result } = JSON.parse(xhr.responseText);

      if (result === "invalid") {
        const $warningBox = document.createElement("div");
        $warningBox.className = "warning-box";
        $warningBox.innerText = "이미 가입된 이메일이네요 🙄";
        document.body.appendChild($warningBox);
        setTimeout(() => {
          document.body.removeChild($warningBox);
        }, 2000);
        isInvalidClick = false;

        return;
      }

      if (result === "success") {
        const $welcomeBox = document.createElement("div");
        $welcomeBox.className = "welcome-box";
        $welcomeBox.innerText = "성공적으로 가입됐어요 🎉\n 로그인하러 이동할게요 🚗"
        document.body.appendChild($welcomeBox);
        setTimeout(() => {
          location.assign("/login");
        }, 2000);
      }
    };
  });
})();
