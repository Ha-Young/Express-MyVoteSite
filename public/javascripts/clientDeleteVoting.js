const deleteButton = document.getElementById('voting-delete-button');

deleteButton.addEventListener('click', deleteVoting);

async function deleteVoting() {
  const votingId = document.getElementById('voting-id').value;

  const res = await fetch(`/votings/${votingId}`, {
    method: 'DELETE',
  });

  const fetchedData = await res.json();

  alert(fetchedData.message);
  location.assign('/');
}
