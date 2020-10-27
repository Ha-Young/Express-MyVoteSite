const deleteButton = document.getElementById('voting-delete-button');

deleteButton.addEventListener('click', deleteVoting);

function deleteVoting() {
  location.assign(`/votings/${voting._id}/delete`);
}
