const $logoutBtn = document.querySelector(".logout-button");

$logoutBtn.addEventListener("click", () => {
  fetch("/users/logout", {
    method: "POST",
  }).then((res) => {
    if (res.status === 200) {
      window.location.href = "/users/login";
    }
  });
});
