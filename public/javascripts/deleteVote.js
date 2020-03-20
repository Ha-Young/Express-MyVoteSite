const removeButton = document.getElementById('voting-remove');

if (removeButton) {
  const removeCurrentVoting = async () => {
    const votingId = window.location.href.split('votings/')[1];
    const response = await fetch(`/votings/${votingId}`, { method: 'DELETE' });
    const json = await response.json();
    if (json.ok === 1) {
      alert(json.message);
      location.href = '/';
    } else {
      alert(json.message);
    }
  };

  removeButton.addEventListener('click', removeCurrentVoting);
}
