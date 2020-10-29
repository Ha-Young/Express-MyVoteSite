const modalContainer = document.querySelector('#modal-container');
const modal = modalContainer.querySelector('#modal');
const modalTitle = modal.querySelector('#modal__title');
const modalContent = modal.querySelector('#modal__content');
const modalCloseButton = modal.querySelector('#modal__close-button');

function openModal(title, content) {
  modalTitle.textContent = title;
  modalContent.textContent = content;

  modalCloseButton.addEventListener('click', closeModal);
  modalContainer.classList.remove('invisible');
}

function closeModal() {
  modalContainer.classList.add('invisible');

  modalTitle.textContent = '';
  modalContent.textContent = '';

  modalCloseButton.removeEventListener('click', closeModal);
}
