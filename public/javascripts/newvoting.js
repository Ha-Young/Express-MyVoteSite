const addButton = document.querySelector('.addButton');
const inputBox = document.querySelector('.inputBox');
let answerNumber = 2;

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  if (answerNumber === 5) {
    return alert('You cannnot add more than 5 answers');
  }
  answerNumber += 1;
  input.setAttribute('name', `answer${answerNumber}`);
  input.setAttribute('placeholder', 'Type your answer here');
  inputBox.appendChild(input);
});
