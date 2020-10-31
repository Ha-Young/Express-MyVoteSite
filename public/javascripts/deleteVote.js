const $form = document.getElementById('delete-form');

const deleteVote = async (url) => {
  const fetchResponse = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return fetchResponse.json();
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const voteId = $form.name;

  deleteVote(`http://localhost:3000/votings/${voteId}`)
    .then(message => {
      alert(`${message}`);
      window.location.href = 'http://localhost:3000/';
    });
});
