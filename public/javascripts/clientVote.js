const voteButton = document.getElementById('vote');
const voteForm = document.getElementById('vote-form');

vote.addEventListener('click', updateVotingData);

async function updateVotingData(event) {
  event.preventDefault();

  const votingId = event.target.name;
  const options = document.getElementsByName('option');
  let selectedOptionValue = null;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedOptionValue = options[i].value;

      break;
    }
  }

  const res = await fetch(`/votings/${votingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ selectedOptionValue }),
  });

  const fetchedData = await res.json();

  alert(fetchedData.message);

  if (fetchedData.result === 'login') {
    location.assign('/login');

    return;
  }

  if (fetchedData.result === 'select') {
    console.log('여기 들어와야 함');
    location.reload();

    return;
  }

  location.assign(`/votings/${votingId}`);
}

