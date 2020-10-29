const modalContainer = document.querySelector('#modal-container');
const modal = modalContainer.querySelector('#modal');
const modalCountdown = modalContainer.querySelector(
  '#modal__countdown > .remain'
);
const modalTitle = modal.querySelector('#modal__title');
const modalContent = modal.querySelector('#modal__content');
const modalCloseButton = modal.querySelector('#modal__close-button');

export function openModal(title, content, redirection) {
  modalTitle.textContent = title;
  modalContent.textContent = content;
  modalCloseButton.addEventListener('click', closeModal);
  modalContainer.classList.remove('invisible');

  window.setInterval(function () {
    if (modalCountdown.textContent > 0) {
      modalCountdown.textContent -= 1;
    }
  }, 1000);

  window.setTimeout(function () {
    closeModal(redirection);
  }, 3000);

  function closeModal() {
    if (redirection) {
      window.location.href = redirection;
      return;
    }

    modalContainer.classList.add('invisible');

    modalTitle.textContent = '';
    modalContent.textContent = '';

    modalCloseButton.removeEventListener('click', closeModal);
  }
}
