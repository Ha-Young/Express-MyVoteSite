const $deleteButton = document.getElementById('delete-button');

$deleteButton.addEventListener('click', async () => {
  const id = $deleteButton.dataset.id;
  await fetch(`/votings/${id}`, { method: 'DELETE' });
  window.location.href = '/';
});
