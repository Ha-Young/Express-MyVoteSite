(function() {
  var deleteButton = document.querySelector('.delete-voting');
  if (deleteButton) {
    deleteButton.addEventListener('click', function(event) {
      if (confirm('Are you sure you want to delete THIS VOTING?')) {
        fetch(`/votings/${event.target.dataset.id}`, {
          method: 'DELETE'
        })
        .then(function() {
          window.location = '/';
        })
        .catch(function(error) {
          console.error('Error:', error);
        });
      }
    });
  }
})();
