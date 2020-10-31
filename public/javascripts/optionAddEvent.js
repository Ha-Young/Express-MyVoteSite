let count = 3;
const $seletOptionsHeadContainer = document.querySelector(
  '.selectOptions-head-container'
);
const $seletOptionsBodyContainer = document.querySelector(
  '.selectOptions-body-container'
);

const $addOption = document.querySelector('.addOption');

$addOption.addEventListener('click', () => {
  const $input = document.createElement('input');
  $input.setAttribute('type', 'text');
  $input.setAttribute('name', 'selectOptions');
  const $label = document.createElement('label');
  $label.setAttribute('for', 'selectOptions');
  $label.innerText = `Select Option ${count}`;
  count++;

  $seletOptionsHeadContainer.appendChild($label);
  $seletOptionsBodyContainer.appendChild($input);
});
