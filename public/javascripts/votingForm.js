const container = document.querySelector('.optionsContainer');
const addOptionBtn = document.querySelector('.addOptionBtn');

if (addOptionBtn) {
  addOptionBtn.addEventListener('click', event => {
    event.preventDefault();
    const newInput = document.createElement('input');
    newInput.value = '옵션을 추가하세요';
    // newInput.placeholder = '옵션을 추가하세요';
    newInput.name = 'options';
    container.appendChild(newInput);
  });
}
