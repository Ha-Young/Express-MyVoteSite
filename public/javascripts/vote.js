const toListButton = document.querySelector('.to-list');
const deleteVoteButton = document.querySelector('.delete-vote');

toListButton.addEventListener('click', () => {
  location.assign(location.origin);
});

deleteVoteButton.addEventListener('click', () => {
  const voteId = location.pathname.replace(/\/votings\//i, '');
  fetch('/votings', {
    method: "DELETE",
    body: voteId
  });
});
