const form = document.querySelector(".login-form");
const signupLinkButton = document.querySelector(".signup-link-button");

const handleSignupLinkButtonClick = (e) => {
  window.location.href = "./signup";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  const response = await fetch("/login", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "post",
    body: JSON.stringify(user),
  });

  const loginResult = await response.json();

  console.log(loginResult);
};

signupLinkButton.addEventListener("click", handleSignupLinkButtonClick);
form.addEventListener("submit", handleSubmit);
