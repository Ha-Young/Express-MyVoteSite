const deleteButton = document.querySelector('.deleteButton');

deleteButton.addEventListener('click', () => {
  fetch(`/api/votings/${deleteButton.name}`, { method: 'DELETE' })
  .then(() => {
    location.href='/';
  });
});
