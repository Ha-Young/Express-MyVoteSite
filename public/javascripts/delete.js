const adminForm = document.querySelector('.admin-area');
const deleteButton = adminForm.querySelector('.delete-voting');

const deleteSubmitHandler = async ev => {
  ev.preventDefault();
  const { action } = ev.target;

  try {
    const res = await fetch(action, { method: 'DELETE' });
    const json = await res.json();

    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

adminForm.addEventListener('submit', deleteSubmitHandler);
