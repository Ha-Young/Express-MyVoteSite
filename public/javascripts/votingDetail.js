const deleteButton = document.getElementById('delete-selector');
const choiceOption = document.getElementsByClassName('option');
const eachOptionScore = document.getElementsByClassName('score');

const choiceArr = Array.from(choiceOption);
const scoreArr = Array
  .from(eachOptionScore)
  .map (item => {
    return item.textContent;
  }
);

const max = Math.max(...scoreArr);
const maxIndex = scoreArr.indexOf(max.toString());

choiceOption[maxIndex].style.backgroundColor = 'grey';
choiceOption[maxIndex].style.border = '2px solid rgb(177, 47, 47)';

async function deliverDeleteRequest () {
  try {
    const requestUpdate = await fetch(`${location.href}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.log(err);
  }
}

async function deliverOption (item) {
  try {
    const requestUpdate = await fetch(`${location.href}`, {
      method: 'PUT',
      body: JSON.stringify({ item: item.textContent }),
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.log(err);
  }
}

deleteButton.addEventListener('click', deliverDeleteRequest);

choiceArr.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    deliverOption(item);
    alert('🎉 투표가 완료되었습니다 🎉');
  });
});
