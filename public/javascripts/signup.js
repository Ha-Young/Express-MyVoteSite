import { showValidation } from "./common.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const password = document.querySelector("input[name='password']").value;
  const confirmedPassword = document.querySelector("input[name='confirmedPassword']").value;

  try {
    const response = await fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmedPassword
      })
    });

    if (response.status === 201) {
      window.location = "/users/login";
      return;
    }

    const result = await response.json();

    if (result.error) {
      showValidation(result.error.msg);
    } else {
      window.location = "/users/login";
    }
  } catch (err) {
    console.error(err);
  }
});

