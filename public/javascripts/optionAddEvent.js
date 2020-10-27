console.log('123ab');
let count = 3;
const $seletOptionContainer = document.querySelector(
  '.selectOptions-container'
);
const $addOption = document.querySelector('.addOption');

$addOption.addEventListener('click', (e) => {
  console.log('clicked');
  const $input = document.createElement('input');
  $input.setAttribute('type', 'text');
  $input.setAttribute('name', 'selectOptions');
  const $label = document.createElement('label');
  $label.setAttribute('for', 'selectOptions');
  $label.innerText = `투표선택사항 ${count}`;
  count++;

  $seletOptionContainer.appendChild($label);
  $seletOptionContainer.appendChild($input);
});
