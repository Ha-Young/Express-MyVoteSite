const $form = document.getElementById('vote-form');
const $voterIdInDB = document.getElementById('voter-id-in-db');
const $selection = document.getElementsByClassName('checkbox');

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

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const voteId = $form.name;
  const voterId = $voterIdInDB.getAttribute('name');
  const fetchData = {};

  fetchData.voteId = voteId;
  fetchData.voterId = voterId;

  $selection.forEach((selection) => {
    if (selection.checked) {
      fetchData.selectionId = selection.value;
    }
  });

  updateVoteSelection(`http://localhost:3000/votings/${voteId}`, fetchData)
    .then(message => {
      alert(`${message}`);
      window.location.href = 'http://localhost:3000/';
    });
});
