const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const form = document.getElementById('myForm');
const inputs = document.querySelectorAll('input');
const submit = document.querySelector('.submitButton');

const regPatterns = {
  email: /^[a-z\d]+@[a-z]{4,8}\.[a-z]{2,5}$/,
  password: /^[a-z\d]{8,20}$/,
  confirmPassword: /^[a-z\d]{8,20}$/
};

const validate = (input) => {
  const fieldName = input.attributes.name.value
  const value = input.value;
  if (fieldName === 'confirmPassword') {
    if (value === password.value) {
      console.log('valid')
      input.className = 'valid';
    } else {
      input.className = 'invalid';
    }
  } else {
    if (regPatterns[fieldName].test(value)) {
      input.className = 'valid';
    } else {
      input.className = 'invalid';
    }
  }
};

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target);
  });
});
