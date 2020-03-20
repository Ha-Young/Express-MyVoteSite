const toListButton = document.querySelector('.to-list');
const deleteVoteButton = document.querySelector('.delete-vote');
const submitButton = document.querySelector('#submit');

toListButton.addEventListener('click', () => {
  location.assign(location.origin);
});

const openModal = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
};

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
};

if (deleteVoteButton) {
  deleteVoteButton.addEventListener('click', async () => {
    const userReaction = window.confirm('한 번 삭제한 투표는 복구할 수 없습니다. 정말 삭제하시겠습니까?');

    if (userReaction) {
      const voteId = location.pathname.replace(/\/votings\//i, '');
      const response = await fetch('/votings', {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ voteId })
      });

      if (response.status === 200) {
        location.assign(location.origin);
      } else {
        window.alert('투표를 삭제하지 못했습니다!');
      }
    }
  });
}

const submitForm = (e) => {
  e.preventDefault();

  const userReaction = window.confirm('한 번 투표하면 수정이 불가능합니다. 투표하시겠어요?');

  if (userReaction) {
    document.createElement('form').submit.call(document.forms['vote-form']);
  }
}
