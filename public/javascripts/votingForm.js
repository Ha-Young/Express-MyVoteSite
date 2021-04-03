const container = document.querySelector('.optionsContainer');
const addOptionBtn = document.querySelector('.addOptionBtn');

let count = 2;

async function addOption(e) {
  e.preventDefault();
  if (count === 7) {
    return;
  }

  // 여기부분에서 클릭을 했을 때 2개씩 input이 추가되는 현상이 나타납니다
  count += 1;
  const newInput = document.createElement('input');
  newInput.placeholder = `옵션을 추가하세요 ${count}`;
  newInput.name = 'options';
  container.appendChild(newInput);
}

addOptionBtn.addEventListener('click', addOption);
