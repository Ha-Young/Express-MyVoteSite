const $newVotingListBtn = document.querySelector('.voting__new__list__btn');
const $newVotingList = document.querySelector('.voting__new__list');

let listNum = 3;

function addNewList() {
  const $input = document.createElement('input');

  $input.setAttribute('type', 'text');
  $input.setAttribute('name', 'vote_list');
  $input.setAttribute('placeholder', `후보 ${listNum}`);

  listNum++;

  $newVotingList.insertBefore($input, $newVotingListBtn);
}

$newVotingListBtn?.addEventListener('click', addNewList);
