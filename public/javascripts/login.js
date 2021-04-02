import { showValidation } from "./util.js";

const loginForm = document.querySelector("#login-form")
const emailInput = document.querySelector("input[type='email']");
const passwordInput = document.querySelector("input[type='password']");
const googleLoginButton = document.querySelector("#googleLoginButton");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const previousUrl = document.referrer;

  try {
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.status === 200) {
      if (previousUrl.includes("votings")) {
        window.location = previousUrl;
      } else {
        window.location = "/";
      }
      return;
    }

    const { error } = await response.json();

    if (error) {
      showValidation(error.msg);
    }
  } catch (err) {
    console.error(err);
  }
});

googleLoginButton.addEventListener("click", () => {
  window.location = "/users/login-google";
});
