const emailField = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const validationMessageField = document.querySelector('#validation-message');
const signupButton = document.querySelector('.submit-button');

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
    signupButton.disabled = true;
    return;
  }

  validationMessageField.textContent = '';
  signupButton.disabled = false;
}

emailField.addEventListener('keyup', handleKeyupEmail);
confirmPasswordInput.addEventListener('keyup', handleKeyupPasswords);

