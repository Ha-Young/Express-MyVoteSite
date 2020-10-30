const $votingCheckBoxes = document.querySelectorAll(
  '.voting__detail__main__checkbox'
);
const $votingDetailMain = document.querySelector('.voting__detail__wrap');
const $votingZoneWrap = document.querySelector('.voting__detail__main');
const $votingSelectorZone = document.querySelector(
  '.voting__detail__main__right'
);
const $checkBoxLabels = document.querySelectorAll('.checkbox__label');
const $votingSelectBtn = document.querySelector('.voting__detail__btn__select');
const $votingDeleteBtn = document.querySelector('.voting__detail__btn__delete');

async function handleVotingSelectBtnClick() {
  const checkedBox = Array.from($votingCheckBoxes).filter((votingCheckBoxe) => {
    return votingCheckBoxe.checked;
  })[0];

  if (!checkedBox) return;

  const {
    id,
    dataset: { sourceUrl },
  } = checkedBox;
  const votedMessage = document.createElement('h4');

  try {
    const response = await fetch(`http://localhost:3000/${sourceUrl}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (data.result === 'ok') {
      votedMessage.textContent = '투표를 완료하셨습니다.';
      $votingSelectBtn.remove();
      $votingSelectBtn.setAttribute('disabled', true);
      $votingSelectorZone.appendChild(votedMessage);
    } else if (data.result === 'required login') {
      location.assign('http://localhost:3000/login');
    } else {
      throw new Error(data.result);
    }
  } catch (error) {
    votedMessage.textContent = '서버 에러';
    $votingDetailMain.appendChild(votedMessage);
    console.warn(error);
  }
}

async function handleVotingDeleteBtnClick(e) {
  const {
    dataset: { sourceUrl },
  } = e.target;
  const deletedMessage = document.createElement('h4');

  try {
    const data = await fetch(`http://localhost:3000/${sourceUrl}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const response = await data.json();

    if (response.result === 'ok') {
      deletedMessage.textContent = '삭제를 완료하셨습니다.';
      $votingDeleteBtn.setAttribute('disabled', true);
      $votingDeleteBtn.remove();
      $votingZoneWrap.remove();
    } else {
      throw new Error(response.result);
    }
  } catch (error) {
    deletedMessage.textContent = error;
    console.warn(error);
  } finally {
    $votingDetailMain.appendChild(deletedMessage);
  }
}

function handleLabelClick(e) {
  $checkBoxLabels.forEach((checkBoxLabel) => {
    checkBoxLabel.style.backgroundColor = 'transparent';
  });

  const clickedLabel = e.target;
  clickedLabel.style.backgroundColor = '#4a274f';
}

$votingDeleteBtn?.addEventListener(
  'click',
  _.throttle(handleVotingDeleteBtnClick, 5000, {
    leading: true,
  })
);

$votingSelectBtn?.addEventListener(
  'click',
  _.throttle(handleVotingSelectBtnClick, 5000, {
    leading: true,
  })
);

$checkBoxLabels.forEach((checkBoxLabel) =>
  checkBoxLabel.addEventListener('click', handleLabelClick)
);
