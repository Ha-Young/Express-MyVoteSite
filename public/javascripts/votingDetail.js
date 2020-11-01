const $voteButton = document.querySelector('.vote-button');
const $voteDeleteButton = document.querySelector('.vote-delete-button');
const $votingItemContainer = document.querySelector('.voting-item-container');
const $choiceResults = document.querySelectorAll('.choice-result');

const submitVoteEventHandler = async () => {
  const votingId = $votingItemContainer.id;
  const isChecked = document.querySelector('input[name="choice"]:checked');

  if (!isChecked) return alert('투표할 항목을 선택해 주세요');

  try {
    const choiceNumber = isChecked.id.split('-')[1];
    const response = await fetch(`/votings/${votingId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        callbackUrl: `/votings/${votingId}`,
        choice: choiceNumber,
      }),
    });
    const responseData = await response.json();

    if (responseData.callbackUrl) {
      alert('로그인 후 투표할 수 있습니다.')
      return window.location.href = responseData.callbackUrl;
    }

    if (responseData.result) return alert('투표 완료!');

    return alert('중복 투표 할 수 없습니다!!');
  } catch (error) {
    throw Error;
  }
};
const deleteVoteEventHandler = async () => {
  if (!confirm('정말로 삭제하시겠습니까?')) return;
  const votingId = $votingItemContainer.id;
  const response = await fetch(`/votings/${votingId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const responseData = await response.json();

  if (responseData.result) {
    alert('성공적으로 삭제되었습니다.');
    return window.location.href = '/my-votings';
  }
};

if ($voteButton !== null) $voteButton.addEventListener('click', submitVoteEventHandler);
if ($voteDeleteButton !== null) $voteDeleteButton.addEventListener('click', deleteVoteEventHandler);

(function setMostVotes() {
  const choiceResultsArray = Array.from($choiceResults);

  if (choiceResultsArray.length) {
    const mostVotes = choiceResultsArray.reduce((accum, current) => {
      return accum.id < current.id ? current : accum;
    });
    mostVotes.style.color='#40ff8c';
  }
})();
