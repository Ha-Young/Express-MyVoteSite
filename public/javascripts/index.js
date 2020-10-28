(function () {
  const itemInput = document.getElementById('item');
  const itemList = document.querySelector('.item-list');
  const addItemBtn = document.getElementById('btn-add-item');

  addItemBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (!itemInput.value) return;

    const isRepeated = [...itemList.children].some((element) => {
      const value = element.children[0].textContent;
      return value === itemInput.value;
    });

    if (isRepeated) return;

    const li = document.createElement('li');
    const input = document.createElement('input');
    const button = document.createElement('button');

    input.name = 'itemList';
    input.value = itemInput.value;
    button.className = 'btn-delete-item';
    button.textContent = '삭제';

    li.appendChild(input);
    li.appendChild(button);
    itemList.appendChild(li);
  });

  itemList.addEventListener('click', function ({ target }) {
    if (target.className !== 'btn-delete-item') return;
    target.parentElement.remove();
  });
})();
