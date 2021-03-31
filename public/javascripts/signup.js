(function () {
  const form = document.querySelector(".signup-form");
  const messageBox = document.querySelector(".message-box");
  const loginLinkButton = document.querySelector(".login-link-button");

  const setMessage = (message) => {
    messageBox.textContent = message;
  }

  const handleLoginLinkButtonClick = (e) => {
    window.location.href = "./login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
      passwordConfirm: e.target.passwordConfirm.value.trim(),
    };

    try {
      const response = await fetch("/signup", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        body: JSON.stringify(user),
      });

      const signupResult = await response.json();

      if (signupResult.result) {
        window.location.href = "./login";
      } else {
        setMessage(signupResult.message);
      }
    } catch (err) {
      setMessage("error!");
    }

  };

  form.addEventListener("submit", handleSubmit);
  loginLinkButton.addEventListener("click", handleLoginLinkButtonClick);
})();

