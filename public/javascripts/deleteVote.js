const deleteButton = document.querySelector('.deleteButton');

deleteButton.addEventListener('click', () => {
  fetch(`/votings/${deleteButton.name}`, { method: 'DELETE' })
  .then(() => {
    window.location.href='/';
  })
});
