const polls = document.querySelector('.js-polls');
const addBtn = document.querySelector('.js-addBtn');
let index = 0;

const createPoll = () => {
  const li = document.createElement('li');
  const input = document.createElement('input');
  const br = document.createElement('br');

  input.type = 'text';
  input.name = `polls[${index++}][poll_title]`;
  input.placeholder = 'poll';

  li.appendChild(input);
  li.appendChild(br);

  return li;
};

const handleCreate = () => {
  polls.appendChild(createPoll());
};

addBtn.addEventListener('click', handleCreate);

const init = () => {
  handleCreate();
  handleCreate();
};
init();
