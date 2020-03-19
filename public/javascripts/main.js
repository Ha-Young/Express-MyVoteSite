const optionsArea = document.querySelector('.options-area');
const addOptionButton = document.querySelector('.add-options');
const removeOptionButton = document.querySelector('.remove-options');
const confirms = document.querySelectorAll('.confirm');
const chartArea = document.querySelector('.chart-area');

if (optionsArea) {
  let optionCount = 1;

  addOptionButton.addEventListener('click', e => {
    e.preventDefault();
    optionCount++;
    addOptionItem(optionsArea);
  });

  removeOptionButton.addEventListener('click', e => {
    e.preventDefault();
    if (optionCount > 1) {
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
