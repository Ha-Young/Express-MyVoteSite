const toListButton = document.querySelector('.to-list');

toListButton.addEventListener('click', () => {
  location.assign(location.origin);
});

if (document.querySelector('.delete-vote')) {
  deleteVoteButton.addEventListener('click', () => {
    const voteId = location.pathname.replace(/\/votings\//i, '');
    fetch('/votings', {
      method: "DELETE",
      body: voteId
    });
  });
}
