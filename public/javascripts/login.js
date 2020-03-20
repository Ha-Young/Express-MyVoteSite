const form = document.querySelector("form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const LOGIN_RESULT = {
    SUCCESS: "SUCCESS",
    NO_ACCOUNT: "NO_ACCOUT",
    WRONG_PASSWORD: "WRONG_PASSWORD"
  };
  const errorMessage = document.querySelector(".error");
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;
  const data = {
    email: email,
    password: password
  };
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  };

  fetch("/login", option)
    .then(res => res.json())
    .then(result => {
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
