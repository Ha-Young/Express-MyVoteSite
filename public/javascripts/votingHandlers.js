const $deleteButton = document.querySelector('.delete-button');

$deleteButton.addEventListener('click', function () {
  fetch(window.location.href, {
    method: 'DELETE',
  }).then(res => {
    window.location.href = '/';
  }).catch(err => {
    console.err(err);
    window.location.href = '/';
  });
});
