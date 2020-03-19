const optionsArea = document.querySelector('.options-area');
const addOptionButton = document.querySelector('.add-options');
const removeOptionButton = document.querySelector('.remove-options');
const confirms = document.querySelectorAll('.confirm');
const chartArea = document.querySelector('.chart-area');
const deleteVoteButton = document.getElementById('delete-vote');

if (optionsArea) {
  let optionCount = 2;

  addOptionButton.addEventListener('click', () => {
    optionCount++;
    addOptionItem(optionsArea);
  });

  removeOptionButton.addEventListener('click', () => {
    if (optionCount > 2) {
      optionCount--;
      removeOptionItem(optionsArea);
    }
  });
}

if (confirms) {
  for (let i = 0; i < confirms.length; i++) {
    confirms[i].addEventListener('click', e => {
      if (!window.confirm('제출하시겠습니까?')) {
        e.preventDefault();
      }
    });
  }
}

if (chartArea) {
  const bars = chartArea.querySelectorAll('.bar');

  for (let i = 0; i < bars.length; i++) {
    const value = bars[i].dataset.value;
    bars[i].style.width = `${value}%`;
  }
}

if (deleteVoteButton) {
  deleteVoteButton.addEventListener('click', async () => {
    const id = deleteVoteButton.dataset.voteId;

    await fetch(`/votings/${id}`, { method: 'DELETE' });
    window.location.href = '/';
  });
}

function addOptionItem (target) {
  const optionItem = `<input type="text" name="options" />`;
  const p = document.createElement('p');

  p.innerHTML = optionItem;
  target.append(p);
}

function removeOptionItem (target) {
  const options = target.querySelectorAll('p');
  const lastIndex = options.length - 1;

  target.removeChild(options[lastIndex]);
}
