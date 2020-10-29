import { openModal } from './modal.js';

const voteForm = document.querySelector('.vote-form');
const submitButton = voteForm.querySelector('input[type=submit]');

const voteSubmitHandler = async function (ev) {
  ev.preventDefault();
  const {
    action,
    option: { value },
  } = ev.target;

  try {
    submitButton.setAttribute('value', '투표 반영 중..');
    const res = await fetch(action, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOptionId: value }),
    });

    if (res.status === 401) {
      openModal(
        '잠시 후 로그인 페이지로 이동합니다.',
        '로그인하지 않은 유저는 투표할 수 없습니다.',
        '/login'
      );
      return;
    }

    const { topic, selectedOption } = await res.json();

    submitButton.setAttribute('value', '투표 완료');

    openModal(
      `${topic} 투표 완료`,
      `${selectedOption} 에 투표를 완료하였습니다.`,
      action
    );
  } catch (error) {
    console.error(error);
  }
};

voteForm.addEventListener('submit', voteSubmitHandler);
