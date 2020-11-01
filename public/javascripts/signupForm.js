const $email = document.querySelector('#email');
const $name = document.querySelector('#name');
const $password = document.querySelector('#password');
const $passwordConfirm = document.querySelector('#password-confirm');
const $signupButton = document.querySelector('#signup-button');
const $accountError = document.querySelector('.account-error');

const data = {
  email: $email.value,
  name: $name.value,
  password: $password.value,
};
const updateValueHandler = e => {
  const validationResult = checkInputValueValidity(e);

  if (!validationResult) return;
  return data[e.target.name] = e.target.value;
};
const signupHandler = async () => {
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

  if (!result.redirect) $accountError.textContent = result.signupResult;
  alert('성공적으로 회원가입 되었습니다.\n로그인 페이지로 이동합니다');

  return window.location.href = result.redirect;
};

$email.addEventListener('change', updateValueHandler);
$name.addEventListener('change', updateValueHandler);
$password.addEventListener('change', updateValueHandler);
$passwordConfirm.addEventListener('change', updateValueHandler);
$signupButton.addEventListener('click', signupHandler);
