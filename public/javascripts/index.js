const votings = document.querySelectorAll('.voting');

votings.forEach(voting => {
  voting.addEventListener('click', () => {
    const votingId = voting.dataset.id;
    location.assign(`${location.origin}/votings/${votingId}`);
  });
});
