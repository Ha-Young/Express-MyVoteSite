const loginButton = document.querySelector("#loginButton");
const loginForm = document.querySelector("#login-form")
const emailInput = document.querySelector("input[type='email']");
const passwordInput = document.querySelector("input[type='password']");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const previousUrl = document.referrer;
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
      if (!previousUrl) {
        window.location = "/";
      } else {
        window.location = previousUrl;
      }
      return;
    }

    const { error } = await response.json();

    if (error) {
      const validationText = document.querySelector(".validation");
      validationText.classList.remove("hidden");
      validationText.textContent = error.msg;
      return;
    }
  } catch (err) {
    console.error(err);
  }
});
