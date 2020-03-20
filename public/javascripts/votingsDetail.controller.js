const deleteButton = document.querySelector('#voteDelete');

if (deleteButton) {
  deleteButton.addEventListener('click', async function () {
    const redirectUrl = 'http://localhost:3000/votings/' + encodeURIComponent(deleteButton.value);
    const response = await fetch(redirectUrl, { method: 'put' });
  });
}
