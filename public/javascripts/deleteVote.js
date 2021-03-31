import showModal from "./modal.js";

const deleteButton = document.querySelector("#deleteButton");
const id = window.location.pathname.substring(9);

if (deleteButton) {
  deleteButton.addEventListener("click", async () => {
    try {
      const response = await fetch(`/votings/${id}`, {
        method: "DELETE"
      });
      const result = await response.json();
      showModal(result.result);
    } catch (err) {
      console.log(err);
    }
  });
}
