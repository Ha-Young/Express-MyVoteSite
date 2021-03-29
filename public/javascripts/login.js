const form = document.querySelector(".login-form");
const signupLinkButton = document.querySelector(".signup-link-button");
const messageBox = document.querySelector(".message-box");

const setMessage = (message) => {
  messageBox.textContent = message;
}

const handleSignupLinkButtonClick = (e) => {
  window.location.href = "./signup";
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    const response = await fetch("/login", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "post",
      body: JSON.stringify(user),
    });

    const loginResult = await response.json();
    if (loginResult.result) {
      window.location.href = "./";
    } else {
      setMessage(loginResult.message);
    }
  } catch(err) {
    setMessage("error!");
  }
};

signupLinkButton.addEventListener("click", handleSignupLinkButtonClick);
form.addEventListener("submit", handleSubmit);
