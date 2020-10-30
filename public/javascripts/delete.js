import { openModal } from './modal.js';

const adminForm = document.querySelector('.admin-area');
const deleteButton = adminForm.querySelector('.delete-voting');

const deleteSubmitHandler = async function (ev) {
  ev.preventDefault();
  const { action } = ev.target;

  try {
    deleteButton.setAttribute('value', '삭제 중..');
    deleteButton.setAttribute('disabled', true);

    const res = await fetch(action, { method: 'DELETE' });
    const { displayName, topic } = await res.json();

    deleteButton.setAttribute('value', '삭제 완료');
    openModal(
      '삭제가 완료되었습니다',
      `${displayName} 님이 작성하신 ${topic} 투표를 삭제하였습니다.`,
      '/'
    );
  } catch (error) {
    console.error(error);
  }
};

adminForm.addEventListener('submit', deleteSubmitHandler);
