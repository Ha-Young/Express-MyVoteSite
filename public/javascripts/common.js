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
};
