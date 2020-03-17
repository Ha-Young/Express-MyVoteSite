function confirm() {
  const errorMessage = document.querySelector(".error");
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelectorAll('input[type="password"]');
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
      if (result.message === MESSAGE.SUCCESS) {
        errorMessage.textContent("존재하지않는 계정이거나 ,잘못된 비밀번호입니다.");
      }
    });
}
