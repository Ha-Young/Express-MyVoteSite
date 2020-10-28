const $email = document.querySelector('#email');
const $name = document.querySelector('#name');
const $password = document.querySelector('#password');
const $signupButton = document.querySelector('#signup-button');
const $accountError = document.querySelector('.account-error');

const data = {
  email: $email.value,
  name: $name.value,
  password: $password.value,
};
const updateValue = e => data[e.target.name] = e.target.value;
const set = async () => {
  const response = await fetch('/signup', {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (result.redirect) {
    alert('성공적으로 회원가입 되었습니다.\n로그인 페이지로 이동합니다');
    window.location.href = result.redirect;
  } else {
    $accountError.textContent = result.signupResult;
  }
};
$email.addEventListener('change', updateValue);
$name.addEventListener('change', updateValue);
$password.addEventListener('change', updateValue);
$signupButton.addEventListener('click', set);
