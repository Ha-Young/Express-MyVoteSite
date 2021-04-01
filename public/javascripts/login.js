const form = document.querySelector(".login-form");
const signupLinkButton = document.querySelector(".signup-link-button");
const messageBox = document.querySelector(".message-box");

const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setMessage = (message) => {
  messageBox.textContent = message;
};

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
        "Content-Type": "application/json"
      },
      method: "post",
      body: JSON.stringify(user),
    });

    const loginResult = await response.json();
    if (loginResult.result) {
      const originalUrl = getCookie("ORIGINAL_URL");
      if (originalUrl) {
        document.cookie = "ORIGINAL_URL" + "=; Max-Age=-1";
        window.location.href = originalUrl;
      } else {
        window.location.href = "/";
      }
    } else {
      setMessage(loginResult.message);
    }
  } catch(err) {
    setMessage("error!");
  }
};

signupLinkButton.addEventListener("click", handleSignupLinkButtonClick);
form.addEventListener("submit", handleSubmit);
