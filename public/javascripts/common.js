export default function showModal(message) {
  const modal = document.querySelector(".modal-bg");
  const closeButton = document.querySelector("#closeModalButton");
  modal.classList.remove("hidden");
  const text = modal.querySelector(".modal-content p");
  text.textContent = message;

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    window.location.reload();
  });
}

export function showValidation(message) {
  const validationText = document.querySelector(".validation");
  validationText.classList.remove("hidden");
  validationText.textContent = message;
}

export function deleteVote() {
  const deleteButton = document.querySelector("#deleteButton");

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
        console.error(err);
      }
    });
  }
}
