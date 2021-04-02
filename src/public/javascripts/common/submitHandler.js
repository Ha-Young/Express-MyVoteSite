const signupForm = document.querySelector(".submit-form");
const signupButton = document.querySelector(".submit-button");

const submitHandler = () => {
  signupForm.removeEventListener("submit", submitHandler);
  signupForm.submit();
  signupButton.disabled = "disabled";
};

const validator = () => {
  signupForm.addEventListener("submit", submitHandler);
};

validator();
