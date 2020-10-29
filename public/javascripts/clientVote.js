const voteButton = document.getElementById('vote');

voteButton.addEventListener('click', updateVotingData);

async function updateVotingData(event) {
  event.preventDefault();

  const votingId = document.getElementById('voting-id').value;
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
    location.reload();

    return;
  }

  location.assign(`/votings/${votingId}`);
}
