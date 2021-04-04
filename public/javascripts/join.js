const emailField = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const validationMessageField = document.querySelector('#validation-message');
const signupButton = document.querySelector('.submit-button');

const MESSAGES = {
  INVALID_EMAIL: 'invalid email format',
  DIFFERENT_PASSWORDS: 'passwords not identical',
  EMPTY_STRING: '',
};

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
    validationMessageField.textContent = MESSAGES.INVALID_EMAIL;
    return;
  }

  validationMessageField.textContent = MESSAGES.EMPTY_STRING;
}

function handleKeyupPasswords() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    validationMessageField.textContent = MESSAGES.DIFFERENT_PASSWORDS;
    signupButton.disabled = true;
    return;
  }

  validationMessageField.textContent = MESSAGES.EMPTY_STRING;
  signupButton.disabled = false;
}

emailField.addEventListener('keyup', handleKeyupEmail);
confirmPasswordInput.addEventListener('keyup', handleKeyupPasswords);
