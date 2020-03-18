const votings = document.querySelectorAll('.voting');

votings.forEach(voting => {
  voting.addEventListener('click', () => {
    const votingId = voting.dataset.id;
    console.log(votingId)
    location.assign(`${location.origin}/votings/${votingId}`);
  });
});
