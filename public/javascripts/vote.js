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

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => {
  window.alert('한 번 투표하시면 수정이 불가능합니다. 투표를 진행하시겠습니까?');
});
