const toListButton = document.querySelector('.to-list');
const deleteVoteButton = document.querySelector('.delete-vote');

toListButton.addEventListener('click', () => {
  location.assign(location.origin);
});

if (deleteVoteButton) {
  deleteVoteButton.addEventListener('click', () => {
    const voteId = location.pathname.replace(/\/votings\//i, '');

    fetch('/votings', {
      method: "DELETE",
      body: voteId
    });
  });
}
