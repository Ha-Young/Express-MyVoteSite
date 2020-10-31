const $voteForm = document.getElementById('vote-form');
const $voterIdInDB = document.getElementById('voter-id-in-db');
const $selections = document.getElementsByClassName('checkbox');

const updateVoteSelection = async (url, fetchData) => {
  const fetchResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fetchData)
  });

  return fetchResponse.json();
};

$voteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const voteId = $voteForm.name;
  const voterId = $voterIdInDB.getAttribute('name');
  const fetchData = {};

  fetchData.voteId = voteId;
  fetchData.voterId = voterId;

  for (let i = 0; i < $selections.length; i++) {
    if ($selections[i].checked === true) {
      fetchData.selectionId = $selections[i].value;
    }
  }

  updateVoteSelection(`http://localhost:3000/votings/${voteId}`, fetchData)
    .then(message => {
      alert(`${message}`);
      window.location.href = 'http://localhost:3000/';
    });
});
