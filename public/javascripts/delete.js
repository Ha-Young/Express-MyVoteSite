const deleteButton = document.querySelector('.deleteButton');

deleteButton.addEventListener('click', async event => {
  const { id } = event.target;
  try {
    await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'DELETE'
    });

    location.assign('http://localhost:3000/');
  } catch (err) {
    console.error(err);
  }
});
