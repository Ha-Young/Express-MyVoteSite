const optionsArea = document.querySelector('.options-area');
const addOptionButton = document.querySelector('.add-options');
const removeOptionButton = document.querySelector('.remove-options');
const confirm = document.querySelector('.confirm');

if (optionsArea) {
  let optionCount = 1;

  addOptionButton.addEventListener('click', e => {
    e.preventDefault();
    optionCount++;
    addOptionItem(optionCount, optionsArea);
  });

  removeOptionButton.addEventListener('click', e => {
    e.preventDefault();
    if (optionCount > 1) {
      optionCount--;
      removeOptionItem(optionsArea);
    }
  });
}

if (confirm) {
  confirm.addEventListener('click', e => {
    if (!window.confirm('제출하시겠습니까?')) {
      e.preventDefault();
    }
  })
}

function addOptionItem (count, target) {
  //const optionItem = `<input type="text" name="option${count}" />`;
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
