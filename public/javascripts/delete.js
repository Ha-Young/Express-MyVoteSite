const adminForm = document.querySelector('.admin-area');
const deleteButton = adminForm.querySelector('.delete-voting');

const deleteSubmitHandler = async ev => {
  ev.preventDefault();
  const { action } = ev.target;

  try {
    const res = await fetch(action, { method: 'DELETE' });

    const { displayName, topic } = await res.json();

    openModal(
      '삭제가 완료되었습니다',
      `${displayName} 님이 작성하신 
      ${topic} 투표를 삭제하였습니다.`
    );
  } catch (error) {
    console.error(error);
  }
};

adminForm.addEventListener('submit', deleteSubmitHandler);
