const voteForm = document.querySelector('.vote-form');
const options = voteForm.querySelector('input[name=option]');

const voteSubmitHandler = async ev => {
  ev.preventDefault();
  const {
    action,
    option: { value },
  } = ev.target;

  try {
    const res = await fetch(action, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedOptionId: value }),
    });
    const json = await res.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};

voteForm.addEventListener('submit', voteSubmitHandler);
