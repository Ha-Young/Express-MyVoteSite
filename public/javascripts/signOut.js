const logoutButton = document.querySelector("#logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await fetch("/users/logout", {
        method: "GET",
      });
      window.location.reload();
    } catch (err) {
      console.err(err);
    }
  });
}
