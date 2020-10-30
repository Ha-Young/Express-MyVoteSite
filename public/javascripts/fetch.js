const votingButton = document.querySelector('.voting-button');
const deleteButton = document.querySelector('.delete-button');
const votingId = document.querySelector('.voting-option').dataset.votingid;
const optionList = document.querySelectorAll('.voting-option');

const handleUpdateRequest = async () => {
  let optionId;
  for (let i = 0; i < optionList.length; i++) {
    if (optionList[i].checked) {
      optionId = optionList[i].value;
      break;
    }
  }

  const votingData = { votingId, optionId };
  const option = {
    method: 'PUT',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(votingData),
  };

  try {
    const response = await fetch(`http://localhost:3000/votings/${votingId}`, option);
    if (response.status === 200) {
      window.location.href = 'http://localhost:3000/';
    }

    if (response.status === 401) {
      window.location.href = 'http://localhost:3000/login';
    }
  } catch (error) {
    throw new Error(error);
  }
};

const handleDeleteRequest = async () => {
  const option = {
    method: 'DELETE',
    redirect: 'follow',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const response = await fetch(`http://localhost:3000/votings/${votingId}`, option);

    if (response.result = 'ok') {
      window.location.href = 'http://localhost:3000/';
    }
  } catch (error) {
    throw new Error(error);
  }
};

votingButton.addEventListener('click', handleUpdateRequest);
deleteButton.addEventListener('click', handleDeleteRequest);
