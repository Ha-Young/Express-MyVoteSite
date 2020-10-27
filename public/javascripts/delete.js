const deleteButton = document.querySelector('.deleteButton');

console.log('hi');
deleteButton.addEventListener('click', async event => {
  const { target: { id } } = event;
  try {
    await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'DELETE'
    });

    location.assign('http://localhost:3000/');
  } catch (err) {
    console.error(err);
  }
});

