const deleteBtn = document.getElementById('delete');
console.log(deleteBtn);

deleteBtn?.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('삭 제');
  const paths = location.pathname.split('/');
  const votingId = paths[paths.length - 1];

  const result = await axios.delete(`/votings/${votingId}`);
});

const candidates = document.getElementsByClassName('candidates-wrapper')[0];

if (candidates) {
  let hasVoted = false;

  Array.from(candidates.children).forEach(candidate => {
    candidate.addEventListener('click', async (e) => {
      e.preventDefault();
      if (hasVoted) {
        alert('이미 투표하셨습니다.');
      }

      hasVoted = true;

      try {
        const candidateId = e.currentTarget.dataset.candidateId;
        const paths = location.pathname.split('/');
        const votingId = paths[paths.length - 1];

        const result = await axios({
          method: 'put',
          url: `/votings/${votingId}/${candidateId}`,
        });

        console.log(result);

        if (result) {
          alert('성공적으로 투표 완료!');
        }

        window.location.href = `/votings/${votingId}`;
      } catch (err) {
        alert('투표 실패입니다..');
      }
    });
  });
}
