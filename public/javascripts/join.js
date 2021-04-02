const emailField = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const validationMessageField = document.getElementById('validation-message');
const registerButton = document.getElementById('register');

function ValidateEmail(userEmail) {
  const format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (userEmail.match(format)) {
    return true;
  }

  return false;
}

function handleKeyupEmail() {
  const email = emailField.value;

  if (!ValidateEmail(email)) {
    validationMessageField.textContent = 'invalid email format';
    return;
  }

  validationMessageField.textContent = '';
}

function handleKeyupPasswords() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    validationMessageField.textContent = 'passwords not identical';
    return;
  }

  validationMessageField.textContent = '';
  registerButton.disabled = false;
}

emailField.addEventListener('keyup', handleKeyupEmail);
confirmPasswordInput.addEventListener('keyup', handleKeyupPasswords);

