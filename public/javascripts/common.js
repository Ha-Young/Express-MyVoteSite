import showModal from "./modal.js";

const logoutButton = document.querySelector("#logoutButton");
const deleteButton = document.querySelector("#deleteButton");

if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    try {
      await fetch("/users/logout", {
        method: "GET",
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  });
}

if (deleteButton) {
  deleteButton.addEventListener("click", async () => {
    try {
      const id = window.location.pathname.substring(9).replace("/result", "");
      const response = await fetch(`/votings/${id}`, {
        method: "DELETE"
      });
      const { result } = await response.json();
      showModal(result);
    } catch (err) {
      console.log(err);
    }
  });
}
