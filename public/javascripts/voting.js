const deleteVoting = document.querySelector('.deleteVoting');

deleteVoting.addEventListener('click', () => {
  const votingId = deleteVoting.dataset.id;
  const data = { votingId };

  fetch(`/votings/${votingId}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(data)
  })
    .then(result => {
      if (result) {
        alert('투표를 삭제 했습니다');
        location.href = '/';
      } else {
        alert('투표를 삭제하지 못했습니다');
      }
    });
});
