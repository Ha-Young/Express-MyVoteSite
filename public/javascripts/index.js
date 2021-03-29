const button = document.getElementById('plusButton');
const ul = document.getElementById('list');

function handleClick() {
  const li = document.createElement('li');
  const newInput = document.createElement('input');

  li.appendChild(newInput);
  ul.appendChild(li);
}

button.addEventListener('click', handleClick);
