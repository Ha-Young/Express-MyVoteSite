const $votingListContents = document.querySelector('.voting-list-contents');
const $addVoteItemButton = document.querySelector('#add-vote-item-button');
const $removeVoteItemButton = document.querySelector('#remove-vote-item-button');

const removeVoteItemHandler = () => {
  const choiceItemList = document.querySelectorAll('.voting-list-item');
  if (choiceItemList.length <= 2) return alert('최소 2개의 선택지가 필요합니다.');

  return choiceItemList[choiceItemList.length - 1].remove();
};
const addVoteItemHandler = () => {
  const div = document.createElement('div');
  const input = document.createElement('input');

  div.classList.add('voting-list-item');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', '선택지');
  input.setAttribute('name', 'choice');
  div.appendChild(input);
  $votingListContents.appendChild(div);
};

$addVoteItemButton.addEventListener('click', addVoteItemHandler);
$removeVoteItemButton.addEventListener('click', removeVoteItemHandler);
