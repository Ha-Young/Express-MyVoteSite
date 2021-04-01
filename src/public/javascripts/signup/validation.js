const signupForm = document.querySelector(".signup-form");
const email = document.querySelector(".email");
const password1 = document.querySelector(".password1");
const password2 = document.querySelector(".password2");
const signUpButton = document.querySelector(".signup-button");
const warningBox = document.querySelector(".warning-box");

const validatePassword = (first, second) => {
  const value1 = first.value;
  const value2 = second.value;

  if (value1 === value2) {
    return true;
  }

  return false;
};

const submitHandler = (e) => {
  e.preventDefault();

  if (!validatePassword(password1, password2)) {
    warningBox.textContent = "비밀번호가 일치하지 않습니다.";
    return;
  } else {
    warningBox.textContent = "";
  }

  signupForm.submit();
};

const validator = () => {
  signupForm.addEventListener("submit", submitHandler);
};

validator();
