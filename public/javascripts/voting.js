
var $submitingButton = document.querySelector('#submit-my-vote-button');
var $deletingButton = document.querySelector('#delete-voting-button');

$deletingButton.addEventListener('click', deleteVoting);

function deleteVoting(){
  const votingId = window.location.pathname;
  fetch(votingId, { method:'DELETE' })
    .then(function(response){
      if(response.ok){
        alert('Successfully deleted');
        window.location.href = 'http://localhost:3000/votings';
      }else{
        throw new Error('HTTP error, status = ' + response.status);
      }
    });
}