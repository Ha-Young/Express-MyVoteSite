const form = document.forms[0];
const errorAlert = document.getElementsByClassName('errorAlert')[0];

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const username = document.querySelectorAll('input')[0].value;
  const password = document.querySelectorAll('input')[1].value;
  const repassword = document.querySelectorAll('input')[2].value;
  const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  // if(!exptext.test(username)) return errorAlert.innerText = '이메일 형식에 맞게 입력해주세요.';
  // if(password.length < 3 || password.length > 8) return errorAlert.innerText = '비밀번호는 3~8자리로 입력해주세요.';
  if(password !== repassword) return errorAlert.innerText = '비밀번호가 일치하지 않습니다.';

  fetch('/signup', {
    method: "POST",
		headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({username, password})
  }).then((response) => {
    if(!response.ok) return response.json();
    alert('완료');
    location.href='/login';
  }).then((data) => {
    errorAlert.innerText = data;
  }).catch((err) => {
    console.log('catch error' + err);
  });
});
