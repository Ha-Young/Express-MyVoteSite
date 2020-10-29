function validateSignupForm() {
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const $email = document.getElementById('email').value;
  const $username = document.getElementById('username').value;
  const $password = document.getElementById('password').value;
  const $passwordConfirm = document.getElementById('password-confirm').value;
  const $submitButton = document.getElementById('submit-button');

  if (
    $email.match(emailFormat)
    && $password.length >= 4
    && $passwordConfirm.length >= 4
    && $password === $passwordConfirm
    && $username
  ) {
    $submitButton.disabled = false;
  } else {
    $submitButton.disabled = true;
  }
}
