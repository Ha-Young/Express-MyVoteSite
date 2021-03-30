const container = document.querySelector('.optionsContainer');
const addOptionBtn = document.querySelector('.addOptionBtn');

if (addOptionBtn) {
  addOptionBtn.addEventListener('click', event => {
    event.preventDefault();
    const newInput = document.createElement('input');
    newInput.name = 'options';
    container.appendChild(newInput);
  });
}
