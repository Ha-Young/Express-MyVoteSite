const deleteButton = document.querySelector('.delete-button');
const patchButtons = [...document.getElementsByClassName('poll-container'),];

const handleDeleteCard = async () => {
  try {
    const path = window.location.pathname;

    const result = await fetch(path, {
      method: 'delete',
    });

    const { redirectUrl, } = await result.json();
    window.location = redirectUrl;
  } catch (err) {
    window.location = '/error';
  }
};

const handlePatchPoll = async (e) => {
  const target = e.target.closest('.poll-container');
  const pollId = target.dataset.pollId;
  const path = window.location.pathname;

  try {
    const { redirectUrl, } = await fetch(path, {
      headers: {
        'content-type': 'application/json',
      },
      method: 'put',
      body: JSON.stringify({ pollId, }),
    }).then((res) => {
      return res.json();
    });

    window.location = redirectUrl;
  } catch (err) {
    window.location = '/error';
  }
};

deleteButton && deleteButton.addEventListener('click', handleDeleteCard);
patchButtons && patchButtons.forEach((button) => {
  button.addEventListener('click', handlePatchPoll);
});
