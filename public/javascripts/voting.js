(function() {
  var deleteButton = document.querySelector('.delete-voting');
  var $results = document.querySelectorAll('.vote-result');
  var $resultVoting = document.querySelector('.result-voting');
  var totalVoting = $resultVoting.dataset.totalvoter;

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

    $results.forEach(function(result) {
      var resultBar = result.children[0];
      if (Number(totalVoting) === 0) {
        resultBar.style.width = '0%';
        return;
      }
      var voters = result.dataset.voter;
      console.log(voters)
      resultBar.style.width = `${(voters / totalVoting) * 100}%`;
    });

  }


})();
