import emailValidator from "../lib/email-validator/index.js";

const $loginForm = document.getElementById("login-form");
const $loginAlert = document.getElementById("login-alert");
const $email = document.getElementById("email");

$email.addEventListener("input", (event) => {
  if (emailValidator(event.target.value)) {
    $email.dataset.isValid = "true";
  } else {
    $email.dataset.isValid = "false";
  }
});

(function () {
  let timeoutId;

  $loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if ($email.dataset.isValid === "false") {
      clearTimeout(timeoutId);
      $loginAlert.className = "display-block";
      timeoutId = setTimeout(() => {
        $loginAlert.className = "display-none";
      }, 2000);

      return;
    }

    const urlData = new URLSearchParams();

    for (const [key, value] of new FormData($loginForm)) {
      urlData.append(key, value);
    }

    const response = await fetch(
      location.href,
      { method: "POST", body: urlData },
    );

    const { result, redirect } = await response.json();

    if (result === "invalid") {
      clearTimeout(timeoutId);
      $loginAlert.className = "display-block";
      timeoutId = setTimeout(() => {
        $loginAlert.className = "display-none";
      }, 2000);

      return;
    }

    if (result === "success") return location.replace(redirect);
  });
})();
