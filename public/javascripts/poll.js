const deletePollButton = document.querySelector('#delete-poll-button');
const voteForm = document.querySelector('#vote-form');

if (deletePollButton) {
  deletePollButton.addEventListener('click', deletePoll);
}

voteForm.setAttribute('action', window.location.pathname);

function deletePoll() {
  const params = window.location.pathname;
  fetch(params, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        alert('투표가 삭제되었습니다. 홈페이지로 이동합니다.');
        window.location.href = 'http://localhost:5000/';
      }
    })
    .catch(error => {
      console.log(error);
    });
}
