const SIGNUP_RESULT={ SIGNUP_SUCESS:'SIGNUP_SUCCESS' , USER_EXIST:"USER_EXIST" }

function confirm() {
  const form = document.querySelector("form");
  form.addEventListener("submit", e => {
    e.preventDefault();
  });

  // password validation:at least one numeric digit and a special character
  const email = document.querySelector('input[type="email"]').value;
  const emailPattern = /\S+@\S+\.\S+/;
  const passwords = document.querySelectorAll('input[type="password"]');
  const password = passwords[0].value;
  const passwordConfirm = passwords[1].value;
  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  if (email.match(emailPattern)) {
    if (passwords[0].value.match(passwordPattern)) {
      // form.method = "POST";
      // form.action = "/signup";
      if (password === passwordConfirm) {
        const data = {
          email: email,
          password: password
        };
        const option = {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        };
        fetch("/signup", option)
          .then(res => res.json())
          .then(result => {
            if (result.message === SIGNUP_RESULT.USER_EXIST) {
              alert('이미 계정이 존재합니다.')
            }else {
              alert('회원가입이 완료 되었습니다')
              window.location.pathname = '/'
            }
          });
        // form.submit();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      alert("비밀번호 조건: 영문,숫자,특수기호를 포함한 7~15자리");
    }
  } else {
    alert("다음과 같은 형식이어야 합니다. example@gmail.com");
  }
}
