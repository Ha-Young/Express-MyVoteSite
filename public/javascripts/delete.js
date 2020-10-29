
const deleteButton = document.querySelector('.delete-button');

deleteButton.addEventListener('click', async event => {
  const { id } = event.target;
  console.log('delete')
  try {
    await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'DELETE'
    });

    location.assign('http://localhost:3000/');
  } catch (err) {
    console.error(err);
  }
});
