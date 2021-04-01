// const $loginForm = document.querySelector(".login-form");
// const $inputEmail = document.querySelector(".login-form-email");
// const $inputPassword = document.querySelector(".login-form-password");
// const $loginButton = document.querySelector(".login-btn");
// const $signupButton = document.querySelector(".signup-btn");

// $loginForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const data = {
//     email: $inputEmail.value,
//     password: $inputPassword.value,
//     pastUrl: document.referrer,
//   };

//   fetch(`/users/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((res) => {
//       if (res.status === 201) {
//         if (document.referrer) {
//           window.location.replace(document.referrer);
//         } else {
//           window.history.back();
//         }
//       }
//     })
//     .catch((err) => window.location.reload());
// });
