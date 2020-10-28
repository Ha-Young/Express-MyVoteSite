const deleteButton = document.querySelector('.delete-button');
const patchButtons = [...document.getElementsByClassName('poll-container'),];

const handleDeleteCard = async (e) => {
  const path = window.location.pathname;
  await fetch(path, {
    method: 'delete',
  });

  window.location = '/';
};

const handlePatchPoll = async (e) => {
  const target = e.target.closest('.poll-container');
  const pollId = target.dataset.pollId;
  const path = window.location.pathname;

  try {
    const result = await fetch(path, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'put',
      body: JSON.stringify({ pollId, }),
    });

    console.log(result);

  } catch (err) {
    console.log(err);
  }
};

deleteButton.addEventListener('click', handleDeleteCard);
patchButtons.forEach((button) => {
  button.addEventListener('click', handlePatchPoll);
});
