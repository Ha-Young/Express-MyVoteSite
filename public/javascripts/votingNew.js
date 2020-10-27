const polls = document.querySelector('.js-polls');
const addBtn = document.querySelector('.js-addBtn');

const createPoll = () => {
  const li = document.createElement('li');
  const input = document.createElement('input');

  input.type = 'text';
  input.name = 'polls';
  input.placeholder = 'poll';

  li.appendChild(input);

  return li;
};

const handleCreate = () => {
  polls.appendChild(createPoll());
};

addBtn.addEventListener('click', handleCreate);
